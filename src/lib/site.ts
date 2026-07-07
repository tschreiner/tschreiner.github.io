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
  title: 'Tedd Schreiner | DevOps Engineer für AWS Cloud, Automation & AI-assisted Software Engineering',
  description:
    'Tedd Schreiner ist DevOps Engineer mit Fokus auf AWS Cloud, CI/CD, Kubernetes, Infrastrukturautomatisierung, Netzwerkautomatisierung, ITSM-Prozesse und AI-assisted Software Engineering.',
  social: {
    github: 'https://github.com/tschreiner',
    linkedin: 'https://www.linkedin.com/in/teddschreiner/',
    xing: 'https://www.xing.com/profile/Tedd_Schreiner',
  },
};

export const navigation = [
  { label: 'Projekte', href: '/projects/' },
  { label: 'Über mich', href: '/about/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Kontakt', href: '/contact/' },
];

export const skillClusters = [
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
