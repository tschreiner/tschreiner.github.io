export const site = {
  name: 'Tedd Schreiner',
  domain: 'teddschreiner.de',
  url: 'https://teddschreiner.de',
  email: 'info@teddschreiner.de',
  title: 'Tedd Schreiner | DevOps Engineer, Automatisierer und Builder',
  description:
    'Personal Brand Website von Tedd Schreiner: DevOps, Netzwerkautomatisierung, Network Source of Truth, Web- und AI-Projekte.',
  social: {
    github: 'https://github.com/tschreiner',
    linkedin: 'https://www.linkedin.com/in/teddschreiner/',
    xing: 'https://www.xing.com/profile/Tedd_Schreiner',
  },
};

export const navigation = [
  { label: 'Über mich', href: '/about/' },
  { label: 'Projekte', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Kontakt', href: '/contact/' },
];

export const skillClusters = [
  {
    title: 'Network Automation',
    description: 'Wiederholbare Abläufe für Netzwerkgeräte, Inventar und Betriebsprozesse.',
    items: ['Ansible', 'REST', 'HPE/H3C Comware', 'Aruba', 'Network as Code'],
  },
  {
    title: 'Source of Truth',
    description: 'Datenmodelle, Inventarqualität und Synchronisation als Fundament für Automatisierung.',
    items: ['i-doit', 'NSoT', 'API-Synchronisation', 'Datenmodellierung', 'Dokumentation'],
  },
  {
    title: 'Platform Operations',
    description: 'Linux, Monitoring, Log Analytics und Tooling für robuste technische Systeme.',
    items: ['AlmaLinux', 'Foreman', 'Docker', 'PRTG', 'Graylog'],
  },
  {
    title: 'Service & Workflow',
    description: 'ITSM, Prozessautomation und Schnittstellen zwischen Betrieb und Fachlichkeit.',
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
