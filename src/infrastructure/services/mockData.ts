// Mock data for development - Prospectio
import { 
  Profile
} from '@/domain/entities/types';

import { ConfigRepository } from '@/infrastructure/services/configRepository';

const config = await new ConfigRepository().getConfig();

const baseUrl = config.backendUrl;

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
        default:
          throw new Error('Invalid type');
      }
    },

    // insert: async (source: string, location: string, job_title: string[]) => {
    //   await delay(1000);
    //   return { 
    //     data: mockLeadsData,
    //     message: `Found new opportunities from ${source}` 
    //   };
    // }
  }
};