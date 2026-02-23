# Supabase Integration Setup Guide

Your portfolio website is now fully integrated with Supabase for real data persistence and authentication! 🎉

## 🚀 What's Been Integrated

✅ **Supabase Auth** - Real user authentication with sign in/sign up
✅ **Projects CRUD API** - Full Create, Read, Update, Delete operations  
✅ **Admin Panel** - Connected to real database with auth protection
✅ **Portfolio Projects Page** - Dynamically fetches projects from database
✅ **KV Store** - Uses existing Supabase key-value table for data storage

## 📋 Setup Instructions

### 1. Create Admin User in Supabase

Since email verification is disabled (no email server configured), you need to create your admin user manually:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add User"** → **"Create new user"**
4. Fill in:
   - **Email**: Your admin email (e.g., `admin@yourdomain.com`)
   - **Password**: Your secure password
   - **Auto Confirm User**: ✅ **ENABLE THIS** (important!)
5. Click **"Create User"**

### 2. Test the Admin Login

1. Go to `/admin` in your portfolio website
2. Login with the credentials you just created
3. You should be redirected to `/admin/dashboard`

### 3. Add Your First Projects

**Option A: Via Admin Panel (Recommended)**
1. Login to `/admin/dashboard`
2. Click **"Add Project"** button
3. Fill in the project details:
   - Title (e.g., "My Awesome App")
   - Subtitle (e.g., "E-commerce Platform")
   - Description
   - Image URL (use Unsplash or your own images)
   - Technologies (click "Add" for each tech)
   - Features (optional, for project detail modal)
   - Color gradient (e.g., `from-blue-500 to-blue-600`)
   - Live URL
   - GitHub URL
4. Click **"Create Project"**
5. Your project will appear in both the admin panel and the public Projects page!

**Option B: Seed Sample Projects (Optional)**
If you want to quickly populate with sample data:

1. Login to `/admin/dashboard`
2. Open browser console (F12)
3. Run this code:

```javascript
const seedProjects = async () => {
  const { projectsAPI } = await import('/src/app/lib/api.ts');
  const { initialProjects } = await import('/src/app/lib/seed-projects.ts');
  const token = localStorage.getItem('auth_token');
  
  for (const project of initialProjects) {
    await projectsAPI.create(project, token);
    console.log('Created:', project.title);
  }
  
  console.log('✅ All projects seeded successfully!');
  window.location.reload();
};

seedProjects();
```

4. Wait for it to finish, then refresh the page

### 4. View Your Projects

1. Go to the **Projects** page (`/projects`)
2. Your projects should now load from the database!
3. Click on any project to see the detailed modal view

## 🔐 Authentication Flow

### Admin Login
- **Route**: `/admin`
- **Email**: Your Supabase user email
- **Password**: Your Supabase user password
- **Session**: Stored in localStorage as `auth_token`

### Protected Routes
- `/admin/dashboard` - Requires authentication
- API routes for Create/Update/Delete - Require auth token

### Public Routes
- `/` - Home
- `/projects` - Projects (read-only, no auth needed)
- `/about` - About
- `/contact` - Contact

## 🗄️ Database Structure

Projects are stored in the Supabase KV store with this structure:

**Key**: `project:{id}`

**Value**:
```json
{
  "id": 1,
  "title": "Project Title",
  "subtitle": "Project Subtitle",
  "description": "Project description",
  "image": "https://image-url.com/image.jpg",
  "tech": ["React", "Node.js", "MongoDB"],
  "features": ["Feature 1", "Feature 2"],
  "liveUrl": "https://live-url.com",
  "githubUrl": "https://github.com/user/repo",
  "color": "from-blue-500 to-blue-600",
  "createdAt": "2024-02-22T10:00:00Z"
}
```

## 🔧 API Endpoints

All endpoints are prefixed with: `https://{projectId}.supabase.co/functions/v1/make-server-aa72bace`

### Authentication
- `POST /auth/signup` - Create new user (admin use)
- `POST /auth/signin` - Sign in and get access token

### Projects (Public)
- `GET /projects` - Get all projects (no auth required)

### Projects (Protected - Requires Auth)
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update existing project
- `DELETE /projects/:id` - Delete project

## 📝 Using the Admin Panel

### Add Project
1. Click "Add Project"
2. Fill in all fields (title and description are required)
3. Add technologies by typing and clicking "Add"
4. Add features (optional) for the project detail page
5. Set a color gradient using Tailwind classes
6. Click "Create Project"

### Edit Project
1. Click the ✏️ edit icon on any project row
2. Modify the fields you want to change
3. Click "Save Changes"

### Delete Project
1. Click the 🗑️ delete icon on any project row
2. Project will be immediately deleted
3. Changes reflect on both admin panel and public projects page

## 🎨 Customization

### Color Gradients
Use Tailwind gradient classes for project colors:
- `from-blue-500 to-blue-600` (Blue)
- `from-purple-500 to-purple-600` (Purple)
- `from-green-500 to-green-600` (Green)
- `from-red-500 to-red-600` (Red)
- `from-pink-500 to-pink-600` (Pink)
- `from-orange-500 to-orange-600` (Orange)

### Images
For project images, you can use:
- Unsplash URLs (free stock photos)
- Your own hosted images
- Image CDN services

## 🐛 Troubleshooting

### "Unauthorized" Error
- **Solution**: Your session expired. Logout and login again.

### "Failed to fetch projects"
- **Solution**: Check that your Supabase Edge Function is deployed and running.
- Check the browser console for detailed error messages.

### Projects not showing on public page
- **Solution**: 
  1. Login to admin dashboard
  2. Verify projects exist in the table
  3. Check browser console for API errors
  4. Verify the API endpoint is accessible

### Can't login
- **Solution**:
  1. Verify the user exists in Supabase Auth
  2. Make sure "Auto Confirm User" was enabled
  3. Check that email and password are correct
  4. Check browser console for detailed error

## 🔒 Security Notes

- ✅ Admin routes are protected with authentication
- ✅ Auth tokens stored in localStorage (not exposed in code)
- ✅ SUPABASE_SERVICE_ROLE_KEY only used on backend (secure)
- ✅ Public routes (portfolio pages) use SUPABASE_ANON_KEY
- ✅ All API calls use proper authorization headers

## 🎯 Next Steps

Now that your portfolio is connected to Supabase, you can:

1. **Add real projects** via the admin panel
2. **Customize content** in the About and Contact pages
3. **Deploy to production** (Vercel, Netlify, etc.)
4. **Set up custom domain**
5. **Add more admin features** (content management, analytics, etc.)

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Review the Supabase Dashboard logs
3. Verify all environment variables are set correctly

---

**Congratulations!** 🎉 Your portfolio now has a fully functional backend with real data persistence!
