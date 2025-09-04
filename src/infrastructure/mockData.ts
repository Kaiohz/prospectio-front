// Mock data for development - Prospectio
import { 
  Lead, Task, DashboardMetrics, LeadActivity, LeadStatus, LeadSource, TaskType, TaskPriority,
  Profile, Company, Contact, Job, Leads
} from '@/domain/types';

const baseUrl = import.meta.env.VITE_APP_BACKEND_API_URL as string;

// Generate realistic mock leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    position: 'VP Marketing',
    status: 'hot',
    source: 'linkedin',
    notes: 'Very interested in our enterprise solution. Mentioned budget approved for Q1.',
    score: 92,
    lastContactedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@startupxy.com',
    phone: '+1 (555) 987-6543',
    company: 'StartupXY',
    position: 'Founder & CEO',
    status: 'warm',
    source: 'website',
    notes: 'Downloaded our whitepaper. Startup with 50 employees, looking to scale.',
    score: 78,
    lastContactedAt: new Date('2024-01-18'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@globalinc.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Inc',
    position: 'Operations Director',
    status: 'cold',
    source: 'cold_email',
    notes: 'Initial contact made. Large enterprise, long decision process expected.',
    score: 45,
    lastContactedAt: new Date('2024-01-16'),
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'dthompson@innovate.co',
    company: 'Innovate Co',
    position: 'CTO',
    status: 'warm',
    source: 'referral',
    notes: 'Referred by existing client. Technical background, interested in API features.',
    score: 84,
    lastContactedAt: new Date('2024-01-19'),
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Park',
    email: 'lpark@futuretech.ai',
    phone: '+1 (555) 321-0987',
    company: 'FutureTech AI',
    position: 'Product Manager',
    status: 'hot',
    source: 'event',
    notes: 'Met at TechConf 2024. Immediate need for our solution.',
    score: 96,
    lastContactedAt: new Date('2024-01-21'),
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '6',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'jwilson@enterprise.biz',
    company: 'Enterprise Biz',
    position: 'IT Director',
    status: 'cold',
    source: 'linkedin',
    notes: 'Connected on LinkedIn. Large enterprise with complex requirements.',
    score: 38,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
];

// Generate mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow-up call with Sarah Johnson',
    description: 'Discuss implementation timeline and pricing',
    type: 'call',
    leadId: '1',
    dueDate: new Date('2024-01-25'),
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: 'Send proposal to Michael Chen',
    description: 'Custom proposal for startup package',
    type: 'email',
    leadId: '2',
    dueDate: new Date('2024-01-24'),
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    title: 'Schedule demo with Lisa Park',
    description: 'Product demo focusing on AI features',
    type: 'meeting',
    leadId: '5',
    dueDate: new Date('2024-01-26'),
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '4',
    title: 'Send welcome email to David Thompson',
    type: 'email',
    leadId: '4',
    dueDate: new Date('2024-01-23'),
    completed: true,
    priority: 'low',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '5',
    title: 'Research Emily Rodriguez company',
    description: 'Gather info about Global Inc to personalize approach',
    type: 'follow_up',
    leadId: '3',
    dueDate: new Date('2024-01-24'),
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
];

// Mock dashboard metrics
export const mockMetrics: DashboardMetrics = {
  totalLeads: 6,
  hotLeads: 2,
  warmLeads: 2,
  coldLeads: 2,
  averageScore: 72,
  conversionRate: 15.5,
  tasksToday: 3,
  overdueTasks: 1,
};

// Mock lead activities
export const mockActivities: LeadActivity[] = [
  {
    id: '1',
    leadId: '1',
    type: 'status_changed',
    description: 'Status changed from warm to hot',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    leadId: '2',
    type: 'email_sent',
    description: 'Sent follow-up email with case studies',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    leadId: '5',
    type: 'meeting_scheduled',
    description: 'Demo meeting scheduled for next week',
    createdAt: new Date('2024-01-21'),
  },
];

// Helper functions to simulate API delays
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  leads: {
    getAll: async (filters?: any) => {
      await delay(500);
      let filteredLeads = [...mockLeads];
      
      if (filters?.status?.length) {
        filteredLeads = filteredLeads.filter(lead => filters.status.includes(lead.status));
      }
      
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filteredLeads = filteredLeads.filter(lead => 
          lead.firstName.toLowerCase().includes(search) ||
          lead.lastName.toLowerCase().includes(search) ||
          lead.company.toLowerCase().includes(search) ||
          lead.email.toLowerCase().includes(search)
        );
      }
      
      return {
        data: filteredLeads,
        pagination: {
          page: 1,
          limit: 20,
          total: filteredLeads.length,
          totalPages: 1,
        },
      };
    },
    
    getById: async (id: string) => {
      await delay(300);
      const lead = mockLeads.find(l => l.id === id);
      if (!lead) throw new Error('Lead not found');
      return { data: lead };
    },
    
    create: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
      await delay(400);
      const newLead: Lead = {
        ...lead,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockLeads.push(newLead);
      return { data: newLead };
    },
    
    update: async (id: string, updates: Partial<Lead>) => {
      await delay(400);
      const index = mockLeads.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Lead not found');
      
      mockLeads[index] = {
        ...mockLeads[index],
        ...updates,
        updatedAt: new Date(),
      };
      return { data: mockLeads[index] };
    },
  },
  
  tasks: {
    getAll: async (filters?: any) => {
      await delay(400);
      let filteredTasks = [...mockTasks];
      
      if (filters?.leadId) {
        filteredTasks = filteredTasks.filter(task => task.leadId === filters.leadId);
      }
      
      if (filters?.completed !== undefined) {
        filteredTasks = filteredTasks.filter(task => task.completed === filters.completed);
      }
      
      return {
        data: filteredTasks,
        pagination: {
          page: 1,
          limit: 20,
          total: filteredTasks.length,
          totalPages: 1,
        },
      };
    },
    
    create: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      await delay(400);
      const newTask: Task = {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasks.push(newTask);
      return { data: newTask };
    },
    
    update: async (id: string, updates: Partial<Task>) => {
      await delay(400);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Task not found');
      
      mockTasks[index] = {
        ...mockTasks[index],
        ...updates,
        updatedAt: new Date(),
      };
      return { data: mockTasks[index] };
    },
  },
  
  dashboard: {
    getMetrics: async () => {
      await delay(600);
      return { data: mockMetrics };
    },
  },
  
  activities: {
    getByLeadId: async (leadId: string) => {
      await delay(300);
      const activities = mockActivities.filter(a => a.leadId === leadId);
      return { data: activities };
    },
  },
};


export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "DataFlow Systems",
    industry: "Data Analytics",
    compatibility: "95% compatibility",
    source: "LinkedIn Sales Navigator",
    location: "Paris, France",
    size: "100-500 employees",
    revenue: "10-50M€",
    website: "https://dataflow-systems.com",
    description: "Leading provider of enterprise data analytics solutions, helping companies transform their data into actionable insights.",
    opportunities: ["React Developer", "Full Stack", "Data Visualization", "API Development"]
  },
  {
    id: "2", 
    name: "InnovateTech",
    industry: "SaaS Technology",
    compatibility: "87% compatibility",
    source: "Company Database",
    location: "Lyon, France", 
    size: "50-200 employees",
    revenue: "5-10M€",
    website: "https://innovatetech.fr",
    description: "Fast-growing SaaS company developing productivity tools for modern teams.",
    opportunities: ["Frontend Developer", "TypeScript", "SaaS Platform", "Team Collaboration"]
  },
  {
    id: "3",
    name: "AI Solutions Corp",
    industry: "Artificial Intelligence",
    compatibility: "92% compatibility", 
    source: "Industry Reports",
    location: "Toulouse, France",
    size: "200-1000 employees",
    revenue: "20-100M€",
    website: "https://aisolutions.com",
    description: "Pioneer in AI-powered business solutions, specializing in machine learning and natural language processing.",
    opportunities: ["AI Engineer", "Machine Learning", "Python", "LLM Integration"]
  }
];

export const mockContacts: Contact[] = [
  {
    company_id: "1",
    job_id: "1",
    name: "Marie Dubois",
    email: "marie.dubois@dataflow-systems.com",
    title: "Head of Engineering",
    phone: "+33 1 42 34 56 78",
    profile_url: "https://linkedin.com/in/marie-dubois"
  },
  {
    company_id: "1", 
    job_id: "1",
    name: "Thomas Martin",
    email: "thomas.martin@dataflow-systems.com",
    title: "CTO",
    phone: "+33 1 42 34 56 79",
    profile_url: "https://linkedin.com/in/thomas-martin"
  },
  {
    company_id: "2",
    job_id: "2", 
    name: "Sophie Bernard",
    email: "sophie.bernard@innovatetech.fr",
    title: "VP Engineering",
    phone: "+33 4 72 98 76 54",
    profile_url: "https://linkedin.com/in/sophie-bernard"
  },
  {
    company_id: "3",
    job_id: "3",
    name: "Alexandre Petit",
    email: "alexandre.petit@aisolutions.com", 
    title: "Lead AI Engineer",
    phone: "+33 5 61 23 45 67",
    profile_url: "https://linkedin.com/in/alexandre-petit"
  }
];

export const mockJobs: Job[] = [
  {
    id: "1",
    company_id: "1",
    date_creation: "2024-01-20",
    description: "Join our team as a Senior React Developer to build next-generation data visualization tools. Work with cutting-edge technologies including React 18, TypeScript, and D3.js.",
    job_title: "Senior React Developer",
    location: "Paris, France",
    salary: "60-80k€",
    job_seniority: "Senior",
    job_type: "Full-time",
    sectors: "Data Analytics, Frontend Development",
    apply_url: ["https://dataflow-systems.com/careers/react-dev", "https://linkedin.com/jobs/react-senior"],
    compatibility_score: 95
  },
  {
    id: "2",
    company_id: "2", 
    date_creation: "2024-01-18",
    description: "Looking for a Full Stack Developer to help scale our SaaS platform. Experience with React, Node.js, and PostgreSQL required.",
    job_title: "Full Stack Developer",
    location: "Lyon, France",
    salary: "50-65k€", 
    job_seniority: "Mid-level",
    job_type: "Full-time",
    sectors: "SaaS, Web Development",
    apply_url: ["https://innovatetech.fr/jobs/fullstack"],
    compatibility_score: 87
  },
  {
    id: "3",
    company_id: "3",
    date_creation: "2024-01-22",
    description: "AI Engineer position focused on LLM integration and prompt engineering. Work on cutting-edge AI products using Python, TensorFlow, and OpenAI APIs.",
    job_title: "AI Engineer - LLM Specialist", 
    location: "Toulouse, France",
    salary: "70-90k€",
    job_seniority: "Senior",
    job_type: "Full-time",
    sectors: "Artificial Intelligence, Machine Learning",
    apply_url: ["https://aisolutions.com/careers/ai-engineer"],
    compatibility_score: 92
  }
];

export const mockLeadsData: Leads = {
  companies: mockCompanies,
  jobs: mockJobs,
  contacts: mockContacts
};

// Extended mock API
export const backendApi = {
  profile: {
    get: async () => {
      const response = await fetch(`${baseUrl}/prospectio/rest/v1/profile`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      return { data };
    },
    upsert: async (profile: Profile) => {
      const response = await fetch(`${baseUrl}/prospectio/rest/v1/profile/upsert`, {
        method: 'POST', // ou 'POST' selon ton API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      return { data };
    }
  },

  leads: {
    get: async (type, offset, limit) => {
      const response = await fetch(`${baseUrl}/prospectio/rest/v1/leads/${type}/${offset}/${limit}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      switch (type) {
        case 'jobs':
          return { data: data.jobs };
        case 'companies':
          return { data: data.companies };
        case 'contacts':
          return { data: data.contacts };
        case 'leads':
          return { data: mockLeadsData };
        default:
          throw new Error('Invalid type');
      }
    },

    insert: async (source: string, location: string, job_title: string[]) => {
      await delay(1000);
      return { 
        data: mockLeadsData,
        message: `Found new opportunities from ${source}` 
      };
    }
  }
};