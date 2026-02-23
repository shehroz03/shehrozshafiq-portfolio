// Edge Function: super-api (contact form + email)

// 1) Supabase runtime types
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

declare const Deno: any;

interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

// 2) Helper: send email via Resend
async function sendEmail(payload: ContactPayload) {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not set");
        return;
    }

    const { name, email, message } = payload;

    const body = {
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["shehrozshafiq03@gmail.com"],
        reply_to: email,
        subject: `New portfolio contact from ${name}`,
        html: `
      <h2>New Portfolio Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p>Reply directly to this email to respond.</p>
    `,
    };

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", res.status, err);
    }
}

// 3) Main handler
Deno.serve(async (req: Request) => {
    try {
        if (req.method !== "POST") {
            return new Response(
                JSON.stringify({ error: "Method not allowed" }),
                { status: 405, headers: { "Content-Type": "application/json" } },
            );
        }

        const payload = (await req.json()) as Partial<ContactPayload>;
        const name = payload.name?.trim();
        const email = payload.email?.trim();
        const message = payload.message?.trim();

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing fields" }),
                { status: 400, headers: { "Content-Type": "application/json" } },
            );
        }

        // TODO: yahan agar tum DB me save karte ho to wo code bhi laga sakte ho

        // Email bhejo (fire-and-forget)
        sendEmail({ name, email, message }).catch((e) =>
            console.error("sendEmail failed:", e)
        );

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    } catch (err) {
        console.error("Function error:", err);
        return new Response(
            JSON.stringify({ error: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
});
