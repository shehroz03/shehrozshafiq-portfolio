import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  read: boolean;
  readAt?: string;
};

// Local in-memory contacts store (no network)
let mockContacts: Contact[] = [];
let nextContactId = 1;

// API helper for making requests to the server
// Supabase / network calls have been commented out and replaced with local behavior
export const api = {
  // Contact form submission
  async submitContact(data: { name: string; email: string; message: string }) {
    /*
    // Original Supabase implementation (network call) - Re-enabled for email functionality
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/super-api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.warn('Network submission failed, falling back to local storage:', result.error);
      }
    } catch (error) {
      console.warn('Network submission error, falling back to local storage:', error);
    }
    */

    // Still save to local memory for the session
    const now = new Date().toISOString();
    const newContact: Contact = {
      id: nextContactId++,
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: now,
      read: false,
    };

    mockContacts = [newContact, ...mockContacts];

    return { success: true, contact: newContact };
  },

  // Get all contact submissions (admin only)
  async getContacts(_accessToken: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/contact`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch contacts');
    }

    return result;
    */

    return { contacts: mockContacts };
  },

  // Mark contact as read (admin only)
  async markContactAsRead(id: number, _accessToken: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/contact/${id}/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to mark contact as read');
    }

    return result;
    */

    const idx = mockContacts.findIndex((c) => c.id === id);
    if (idx === -1) {
      throw new Error('Contact not found');
    }

    const updated: Contact = {
      ...mockContacts[idx],
      read: true,
      readAt: new Date().toISOString(),
    };

    mockContacts[idx] = updated;
    return { contact: updated };
  },

  // Delete contact submission (admin only)
  async deleteContact(id: number, _accessToken: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete contact');
    }

    return result;
    */

    mockContacts = mockContacts.filter((c) => c.id !== id);
    return { success: true };
  },

  // Projects API (legacy) – now returns empty local data without network calls
  async getProjects() {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch projects');
    }

    return result;
    */

    return { projects: [] };
  },

  // Create project (admin only)
  async createProject(_data: any, _accessToken: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create project');
    }

    return result;
    */

    throw new Error('Project creation is disabled in local-only mode.');
  },

  // Update project (admin only)
  async updateProject(_id: number, _data: any, _accessToken: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update project');
    }

    return result;
    */

    throw new Error('Project updates are disabled in local-only mode.');
  },

  // Delete project (admin only)
  async deleteProject(_id: number, _accessToken: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete project');
    }

    return result;
    */

    throw new Error('Project deletion is disabled in local-only mode.');
  },

  // Auth API (legacy) – network calls commented out
  async signIn(email: string, password: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Sign in failed');
    }

    return result;
    */

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      access_token: 'mock-access-token',
      user: { email },
    };
  },

  async signUp(email: string, password: string, name: string) {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-aa72bace/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Sign up failed');
    }

    return result;
    */

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      access_token: 'mock-access-token',
      user: { email, name },
    };
  },
};
