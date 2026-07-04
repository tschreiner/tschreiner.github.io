export const site = {
  name: 'Tedd Schreiner',
  title: 'Tedd Schreiner | DevOps Engineer, Automatisierer und Builder',
  description:
    'Personal Brand Website von Tedd Schreiner: DevOps, Netzwerkautomatisierung, Network Source of Truth, Web- und AI-Projekte.',
  url: 'https://teddschreiner.de',
  email: 'info@teddschreiner.de',
  social: {
    linkedin: 'https://www.linkedin.com/in/teddschreiner/',
    github: 'https://github.com/tschreiner',
    xing: 'https://www.xing.com/profile/Tedd_Schreiner',
  },
};

export const navigation = [
  { label: 'Über mich', href: '/ueber-mich/' },
  { label: 'Projekte', href: '/projekte/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const skills = [
  {
    group: 'DevOps & Automation',
    items: ['Ansible', 'GitHub', 'GitLab', 'Docker', 'REST APIs', 'PowerShell', 'Python'],
  },
  {
    group: 'Netzwerk & Infrastruktur',
    items: ['HPE/H3C Comware', 'Aruba', 'HPE IMC', 'Infoblox', 'Check Point', 'EVE-NG', 'GNS3'],
  },
  {
    group: 'Linux & Plattformen',
    items: ['AlmaLinux 8/9', 'Foreman', 'Microsoft 365', 'Azure AD', 'Endpoint Management'],
  },
  {
    group: 'Operations',
    items: ['Monitoring', 'Log Analytics', 'ITSM', 'Jira Service Management', 'Dokumentation'],
  },
];

export const experience = [
  {
    role: 'DevOps Engineer',
    company: 'EOS Technology Solutions GmbH',
    location: 'Hamburg',
    duration: 'Sep 2022 - Heute',
    points: [
      'Netzwerkautomatisierung mit Ansible, REST und herstellerspezifischen Netzwerkplattformen.',
      'Aufbau einer Network Source of Truth mit i-doit und Synchronisation mit Bestandssystemen.',
      'Linux-Systemadministration und Automatisierung mit AlmaLinux, Foreman und Ansible.',
      'Entwicklung eines Virtual Network Lab Environments zur Modellierung physischer Topologien.',
      '2nd-Level-Support für Network Infrastructure und angrenzende Plattformen.',
    ],
  },
  {
    role: 'IT-Systemadministrator',
    company: 'Wunschgutschein GmbH',
    location: 'Brilon',
    duration: 'Jan 2020 - Aug 2022',
    points: [
      'Modernisierung von Netzwerk-, Server-, Datenbank- und Monitoring-Systemen.',
      'Einführung von Microsoft 365 und Endpoint-Management-Prozessen.',
      'Automatisierung von ITSM-Prozessen mit Jira Service Management, PowerShell und CI-Workflows.',
      'Betrieb von Virtualisierung, Windows Server, Datenbanken, Monitoring und Log-Analytics.',
    ],
  },
  {
    role: 'Head of Online Marketing & Infrastruktur',
    company: 'HAMMELSPRUNG GmbH',
    location: 'Brilon',
    duration: 'Sep 2018 - Dez 2019',
    points: [
      'Automatisierung und Analyse von Online-Marketing-KPIs mit Python und APIs.',
      'Deployment-Prozesse für Landing Pages und Nischenseiten mit Ansible und Docker.',
      'Betrieb und Ausbau von On-Premise- und Cloud-Infrastruktur.',
    ],
  },
  {
    role: 'Software Developer, Administrator und Gründer',
    company: 'Selbstständig, Maxconvert UG, MyBOOM Internet GmbH',
    location: 'Brilon / Bottrop',
    duration: '2015 - 2019',
    points: [
      'Entwicklung von Webanwendungen, E-Commerce-Integrationen und WordPress-Erweiterungen.',
      'Administration von Linux-Systemen und AWS-Infrastrukturen.',
      'Aufbau automatisierter Entwicklungs-, Staging- und Produktionsumgebungen.',
    ],
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
