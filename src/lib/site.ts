export const site = {
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
  title: 'Tedd Schreiner | DevOps Engineer für Network Automation',
  description:
    'Tedd Schreiner ist DevOps Engineer mit Fokus auf Netzwerkautomatisierung, Network Source of Truth, Linux-Automation und robuste technische Betriebsabläufe.',
  social: {
    github: 'https://github.com/tschreiner',
    linkedin: 'https://www.linkedin.com/in/teddschreiner/',
    xing: 'https://www.xing.com/profile/Tedd_Schreiner',
  },
};

export const navigation = [
  { label: 'Projekte', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Über mich', href: '/about/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Kontakt', href: '/contact/' },
];

export const skillClusters = [
  {
    title: 'Network Automation',
    description:
      'Wiederholbare Netzwerkabläufe mit klaren Guardrails, validierten Daten und nachvollziehbaren Changes.',
    items: ['Ansible', 'REST', 'HPE/H3C Comware', 'Aruba', 'Network as Code'],
  },
  {
    title: 'Source of Truth',
    description:
      'Strukturierte Netzwerkdaten als Grundlage für Dokumentation, Betrieb, Synchronisation und Automatisierung.',
    items: ['i-doit', 'NSoT', 'API-Synchronisation', 'Datenmodellierung', 'Dokumentation'],
  },
  {
    title: 'Platform Operations',
    description:
      'Linux, Monitoring, Log Analytics und Tooling für robuste, wartbare technische Plattformen.',
    items: ['AlmaLinux', 'Foreman', 'Docker', 'PRTG', 'Graylog'],
  },
  {
    title: 'Service & Workflow',
    description:
      'Pragmatische Automatisierung an der Schnittstelle zwischen Betrieb, Prozessen und technischer Umsetzung.',
    items: ['Jira Service Management', 'PowerShell', 'Python', 'Jenkins', 'BPMN'],
  },
];

export const education = [
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
];

export const languages = [
  { name: 'Deutsch', level: 'Muttersprache' },
  { name: 'Englisch', level: 'Verhandlungssicher' },
];
