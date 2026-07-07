import type { Locale } from '@lib/i18n';
import { withLocalePath } from '@lib/i18n';

const sharedSite = {
  name: 'Tedd Schreiner',
  domain: 'teddschreiner.de',
  url: 'https://teddschreiner.de',
  email: 'info@teddschreiner.de',
  address: {
    street: 'Nordring 56',
    postalCode: '59929',
    city: 'Brilon',
    country: 'Deutschland',
  },
  social: {
    github: 'https://github.com/tschreiner',
    linkedin: 'https://www.linkedin.com/in/teddschreiner/',
    xing: 'https://www.xing.com/profile/Tedd_Schreiner',
  },
} as const;

const localizedSite = {
  de: {
    title: 'Tedd Schreiner | DevOps Engineer für AWS Cloud, Automation & AI-assisted Software Engineering',
    description:
      'Tedd Schreiner ist DevOps Engineer mit Fokus auf AWS Cloud, CI/CD, Kubernetes, Infrastrukturautomatisierung, Netzwerkautomatisierung, ITSM-Prozesse und AI-assisted Software Engineering.',
    jobTitle: 'DevOps Engineer für AWS Cloud, Automation und AI-assisted Software Engineering',
  },
  en: {
    title: 'Tedd Schreiner | DevOps Engineer for AWS Cloud, Automation & AI-assisted Software Engineering',
    description:
      'Tedd Schreiner is a DevOps Engineer focused on AWS Cloud, CI/CD, Kubernetes, infrastructure automation, network automation, ITSM workflows and AI-assisted software engineering.',
    jobTitle: 'DevOps Engineer for AWS Cloud, Automation and AI-assisted Software Engineering',
  },
} as const satisfies Record<Locale, { title: string; description: string; jobTitle: string }>;

const navigationLabels = {
  de: [
    { key: 'projects', label: 'Projekte', path: '/projects/' },
    { key: 'about', label: 'Über mich', path: '/about/' },
    { key: 'cv', label: 'CV', path: '/cv/' },
    { key: 'contact', label: 'Kontakt', path: '/contact/' },
  ],
  en: [
    { key: 'projects', label: 'Projects', path: '/projects/' },
    { key: 'about', label: 'About', path: '/about/' },
    { key: 'cv', label: 'CV', path: '/cv/' },
    { key: 'contact', label: 'Contact', path: '/contact/' },
  ],
} as const satisfies Record<Locale, Array<{ key: string; label: string; path: string }>>;

const localizedSkillClusters = {
  de: [
    {
      title: 'AWS Cloud & Infrastructure',
      description:
        'AWS-nahe Infrastruktur, Linux, Container, Betriebsfähigkeit und technische Plattformgrundlagen.',
      items: ['AWS', 'Linux', 'Docker', 'Kubernetes', 'Cloud Infrastructure', 'Infrastructure Operations'],
    },
    {
      title: 'CI/CD & Deployment Automation',
      description:
        'Build-, Test- und Deployment-Abläufe mit nachvollziehbaren Workflows und klaren Übergängen in den Betrieb.',
      items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Git', 'Deployment Automation', 'Release Workflows'],
    },
    {
      title: 'Automation & ITSM Workflows',
      description:
        'Automatisierung technischer Prozesse an der Schnittstelle von Betrieb, Service Management und Engineering.',
      items: ['Ansible', 'Python', 'PowerShell', 'Jira Service Management', 'REST APIs', 'Workflow Automation'],
    },
    {
      title: 'Network Automation & Source of Truth',
      description:
        'Strukturierte Netzwerkdaten, Schnittstellen und Automatisierung für nachvollziehbare Netzwerkbetriebsabläufe.',
      items: ['Ansible', 'i-doit', 'NetBox', 'NSoT', 'REST APIs', 'Network Automation'],
    },
    {
      title: 'AI-assisted Software Engineering',
      description:
        'AI-unterstützte Entwicklung, technische Analyse und Automatisierung von Engineering-Prozessen.',
      items: ['AI-assisted Development', 'AI Workflows', 'Code Review', 'Automation', 'Developer Tooling'],
    },
  ],
  en: [
    {
      title: 'AWS Cloud & Infrastructure',
      description:
        'AWS-focused infrastructure, Linux, containers, operability and the core building blocks of technical platforms.',
      items: ['AWS', 'Linux', 'Docker', 'Kubernetes', 'Cloud Infrastructure', 'Infrastructure Operations'],
    },
    {
      title: 'CI/CD & Deployment Automation',
      description:
        'Build, test and deployment flows with traceable workflows and clear handoffs into operations.',
      items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Git', 'Deployment Automation', 'Release Workflows'],
    },
    {
      title: 'Automation & ITSM Workflows',
      description:
        'Automation of technical processes at the intersection of operations, service management and engineering.',
      items: ['Ansible', 'Python', 'PowerShell', 'Jira Service Management', 'REST APIs', 'Workflow Automation'],
    },
    {
      title: 'Network Automation & Source of Truth',
      description:
        'Structured network data, interfaces and automation for understandable, reliable network operations.',
      items: ['Ansible', 'i-doit', 'NetBox', 'NSoT', 'REST APIs', 'Network Automation'],
    },
    {
      title: 'AI-assisted Software Engineering',
      description:
        'AI-assisted development, technical analysis and automation of engineering workflows.',
      items: ['AI-assisted Development', 'AI Workflows', 'Code Review', 'Automation', 'Developer Tooling'],
    },
  ],
} as const;

const localizedEducation = {
  de: [
    {
      title: 'IHK-zertifizierter Fachinformatiker für Anwendungsentwicklung',
      institution: 'MyBOOM Internet GmbH',
      date: '2012 - 2015',
    },
    {
      title: 'IHK-zertifizierter Ausbilder für Fachinformatiker Systemintegration',
      institution: 'IHK Arnsberg',
      date: '2022',
    },
  ],
  en: [
    {
      title: 'Certified Specialist in Application Development',
      institution: 'MyBOOM Internet GmbH',
      date: '2012 - 2015',
    },
    {
      title: 'Certified Trainer for IT Specialists in Systems Integration',
      institution: 'IHK Arnsberg',
      date: '2022',
    },
  ],
} as const;

const localizedLanguages = {
  de: [
    { name: 'Deutsch', level: 'Muttersprache' },
    { name: 'Englisch', level: 'Verhandlungssicher' },
  ],
  en: [
    { name: 'German', level: 'Native' },
    { name: 'English', level: 'Professional working proficiency' },
  ],
} as const;

const localizedSuitableInquiryAreas = {
  de: [
    {
      title: 'DevOps & AWS Cloud',
      text: 'AWS-nahe Infrastruktur, Linux, Betriebsabläufe, Automatisierung und technische Plattformen.',
    },
    {
      title: 'CI/CD & Software Deployment',
      text: 'GitHub/GitLab Workflows, Deployment-Prozesse, Build-/Release-Abläufe und nachvollziehbare Änderungen.',
    },
    {
      title: 'Kubernetes & Platform Engineering',
      text: 'Containerisierte Umgebungen, Plattformlogik, Betriebsfähigkeit und wiederholbare technische Abläufe.',
    },
    {
      title: 'Automation & AI-assisted Software Engineering',
      text: 'Automatisierung von ITSM-, Infrastruktur- und Engineering-Prozessen, klassisch, skriptbasiert und AI-unterstützt.',
    },
    {
      title: 'Network Automation',
      text: 'Netzwerkdaten, Source of Truth, Ansible, REST APIs und Automatisierung im operativen Netzwerkbetrieb.',
    },
  ],
  en: [
    {
      title: 'DevOps & AWS Cloud',
      text: 'AWS-focused infrastructure, Linux, operational workflows, automation and technical platforms.',
    },
    {
      title: 'CI/CD & Software Deployment',
      text: 'GitHub/GitLab workflows, deployment processes, build and release flows, and traceable changes.',
    },
    {
      title: 'Kubernetes & Platform Engineering',
      text: 'Containerized environments, platform logic, operability and repeatable technical workflows.',
    },
    {
      title: 'Automation & AI-assisted Software Engineering',
      text: 'Automation of ITSM, infrastructure and engineering processes, from classic scripting to AI-assisted workflows.',
    },
    {
      title: 'Network Automation',
      text: 'Network data, Source of Truth, Ansible, REST APIs and automation in day-to-day network operations.',
    },
  ],
} as const;

export function getSite(locale: Locale) {
  return {
    ...sharedSite,
    ...localizedSite[locale],
  };
}

export function getNavigation(locale: Locale) {
  return navigationLabels[locale].map((item) => ({
    label: item.label,
    href: withLocalePath(locale, item.path),
  }));
}

export function getSkillClusters(locale: Locale) {
  return localizedSkillClusters[locale];
}

export function getEducation(locale: Locale) {
  return localizedEducation[locale];
}

export function getLanguages(locale: Locale) {
  return localizedLanguages[locale];
}

export function getSuitableInquiryAreas(locale: Locale) {
  return localizedSuitableInquiryAreas[locale];
}

export const site = getSite('de');
export const navigation = getNavigation('de');
export const skillClusters = getSkillClusters('de');
export const education = getEducation('de');
export const languages = getLanguages('de');
export const suitableInquiryAreas = getSuitableInquiryAreas('de');
