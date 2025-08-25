// Domain types for Prospectio - Core business entities

export type LeadStatus = 'cold' | 'warm' | 'hot';
export type LeadSource = 'website' | 'linkedin' | 'referral' | 'cold_email' | 'event' | 'other';
export type TaskType = 'call' | 'email' | 'meeting' | 'follow_up' | 'demo';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  position?: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  score: number; // 0-100
  lastContactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  leadId: string;
  lead?: Lead;
  dueDate: Date;
  completed: boolean;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMetrics {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  averageScore: number;
  conversionRate: number;
  tasksToday: number;
  overdueTasks: number;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'email_sent' | 'call_made' | 'meeting_scheduled' | 'status_changed' | 'note_added';
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  leadContext?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filters and search
export interface LeadFilters {
  status?: LeadStatus[];
  source?: LeadSource[];
  scoreMin?: number;
  scoreMax?: number;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface TaskFilters {
  completed?: boolean;
  priority?: TaskPriority[];
  type?: TaskType[];
  dateFrom?: Date;
  dateTo?: Date;
  leadId?: string;
}