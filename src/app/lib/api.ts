import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { projects as staticProjects } from '../data/projects';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-aa72bace`;
const PROJECTS_API = `https://${projectId}.supabase.co/functions/v1/projects-api`;

// Local in-memory store for projects (no Supabase/network usage)
let mockProjects = staticProjects.map((p, index) => ({
  ...p,
  id: p.id || index + 1,
  githubUrl: p.githubUrl || p.codeUrl,
  shortDescription: p.shortDescription ?? p.overview ?? '',
  solutionFeatures: p.solutionFeatures || p.solution,
  status: p.status || 'published',
  featured: !!p.featured,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// Auth functions (Supabase network calls commented out)
export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');
    return data;
    */

    // Local mock auth – accepts any credentials and returns a fake token
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      access_token: 'mock-access-token',
      user: {
        email,
        name,
      },
    };
  },

  signin: async (email: string, password: string) => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signin failed');
    return data;
    */

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      access_token: 'mock-access-token',
      user: {
        email,
      },
    };
  },
};

// Projects functions
const transformProject = (p: any) => {
  if (!p) return null;
  return {
    ...p,
    image: p.image_url || p.image,
    githubUrl: p.code_url || p.githubUrl,
    shortDescription: p.short_description || p.shortDescription,
    solutionFeatures: p.solution_features || p.solutionFeatures || p.solution,
    // Add other mappings if necessary
  };
};

export const projectsAPI = {
  // Public methods (now using local in-memory data)
  getPublished: async () => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${PROJECTS_API}/projects?status=published`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch projects');
    return (data.data || []).map(transformProject);
    */

    return mockProjects.filter((p) => p.status === 'published');
  },

  getFeatured: async () => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${PROJECTS_API}/projects?status=published&featured=true`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch featured projects');
    return (data.data || []).map(transformProject);
    */

    return mockProjects.filter((p) => p.status === 'published' && p.featured);
  },

  getBySlug: async (slug: string) => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${PROJECTS_API}/projects/${slug}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Project not found');
    return transformProject(data.data);
    */

    const found = mockProjects.find((p) => p.slug === slug);
    if (!found) {
      throw new Error('Project not found');
    }
    return found;
  },

  // Admin methods (now using local in-memory data)
  getAll: async () => {
    /*
    // Original Supabase implementation (network call)
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${PROJECTS_API}/projects`, {
      headers: {
        'Authorization': `Bearer ${token || publicAnonKey}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch projects');
    return (data.data || []).map(transformProject);
    */

    return mockProjects;
  },

  create: async (projectData: any, _authToken: string) => {
    /*
    // Original Supabase implementation (network call)
    const dbData = {
      ...projectData,
      image_url: projectData.image,
      code_url: projectData.githubUrl,
      short_description: projectData.shortDescription,
      solution_features: projectData.solutionFeatures || projectData.solution,
    };

    const response = await fetch(`${PROJECTS_API}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(dbData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create project');
    return transformProject(data.data);
    */

    const now = new Date().toISOString();
    const id = Date.now();
    const slug = projectData.slug || generateSlug(projectData.title || `project-${id}`);

    const newProject = {
      ...projectData,
      id,
      slug,
      githubUrl: projectData.githubUrl || projectData.codeUrl,
      shortDescription: projectData.shortDescription ?? '',
      solutionFeatures: projectData.solutionFeatures || projectData.solution || [],
      status: projectData.status || 'published',
      featured: !!projectData.featured,
      createdAt: now,
      updatedAt: now,
    };

    mockProjects = [newProject, ...mockProjects];
    return newProject;
  },

  update: async (id: string | number, projectData: any, _authToken: string) => {
    /*
    // Original Supabase implementation (network call)
    const dbData = {
      ...projectData,
      image_url: projectData.image,
      code_url: projectData.githubUrl,
      short_description: projectData.shortDescription,
      solution_features: projectData.solutionFeatures || projectData.solution,
    };

    const response = await fetch(`${PROJECTS_API}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(dbData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update project');
    return transformProject(data.data);
    */

    const index = mockProjects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }

    const existing = mockProjects[index];
    const updated = {
      ...existing,
      ...projectData,
      githubUrl: projectData.githubUrl || projectData.codeUrl || existing.githubUrl,
      shortDescription: projectData.shortDescription ?? existing.shortDescription,
      solutionFeatures: projectData.solutionFeatures || projectData.solution || existing.solutionFeatures,
      updatedAt: new Date().toISOString(),
    };

    mockProjects[index] = updated;
    return updated;
  },

  delete: async (id: string | number, _authToken: string) => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${PROJECTS_API}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to delete project');
    return data;
    */

    mockProjects = mockProjects.filter((p) => p.id !== id);
    return { success: true };
  },
};

// Config functions (local mock, original network calls commented out)
const mockConfig: any = {
  hero: {
    description:
      'Crafting scalable web and mobile applications with modern technologies. Specialized in MERN stack, Flutter, and cloud-native solutions.',
  },
  stats: {
    experience: '3',
    projects: '10',
    clients: '10',
    success: '100%',
  },
};

export const configAPI = {
  get: async () => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${BASE_URL}/config`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch config');
    return data;
    */

    return mockConfig;
  },

  update: async (configData: any, _authToken: string) => {
    /*
    // Original Supabase implementation (network call)
    const response = await fetch(`${BASE_URL}/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(configData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update config');
    return data;
    */

    Object.assign(mockConfig, configData || {});
    return mockConfig;
  },
};
