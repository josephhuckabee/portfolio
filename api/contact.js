const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const parseBody = async (req) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("application/json")) {
    return req.body || {};
  }
  const raw = await readBody(req);
  if (!raw) return {};
  const params = new URLSearchParams(raw);
  return Object.fromEntries(params.entries());
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const accepts = req.headers.accept || "";
  const wantsHtml = accepts.includes("text/html") && !accepts.includes("application/json");

  const body = await parseBody(req);
  if (body.website) {
    if (wantsHtml) {
      res.writeHead(303, { Location: "/contact/?status=sent" });
      res.end();
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  const name =
    body.name ||
    `${body.firstName || body.fname || ""} ${body.lastName || body.lname || ""}`.trim();
  const email = body.email || "";
  const message = body.message || "New contact submission";

  if (!email) {
    if (wantsHtml) {
      res.writeHead(303, { Location: "/contact/?status=error" });
      res.end();
      return;
    }
    res.status(400).json({ ok: false, error: "Missing email" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    if (wantsHtml) {
      res.writeHead(303, { Location: "/contact/?status=error" });
      res.end();
      return;
    }
    res.status(500).json({ ok: false, error: "Server not configured" });
    return;
  }

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject: `New contact from ${name || email}`,
    html: `
      <h2>New Contact</h2>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    reply_to: email
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (wantsHtml) {
        res.writeHead(303, { Location: "/contact/?status=error" });
        res.end();
        return;
      }
      res.status(502).json({ ok: false, error: errorText });
      return;
    }

    if (wantsHtml) {
      res.writeHead(303, { Location: "/contact/?status=sent" });
      res.end();
      return;
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    if (wantsHtml) {
      res.writeHead(303, { Location: "/contact/?status=error" });
      res.end();
      return;
    }
    res.status(500).json({ ok: false, error: "Email send failed" });
  }
};
