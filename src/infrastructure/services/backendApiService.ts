import { Profile } from '@/domain/entities/types';
import { ConfigRepository } from '@/infrastructure/services/configRepository';

/**
 * Service class for handling backend API calls
 * Provides methods for profile and leads operations
 */
export class BackendApiService {

  private readonly config = new ConfigRepository().getConfig();

  constructor() {}

  /**
   * Get user profile from backend
   */
  async getProfile(): Promise<{ data: any }> {
    const response = await fetch(`${(await this.config).backendUrl}/prospectio/rest/v1/profile`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    const data = await response.json();
    return { data };
  }

  /**
   * Upsert user profile to backend
   */
  async upsertProfile(profile: Profile): Promise<{ data: any }> {
    const response = await fetch(`${(await this.config).backendUrl}/prospectio/rest/v1/profile/upsert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    const data = await response.json();
    return { data };
  }

  /**
   * Get leads from backend by type with pagination
   */
  async getLeads(type: string, offset: number, limit: number): Promise<{ data: any }> {
    const response = await fetch(`${(await this.config).backendUrl}/prospectio/rest/v1/leads/${type}/${offset}/${limit}`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    const data = await response.json();
    
    switch (type) {
      case 'jobs':
        return { data: data.jobs };
      case 'companies':
        return { data: data.companies };
      case 'contacts':
        return { data: data.contacts };
      default:
        throw new Error('Invalid type');
    }
  }
}