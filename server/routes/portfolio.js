import express from 'express';

const router = express.Router();

const PORTFOLIO_DATA = {
  profile: {
    name: 'Aarav Shah',
    role: 'Full-Stack Developer & Digital Creator',
    eyebrow: 'Available for meaningful opportunities',
    bio: "Namaste! I'm Aarav — a full-stack developer who enjoys turning thoughtful ideas into useful, human-friendly digital experiences.",
    location: 'Ahmedabad, Gujarat, India',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    facts: [
      { stat: '03+', label: 'Years learning' },
      { stat: '08', label: 'Projects explored' },
      { stat: '04+', label: 'Clients & collaborations' },
      { stat: '03', label: 'Hindi · Gujarati · English' },
    ],
  },
  skills: [
    { name: 'HTML & CSS', desc: 'Structure · Styling', icon: '⌘', category: 'frontend' },
    { name: 'JavaScript', desc: 'Interaction · Logic', icon: '⚡', category: 'frontend' },
    { name: 'React', desc: 'Component UI', icon: '⚛', category: 'frontend' },
    { name: 'Node.js', desc: 'Backend runtime', icon: '⬡', category: 'backend' },
    { name: 'Express', desc: 'REST APIs', icon: '◈', category: 'backend' },
    { name: 'MongoDB', desc: 'Document database', icon: '🍃', category: 'backend' },
    { name: 'MySQL', desc: 'Relational data', icon: '▤', category: 'backend' },
    { name: 'Python', desc: 'Automation · Basics', icon: '🐍', category: 'tools' },
    { name: 'Git & GitHub', desc: 'Version control', icon: '◉', category: 'tools' },
    { name: 'Figma', desc: 'UI exploration', icon: '✳', category: 'tools' },
    { name: 'Tailwind CSS', desc: 'Utility styling', icon: '▧', category: 'frontend' },
    { name: 'REST APIs', desc: 'Integration & Microservices', icon: '◎', category: 'backend' },
  ],
  experience: [
    {
      period: '2023 – PRESENT',
      role: 'Senior Frontend Engineer',
      company: 'Bharat Pay Labs · Bengaluru',
      desc: 'Led the redesign of a UPI payments dashboard, cut page load by 45% and shipped Hindi, Gujarati and Marathi support for 1.2 lakh merchants.',
      tags: ['React', 'Performance', 'Localization', 'State Management'],
    },
    {
      period: '2021 – 2023',
      role: 'Full Stack Developer',
      company: 'Saathi EdTech · Pune',
      desc: 'Built a vernacular learning platform with live classes, offline mode and voice quizzes that reached students in over 400 towns across India.',
      tags: ['Full Stack', 'Node.js', 'EdTech', 'Offline-first', 'WebSockets'],
    },
    {
      period: '2019 – 2021',
      role: 'Software Engineer',
      company: 'Navrang Softworks · Ahmedabad',
      desc: 'Developed e-commerce tools for textile traders of Surat, automated GST invoicing and reduced manual billing work by 60%.',
      tags: ['E-commerce', 'GST Invoicing', 'Automation', 'MongoDB'],
    },
    {
      period: '2019',
      role: 'Engineering Intern',
      company: 'Gujarat Technological University Labs',
      desc: 'Prototyped an IoT crop-monitoring dashboard for farmers as part of the final year project.',
      tags: ['IoT', 'Dashboard', 'Agriculture', 'Python'],
    },
  ],
  projects: [
    {
      id: '01',
      category: 'WEB PLATFORM',
      title: 'SafarSetu',
      desc: 'A travel discovery concept bringing transport, stays, food and local experiences together in one simple journey planner.',
      tags: ['React', 'Node.js', 'MongoDB', 'Maps API', 'Express'],
      type: 'Personal · Full stack',
    },
    {
      id: '02',
      category: 'MOBILITY',
      title: 'VH Taxi Go',
      desc: 'An EV rental and ride-booking prototype exploring passenger and driver workflows, trip updates and verification.',
      tags: ['MERN', 'JWT', 'Socket.IO', 'REST API', 'Redis'],
      type: 'Personal · Team-ready',
    },
    {
      id: '03',
      category: 'DATA & ANALYTICS',
      title: 'Cricket Analytics',
      desc: 'A cricket data exploration dashboard concept for turning match information into useful insights for players and analysts.',
      tags: ['React', 'Node.js', 'MySQL', 'Python', 'Chart.js'],
      type: 'Academic · Analytics',
    },
    {
      id: '04',
      category: 'CREATIVE TOOL & AI',
      title: 'PixRevive',
      desc: 'A photo restoration application concept focused on helping people preserve and revisit meaningful memories.',
      tags: ['Python', 'AI / ML', 'MongoDB', 'React', 'Canvas API'],
      type: 'Personal · AI',
    },
  ],
};

router.get('/profile', (req, res) => res.json({ success: true, data: PORTFOLIO_DATA.profile }));
router.get('/skills', (req, res) => res.json({ success: true, data: PORTFOLIO_DATA.skills }));
router.get('/experience', (req, res) => res.json({ success: true, data: PORTFOLIO_DATA.experience }));
router.get('/projects', (req, res) => res.json({ success: true, data: PORTFOLIO_DATA.projects }));

export default router;
