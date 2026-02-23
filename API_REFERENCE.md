# Portfolio API Reference

Quick reference for all API endpoints in your portfolio application.

## Base URL
```
https://qxivekbhtsvsiwsmayyg.supabase.co/functions/v1/make-server-aa72bace
```

## Authentication Headers

### Public Endpoints
```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'Content-Type': 'application/json'
}
```

### Protected Endpoints (After Login)
```javascript
const token = localStorage.getItem('auth_token');
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## 🔐 Authentication Endpoints

### Sign Up (Admin Only)
Create a new admin user.

**Endpoint:** `POST /auth/signup`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword",
  "name": "Admin Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "user_metadata": {
      "name": "Admin Name"
    }
  }
}
```

**Error Response:**
```json
{
  "error": "User already registered"
}
```

---

### Sign In
Login to get access token.

**Endpoint:** `POST /auth/signin`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com"
  }
}
```

**Error Response:**
```json
{
  "error": "Invalid login credentials"
}
```

**Usage:**
```javascript
import { authAPI } from '/src/app/lib/api';

const { access_token, user } = await authAPI.signin(email, password);
localStorage.setItem('auth_token', access_token);
```

---

## 📁 Projects Endpoints

### Get All Projects (Public)
Fetch all projects for display on the portfolio.

**Endpoint:** `GET /projects`

**Auth:** Public (no login required)

**Response:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "SOCIALVIBING.ONLINE",
      "subtitle": "Social Media Analytics Dashboard",
      "description": "A comprehensive social media analytics platform...",
      "image": "https://images.unsplash.com/photo-xyz",
      "tech": ["React", "Node.js", "MongoDB"],
      "features": [
        "Real-time data synchronization",
        "AI-powered recommendations"
      ],
      "liveUrl": "https://socialvibing.online",
      "githubUrl": "https://github.com/user/repo",
      "color": "from-blue-500 to-blue-600"
    }
  ]
}
```

**Usage:**
```javascript
import { projectsAPI } from '/src/app/lib/api';

const projects = await projectsAPI.getAll();
```

---

### Create Project (Protected)
Add a new project to the portfolio.

**Endpoint:** `POST /projects`

**Auth:** Required (admin only)

**Request:**
```json
{
  "title": "New Project",
  "subtitle": "Project Subtitle",
  "description": "Detailed project description",
  "image": "https://example.com/image.jpg",
  "tech": ["React", "TypeScript"],
  "features": ["Feature 1", "Feature 2"],
  "liveUrl": "https://live-demo.com",
  "githubUrl": "https://github.com/user/repo",
  "color": "from-purple-500 to-purple-600"
}
```

**Response:**
```json
{
  "project": {
    "id": 4,
    "title": "New Project",
    "subtitle": "Project Subtitle",
    "description": "Detailed project description",
    "image": "https://example.com/image.jpg",
    "tech": ["React", "TypeScript"],
    "features": ["Feature 1", "Feature 2"],
    "liveUrl": "https://live-demo.com",
    "githubUrl": "https://github.com/user/repo",
    "color": "from-purple-500 to-purple-600",
    "createdAt": "2024-02-22T10:30:00.000Z"
  }
}
```

**Usage:**
```javascript
const token = localStorage.getItem('auth_token');
const newProject = await projectsAPI.create({
  title: "My Project",
  description: "Description",
  // ... other fields
}, token);
```

---

### Update Project (Protected)
Update an existing project.

**Endpoint:** `PUT /projects/:id`

**Auth:** Required (admin only)

**URL Parameters:**
- `id` - Project ID (integer)

**Request:**
```json
{
  "title": "Updated Title",
  "subtitle": "Updated Subtitle",
  "description": "Updated description",
  "image": "https://example.com/new-image.jpg",
  "tech": ["React", "TypeScript", "Node.js"],
  "features": ["New Feature 1"],
  "liveUrl": "https://new-live-url.com",
  "githubUrl": "https://github.com/user/new-repo",
  "color": "from-green-500 to-green-600"
}
```

**Response:**
```json
{
  "project": {
    "id": 1,
    "title": "Updated Title",
    // ... all updated fields
    "updatedAt": "2024-02-22T11:00:00.000Z"
  }
}
```

**Usage:**
```javascript
const token = localStorage.getItem('auth_token');
const updated = await projectsAPI.update(1, {
  title: "New Title",
  // ... other fields
}, token);
```

---

### Delete Project (Protected)
Remove a project from the portfolio.

**Endpoint:** `DELETE /projects/:id`

**Auth:** Required (admin only)

**URL Parameters:**
- `id` - Project ID (integer)

**Response:**
```json
{
  "success": true
}
```

**Usage:**
```javascript
const token = localStorage.getItem('auth_token');
await projectsAPI.delete(1, token);
```

---

## ⚠️ Error Responses

All endpoints may return these error codes:

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```
**Solution:** Login again to refresh your access token.

### 500 Internal Server Error
```json
{
  "error": "Failed to create project"
}
```
**Solution:** Check server logs for detailed error information.

---

## 🔄 Client-Side API Usage

### Using the API Helper
The project includes a pre-built API helper at `/src/app/lib/api.ts`:

```javascript
import { authAPI, projectsAPI } from '/src/app/lib/api';

// Authentication
const { access_token } = await authAPI.signin(email, password);
localStorage.setItem('auth_token', access_token);

// Get all projects (public)
const projects = await projectsAPI.getAll();

// Create project (protected)
const token = localStorage.getItem('auth_token');
const newProject = await projectsAPI.create(projectData, token);

// Update project (protected)
const updated = await projectsAPI.update(id, projectData, token);

// Delete project (protected)
await projectsAPI.delete(id, token);
```

---

## 🧪 Testing in Browser Console

### Test Authentication
```javascript
// Sign in
const { authAPI } = await import('/src/app/lib/api.ts');
const result = await authAPI.signin('admin@example.com', 'password');
console.log(result);
localStorage.setItem('auth_token', result.access_token);
```

### Test Get Projects
```javascript
const { projectsAPI } = await import('/src/app/lib/api.ts');
const projects = await projectsAPI.getAll();
console.log(projects);
```

### Test Create Project
```javascript
const { projectsAPI } = await import('/src/app/lib/api.ts');
const token = localStorage.getItem('auth_token');
const newProject = await projectsAPI.create({
  title: "Test Project",
  subtitle: "Testing API",
  description: "This is a test",
  image: "https://via.placeholder.com/400",
  tech: ["React"],
  features: ["Feature 1"],
  liveUrl: "#",
  githubUrl: "#",
  color: "from-blue-500 to-blue-600"
}, token);
console.log(newProject);
```

---

## 📊 Data Model

### Project Object
```typescript
interface Project {
  id: number;                    // Auto-generated
  title: string;                 // Required
  subtitle: string;              // Optional
  description: string;           // Required
  image: string;                 // Image URL
  tech: string[];                // Technology tags
  features: string[];            // Key features list
  liveUrl: string;              // Live demo URL
  githubUrl: string;            // GitHub repo URL
  color: string;                // Tailwind gradient classes
  createdAt?: string;           // ISO timestamp (auto)
  updatedAt?: string;           // ISO timestamp (auto)
}
```

---

## 🎯 Rate Limits

Currently, there are **no rate limits** on API endpoints. For production deployment, consider implementing:
- Request throttling
- Authentication rate limiting
- CORS restrictions

---

## 🔒 Security Best Practices

1. **Never expose the access token** in client-side code
2. **Store tokens in localStorage** (not in cookies for this SPA)
3. **Clear tokens on logout**
4. **Use HTTPS** in production
5. **Implement CSRF protection** if using cookies
6. **Validate all inputs** server-side
7. **Use environment variables** for sensitive keys

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)

---

**Last Updated:** February 22, 2026
