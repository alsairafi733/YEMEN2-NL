/**
 * YEMEN GROUP - Digital Identity Data
 * Single source of truth for founder info, assets, services, roadmap, and progress.
 * Used by all sub-projects: Y2Flex, Yemen2, Newfan, Y2Drive, Y2Deliver, Y2Auto.
 */

export const IDENTITY = {
  founder: {
    name: 'Ahmed Abdulrahman Ahmed Hasan',
    religion: 'Islam',
    country: 'Netherlands',
    languages: ['Arabic', 'English'],
    values: ['Faith', 'Honesty', 'Discipline', 'Freedom', 'Family', 'Service', 'Innovation'],
    skills: ['Marketing', 'Business Development', 'Sales', 'Digital Services', 'Automation', 'Leadership'],
    timeAvailable: '30 minutes daily',
    employment: '40 hours/week (IND compliant)',
  },

  assets: {
    domains: [
      'newfan.nl', 'newfan.biz', 'newfan.email', 'newfan.life',
      'newfan.shop', 'newfan.store', 'newfan.top', 'newfan.world',
      'ramovpn.com', 'ramovpn.me', 'ramovpn.net', 'ramovpn.shop',
      'ramovpn.store', 'ramovpn.xyz',
      'yemen2.com', 'y2flex.com', 'y2flex.nl',
    ],
    servers: {
      'Saudi Arabia': 'Websites & AI Core',
      'Turkey': 'Backup & Edu Platforms',
      'Netherlands': 'Y2Flex & Employment',
      'United Kingdom': 'Client Services & English Content',
    },
    subscriptions: {
      'GitHub Copilot Pro': 'Active with Agent Mode',
      'Ollama + ALLaM-7B': 'Local AI Models',
    },
  },

  brands: {
    holding: 'Y2Flex B.V. (Netherlands)',
    operational: 'Yemen2.com',
    marketplaces: ['Newfan.shop', 'RamoVPN'],
    community: 'Newfans.shop (WhatsApp Groups)',
  },

  community: {
    totalMembers: 162,
    groups: [
      { name: 'Main Community',            members: 162 },
      { name: 'Subscriptions & Discounts', members: 75  },
      { name: 'Yemen2.com (Travel)',        members: 22  },
      { name: 'Suppliers',                 members: 16  },
    ],
  },

  services: [
    {
      category: 'Home Services',
      icon: '🏠',
      items: ['House Cleaning', 'Office Cleaning', 'Mobile Car Cleaning', 'Post-Move Cleaning'],
    },
    {
      category: 'Moving & Help',
      icon: '🚚',
      items: ['Furniture Transport', 'Loading/Unloading', 'IKEA Assembly', 'Elderly Assistance'],
    },
    {
      category: 'Business Services',
      icon: '💼',
      items: ['Corporate Services', 'Marketing', 'Client Acquisition', 'Digital Services'],
    },
    {
      category: 'Digital Services',
      icon: '💻',
      items: ['Subscription Activation', 'Website Development', 'AI Solutions', 'Web Hosting', 'Email Services', 'VPN Services'],
    },
    {
      category: 'E-commerce',
      icon: '🛍️',
      items: ['Online Store', 'Cleaning Tools', 'Perfumes', 'Arabic Products', 'Phone Accessories', 'Imported Products'],
    },
    {
      category: 'Auto Services (Y2Auto)',
      icon: '🚗',
      items: ['Mobile Car Wash', 'Light Maintenance', 'AI Diagnostics', 'Car Towing', 'Spare Parts Sales'],
    },
  ],

  roadmap: [
    { year: 2026, milestones: ['Stable Job', 'Integration Completion', 'Family Reunion', 'Residence Renewal', 'Driving License', 'Launch Yemen2 & Newfan'] },
    { year: 2027, milestones: ['Independent Business', 'Company Revenue', 'First Employees', 'Dutch Market Coverage'] },
    { year: 2028, milestones: ['Scale Business', 'Convert to BV', 'Full Automation', 'AI Integration'] },
    { year: 2029, milestones: ['Expand Within Netherlands', 'New Cities'] },
    { year: 2030, milestones: ['International Expansion', 'Germany, France, UK', 'Global Brand'] },
  ],

  principles: [
    '100% Halal (No Riba, No Alcohol, No Gambling)',
    'Data sovereignty (Own servers, No cloud lock-in)',
    'Full automation (n8n, Make.com, AI)',
    'Primary language = Target country language',
    'Justice & Transparency in all contracts',
  ],

  goals: [
    'Finish Integration',
    'Bring My Wife',
    'Obtain Dutch Driving License',
    'Register Yemen2',
    'Build Y2Flex',
    'Launch Digital Platform',
    'Create Jobs',
    'Become Financially Independent',
    'Expand Across Europe',
    'Build International Brand',
  ],

  progress: [
    { project: 'Y2Flex',          icon: '👷', status: 'In Progress', percent: 70, notes: '20 pages built, Next.js ready' },
    { project: 'Yemen2.com',       icon: '🌍', status: 'In Progress', percent: 50, notes: 'Core site under construction' },
    { project: 'Newfan.shop',      icon: '🛍️', status: 'Active',      percent: 90, notes: '162 members, 4 WhatsApp groups' },
    { project: 'RamoVPN',          icon: '🔒', status: 'Active',      percent: 80, notes: 'Domains ready, services activating' },
    { project: '100 Arabic Sites', icon: '🌐', status: 'In Progress', percent: 30, notes: '20 sites ready' },
    { project: 'YEMEN2 AI Agent',  icon: '🤖', status: 'In Progress', percent: 60, notes: 'Initial model running' },
    { project: 'Dashboard',        icon: '📊', status: 'Planning',    percent: 10, notes: 'Build starts this week' },
    { project: 'Y2Drive',          icon: '🚗', status: 'Planning',    percent: 5,  notes: 'Starts after Y2Flex' },
    { project: 'Y2Deliver',        icon: '📦', status: 'Planning',    percent: 5,  notes: 'Starts after Y2Drive' },
    { project: 'Y2Auto',           icon: '🔧', status: 'Planning',    percent: 5,  notes: 'Starts after Y2Deliver' },
  ],
} as const;

export type IdentityData = typeof IDENTITY;
