// @ts-ignore: Deno npm specifier
import { Hono, Context } from "npm:hono";
// @ts-ignore: Deno npm specifier
import { cors } from "npm:hono/cors";
// @ts-ignore: Deno npm specifier
import { logger } from "npm:hono/logger";
// @ts-ignore: Deno npm specifier
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

declare const Deno: any;

const app = new Hono();

// Create Supabase admin client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-aa72bace/health", (c: Context) => {
  return c.json({ status: "ok" });
});

// ============== AUTH ROUTES ==============

// Sign up (create admin user)
app.post("/make-server-aa72bace/auth/signup", async (c: Context) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// Sign in
app.post("/make-server-aa72bace/auth/signin", async (c: Context) => {
  try {
    const { email, password } = await c.req.json();

    // Create client with anon key for auth
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    const { data, error } = await authClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Signin error:', error);
      return c.json({ error: error.message }, 401);
    }

    return c.json({
      access_token: data.session?.access_token,
      user: data.user,
    });
  } catch (error) {
    console.log('Signin exception:', error);
    return c.json({ error: 'Signin failed' }, 500);
  }
});

// Verify auth middleware
const verifyAuth = async (authHeader: string | null) => {
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;

  return user;
};

// ============== PROJECTS ROUTES ==============

// Get all projects
app.get("/make-server-aa72bace/projects", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    const projects = await kv.getByPrefix('project:');

    // Transform the data
    const projectList = projects.map(item => {
      const p = item as any;
      return {
        id: p.id,
        slug: p.slug || '',
        title: p.title || '',
        subtitle: p.subtitle || '',
        tagline: p.tagline || '',
        role: p.role || '',
        timeline: p.timeline || '',
        location: p.location || '',
        overview: p.overview || '',
        context: p.context || '',
        solution: p.solution || [],
        tech: p.tech || [],
        impact: p.impact || [],
        image: p.image || '',
        liveUrl: p.liveUrl || '',
        githubUrl: p.githubUrl || '',
        caseStudyUrl: p.caseStudyUrl || '',
        color: p.color || 'from-blue-500 to-blue-600',
        category: p.category || 'full-stack',
        status: p.status || 'published',
        projectStatus: p.projectStatus || 'completed',
        featured: p.featured || false,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });

    // Filter by published unless admin
    const filteredProjects = user
      ? projectList
      : projectList.filter(p => p.status === 'published');

    // Sort: Featured first, then by id descending
    filteredProjects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.id - a.id;
    });

    return c.json({ projects: filteredProjects });
  } catch (error) {
    console.log('Get projects error:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Create project (protected)
app.post("/make-server-aa72bace/projects", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectData = await c.req.json();

    // Generate ID
    const allProjects = await kv.getByPrefix('project:');
    const maxId = allProjects.reduce((max, item) => {
      const id = (item.value as any).id || 0;
      return id > max ? id : max;
    }, 0);
    const newId = maxId + 1;

    const newProject = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`project:${newId}`, newProject);

    return c.json({ project: newProject });
  } catch (error) {
    console.log('Create project error:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

// Update project (protected)
app.put("/make-server-aa72bace/projects/:id", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const projectData = await c.req.json();

    const updatedProject = {
      ...projectData,
      id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${id}`, updatedProject);

    return c.json({ project: updatedProject });
  } catch (error) {
    console.log('Update project error:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

// Delete project (protected)
app.delete("/make-server-aa72bace/projects/:id", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`project:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete project error:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// ============== CONTACT ROUTES ==============

// Submit contact form (public)
app.post("/make-server-aa72bace/contact", async (c: Context) => {
  try {
    const { name, email, message } = await c.req.json();

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || !email || !message) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email address' }, 400);
    }

    if (message.trim().length < 10) {
      return c.json({ error: 'Message must be at least 10 characters' }, 400);
    }

    // ── Save to KV store ──────────────────────────────────────────────────────
    const allContacts = await kv.getByPrefix('contact:');
    const maxId = allContacts.reduce((max, item) => {
      const id = (item.value as any).id || 0;
      return id > max ? id : max;
    }, 0);
    const newId = maxId + 1;

    const submittedAt = new Date().toISOString();

    const contactSubmission = {
      id: newId,
      name,
      email,
      message,
      submittedAt,
      read: false,
    };

    await kv.set(`contact:${newId}`, contactSubmission);

    // ── Send email notification via Resend ────────────────────────────────────
    const resendKey = Deno.env.get('RESEND_API_KEY');

    if (resendKey) {
      const formattedDate = new Date(submittedAt).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Karachi',
      });

      const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td>
        <table width="600" align="center" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#3B82F6,#2563EB);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">
                📬 New Portfolio Message
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                Someone reached out via your portfolio contact form
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#F0F9FF;border-radius:10px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">
                      Sender Details
                    </p>
                    <p style="margin:0 0 8px;font-size:15px;color:#1E293B;">
                      <strong style="color:#374151;">Name:</strong>&nbsp; ${name}
                    </p>
                    <p style="margin:0;font-size:15px;color:#1E293B;">
                      <strong style="color:#374151;">Email:</strong>&nbsp;
                      <a href="mailto:${email}" style="color:#3B82F6;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">
                Message
              </p>
              <div style="background:#F9FAFB;border-left:4px solid #3B82F6;border-radius:0 8px 8px 0;padding:18px 20px;margin-bottom:28px;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;white-space:pre-wrap;">${message}</p>
              </div>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:${email}?subject=Re: Your message on shehroz.dev"
                      style="display:inline-block;background:#3B82F6;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #F1F5F9;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;">
                Received on ${formattedDate} (PKT) &nbsp;·&nbsp; Portfolio Contact Form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      // Fire and don't await — email failure should not block the user response
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['shehrozshafiq03@gmail.com'],
          reply_to: email,
          subject: `New portfolio contact from ${name}`,
          html: htmlBody,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          console.log('Resend delivery failed:', err);
        }
      }).catch((err) => {
        console.log('Resend fetch error:', err.message);
      });
    } else {
      console.log('RESEND_API_KEY not set — skipping email notification');
    }

    return c.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.log('Contact form submission error:', error);
    return c.json({ error: 'Failed to send message. Please try again.' }, 500);
  }
});

// Get all contact submissions (protected - for admin)
app.get("/make-server-aa72bace/contact", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const contacts = await kv.getByPrefix('contact:');

    const contactList = contacts.map(item => item.value as any);
    contactList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return c.json({ contacts: contactList });
  } catch (error) {
    console.log('Get contacts error:', error);
    return c.json({ error: 'Failed to fetch contact submissions' }, 500);
  }
});

// Mark contact as read (protected)
app.put("/make-server-aa72bace/contact/:id/read", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const contact = await kv.get(`contact:${id}`);

    if (!contact) {
      return c.json({ error: 'Contact not found' }, 404);
    }

    const updatedContact = {
      ...contact,
      read: true,
      readAt: new Date().toISOString(),
    };

    await kv.set(`contact:${id}`, updatedContact);

    return c.json({ contact: updatedContact });
  } catch (error) {
    console.log('Mark contact as read error:', error);
    return c.json({ error: 'Failed to update contact' }, 500);
  }
});

// Delete contact submission (protected)
app.delete("/make-server-aa72bace/contact/:id", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`contact:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete contact error:', error);
    return c.json({ error: 'Failed to delete contact' }, 500);
  }
});

// ============== SITE CONFIG ROUTES ==============

const DEFAULT_CONFIG = {
  stats: {
    experience: '3',
    projects: '10',
    clients: '10',
    success: '100%',
  },
  hero: {
    title: 'Muhammad Shehroz Shafiq',
    subtitle: 'Full-Stack Developer',
    description: 'Crafting scalable web and mobile applications with modern technologies. Specialized in MERN stack, Flutter, and cloud-native solutions that drive real business impact.',
  },
};

// Get site config
app.get("/make-server-aa72bace/config", async (c: Context) => {
  try {
    const config = await kv.get('site-config');
    return c.json(config || DEFAULT_CONFIG);
  } catch (error) {
    console.log('Get config error:', error);
    return c.json(DEFAULT_CONFIG);
  }
});

// Update site config (protected)
app.put("/make-server-aa72bace/config", async (c: Context) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const configData = await c.req.json();
    await kv.set('site-config', configData);

    return c.json({ success: true, config: configData });
  } catch (error) {
    console.log('Update config error:', error);
    return c.json({ error: 'Failed to update config' }, 500);
  }
});

Deno.serve(app.fetch);