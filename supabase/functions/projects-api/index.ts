import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable CORS
app.use("/*", cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// Initialize Supabase Client (Service Role for internal bypass of RLS where needed)
const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

/**
 * Middleware to verify Admin JWT
 */
const isAdmin = async (c: any, next: any) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ error: "Missing Authorization header" }, 401);

    const token = authHeader.split(" ")[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    // Optional: Check for specific admin role/meta if needed
    // if (user.user_metadata?.role !== 'admin') return c.json({ error: "Forbidden" }, 403);

    c.set("user", user);
    await next();
};

// --- ROUTES ---

// GET /projects - List projects (Public/Admin compatible)
app.get("/projects", async (c) => {
    const status = c.req.query("status");
    const featured = c.req.query("featured");

    let query = supabaseAdmin.from("projects").select("*");

    if (status) query = query.eq("status", status);
    if (featured === "true") query = query.eq("featured", true);

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) return c.json({ error: error.message }, 500);
    return c.json({ data });
});

// GET /projects/:slug - Get by slug
app.get("/projects/:slug", async (c) => {
    const slug = c.req.param("slug");
    const { data, error } = await supabaseAdmin
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) return c.json({ error: "Project not found" }, 404);
    return c.json({ data });
});

// POST /projects - Create (Admin Only)
app.post("/projects", isAdmin, async (c) => {
    const body = await c.req.json();
    const { data, error } = await supabaseAdmin
        .from("projects")
        .insert([body])
        .select()
        .single();

    if (error) return c.json({ error: error.message }, 400);
    return c.json({ data }, 201);
});

// PUT /projects/:id - Update (Admin Only)
app.put("/projects/:id", isAdmin, async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { data, error } = await supabaseAdmin
        .from("projects")
        .update(body)
        .eq("id", id)
        .select()
        .single();

    if (error) return c.json({ error: error.message }, 400);
    return c.json({ data });
});

// DELETE /projects/:id - Delete (Admin Only)
app.delete("/projects/:id", isAdmin, async (c) => {
    const id = c.req.param("id");
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);

    if (error) return c.json({ error: error.message }, 400);
    return c.json({ success: true });
});

Deno.serve(app.fetch);
