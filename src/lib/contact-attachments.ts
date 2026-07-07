import type { Locale } from '@lib/i18n';

export const MAX_ATTACHMENT_COUNT = 10;
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_ATTACHMENT_BYTES = 25 * 1024 * 1024;
export const MAX_FILENAME_LENGTH = 120;

const extensionMimeMap: Record<string, readonly string[]> = {
  pdf: ['application/pdf'],
  doc: ['application/msword'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  zip: ['application/zip', 'application/x-zip-compressed'],
};

export const ATTACHMENT_ACCEPT = [
  '.pdf',
  '.doc',
  '.docx',
  '.jpg',
  '.jpeg',
  '.png',
  '.zip',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'application/zip',
  'application/x-zip-compressed',
].join(',');

export interface ResendAttachment {
  filename: string;
  content: string;
}

function formatMegabytes() {
  return `${MAX_ATTACHMENT_BYTES / (1024 * 1024)} MB`;
}

function formatTotalMegabytes() {
  return `${MAX_TOTAL_ATTACHMENT_BYTES / (1024 * 1024)} MB`;
}

function getAttachmentCopy(locale: Locale) {
  return locale === 'de'
    ? {
        fallbackName: 'anhang',
        tooMany: `Es sind höchstens ${MAX_ATTACHMENT_COUNT} Dateien erlaubt.`,
        invalidType:
          'Mindestens eine Datei hat einen nicht erlaubten Dateityp. Erlaubt sind PDF, Word, Bilder (JPG, PNG) und ZIP.',
        maxFile: `Jede Datei darf höchstens ${formatMegabytes()} groß sein.`,
        maxTotal: `Die Dateien dürfen zusammen höchstens ${formatTotalMegabytes()} groß sein.`,
      }
    : {
        fallbackName: 'attachment',
        tooMany: `A maximum of ${MAX_ATTACHMENT_COUNT} files is allowed.`,
        invalidType:
          'At least one file has an unsupported type. Allowed are PDF, Word, images (JPG, PNG) and ZIP.',
        maxFile: `Each file may be up to ${formatMegabytes()} in size.`,
        maxTotal: `The combined size of all files may be up to ${formatTotalMegabytes()}.`,
      };
}

export function getFileExtension(filename: string) {
  const parts = filename.split('.');
  if (parts.length < 2) {
    return '';
  }

  return parts.pop()?.toLowerCase() ?? '';
}

export function sanitizeFilename(filename: string, locale: Locale = 'de') {
  const basename = filename.split(/[/\\]/).pop() ?? getAttachmentCopy(locale).fallbackName;
  return basename
    .replace(/[^\w.\- ()äöüÄÖÜß]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, MAX_FILENAME_LENGTH) || getAttachmentCopy(locale).fallbackName;
}

function isAllowedFile(file: File) {
  const extension = getFileExtension(file.name);
  const allowedMimeTypes = extensionMimeMap[extension];

  if (!allowedMimeTypes) {
    return false;
  }

  if (!file.type) {
    return true;
  }

  return allowedMimeTypes.includes(file.type);
}

export function validateAttachmentFiles(files: File[], locale: Locale = 'de') {
  const copy = getAttachmentCopy(locale);

  if (files.length > MAX_ATTACHMENT_COUNT) {
    return copy.tooMany;
  }

  let totalBytes = 0;

  for (const file of files) {
    if (!file.name || file.size === 0) {
      continue;
    }

    if (!isAllowedFile(file)) {
      return copy.invalidType;
    }

    if (file.size > MAX_ATTACHMENT_BYTES) {
      return copy.maxFile;
    }

    totalBytes += file.size;
  }

  if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
    return copy.maxTotal;
  }

  return null;
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

function getAttachmentFiles(formData: FormData) {
  return formData
    .getAll('attachments')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0 && Boolean(entry.name));
}

export async function parseAndValidateAttachments(formData: FormData, locale: Locale = 'de') {
  const files = getAttachmentFiles(formData);
  const validationError = validateAttachmentFiles(files, locale);

  if (validationError) {
    return { attachments: [] as ResendAttachment[], error: validationError };
  }

  const attachments: ResendAttachment[] = [];

  for (const file of files) {
    const content = arrayBufferToBase64(await file.arrayBuffer());
    attachments.push({
      filename: sanitizeFilename(file.name, locale),
      content,
    });
  }

  return { attachments, error: null as string | null };
}
