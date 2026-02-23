# 🚀 Quick Start Guide

Get your portfolio up and running with Supabase in 5 minutes!

## ✅ Checklist

### Step 1: Create Admin User (2 min)
- [ ] Go to [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] Click **Authentication** → **Users** → **Add User**
- [ ] Enter your email and password
- [ ] ✅ **IMPORTANT:** Enable "Auto Confirm User"
- [ ] Click "Create User"

### Step 2: Login to Admin Panel (1 min)
- [ ] Visit your portfolio at `/admin`
- [ ] Enter the credentials you just created
- [ ] You should be redirected to `/admin/dashboard`

### Step 3: Add Your First Project (2 min)
- [ ] Click the **"Add Project"** button
- [ ] Fill in the form:
  - Title: `My First Project` ✏️
  - Subtitle: `A cool web app` 
  - Description: `This is my awesome project...`
  - Image URL: Get one from [Unsplash](https://unsplash.com)
  - Tech: Add your technologies (React, Node.js, etc.)
  - Features: Add key features (optional)
  - Color: `from-blue-500 to-blue-600`
  - Live URL: Your demo link
  - GitHub URL: Your repo link
- [ ] Click **"Create Project"**

### Step 4: View Your Project (30 sec)
- [ ] Go to the **Projects** page (`/projects`)
- [ ] Your project should appear! 🎉
- [ ] Click on it to see the detail modal

---

## 🎯 You're Done!

Your portfolio is now:
- ✅ Connected to Supabase
- ✅ Using real authentication
- ✅ Storing projects in the database
- ✅ Displaying dynamic content

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **Home Page** | `/` |
| **Projects Page** | `/projects` |
| **Admin Login** | `/admin` |
| **Admin Dashboard** | `/admin/dashboard` |
| **Supabase Dashboard** | https://supabase.com/dashboard |

---

## 📝 Next Actions

### Option 1: Add More Projects
1. Login to `/admin/dashboard`
2. Click "Add Project"
3. Repeat for each project

### Option 2: Seed Sample Data
1. Login to `/admin/dashboard`
2. Open browser console (F12)
3. Copy and paste this:

```javascript
const seedProjects = async () => {
  const { projectsAPI } = await import('/src/app/lib/api.ts');
  const { initialProjects } = await import('/src/app/lib/seed-projects.ts');
  const token = localStorage.getItem('auth_token');
  
  for (const project of initialProjects) {
    await projectsAPI.create(project, token);
    console.log('✅ Created:', project.title);
  }
  
  console.log('🎉 All projects seeded!');
  window.location.reload();
};

seedProjects();
```

4. Press Enter and wait
5. Page will reload with 3 sample projects

---

## 🎨 Customization Tips

### Change Project Colors
Use these Tailwind gradient classes in the "Color" field:

| Color | Class |
|-------|-------|
| 🔵 Blue | `from-blue-500 to-blue-600` |
| 🟣 Purple | `from-purple-500 to-purple-600` |
| 🟢 Green | `from-green-500 to-green-600` |
| 🔴 Red | `from-red-500 to-red-600` |
| 🌸 Pink | `from-pink-500 to-pink-600` |
| 🟠 Orange | `from-orange-500 to-orange-600` |
| 🟡 Yellow | `from-yellow-400 to-yellow-500` |

### Get Free Images
- [Unsplash](https://unsplash.com) - High quality photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images

### Project Image URLs
When copying from Unsplash:
1. Find an image you like
2. Right-click → "Copy image address"
3. Paste into the "Image URL" field
4. Or use the format: `https://images.unsplash.com/photo-{id}?w=1080`

---

## 🐛 Common Issues

### ❌ Can't Login
**Problem:** "Invalid credentials" error

**Solution:**
1. Go to Supabase Dashboard → Authentication → Users
2. Make sure user exists
3. Check "Auto Confirm User" was enabled
4. Try resetting password

---

### ❌ Projects Not Showing
**Problem:** Empty projects page

**Solution:**
1. Login to `/admin/dashboard`
2. Check if projects exist in the table
3. Open browser console (F12) → Check for errors
4. Verify API endpoint is working

---

### ❌ Session Expired
**Problem:** "Unauthorized" error in admin panel

**Solution:**
1. Click "Logout"
2. Login again
3. Session token will refresh

---

## 📚 More Help

Need detailed docs?
- 📖 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Full setup guide
- 📖 [API_REFERENCE.md](./API_REFERENCE.md) - Complete API docs

---

## 🎉 Congratulations!

Your portfolio website now has:
- 🔐 Secure admin authentication
- 📝 Full CRUD project management
- 🗄️ Real database persistence
- 🌐 Dynamic content loading
- 📱 Responsive design
- ✨ Beautiful animations

**Now go add your amazing projects!** 🚀
