import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'efapowertech042@gmail.com';
const PORT = Number(process.env.PORT) || 3000;

interface ContactPayload {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.post('/api/contact', async (req: Request, res: Response) => {
    const body = (req.body || {}) as ContactPayload;
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const inquiryType = (body.inquiryType || 'General Collaboration').trim();
    const message = (body.message || '').trim();

    if (!name || !email || !message || !isValidEmail(email)) {
      res.status(400).json({
        ok: false,
        error: 'Please provide a valid name, email address, and inquiry message.',
      });
      return;
    }

    const subject = `[Portfolio Inquiry] ${inquiryType} — from ${name}`;
    const textBody = [
      `New Collaboration Inquiry from Efa Godspower Portfolio`,
      ``,
      `Name: ${name}`,
      `Reply-To Email: ${email}`,
      `Inquiry Type: ${inquiryType}`,
      ``,
      `Message:`,
      message,
    ].join('\n');

    // 1. Direct Gmail SMTP if configured via environment secrets
    const gmailUser = process.env.GMAIL_USER || RECIPIENT_EMAIL;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: `"Efa Godspower Portfolio" <${gmailUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject,
          text: textBody,
        });

        res.json({
          ok: true,
          method: 'gmail-smtp',
          recipient: RECIPIENT_EMAIL,
          message: `Message delivered directly to ${RECIPIENT_EMAIL}.`,
        });
        return;
      } catch (err) {
        console.error('Gmail SMTP send failed, falling back to relay:', err);
      }
    }

    // 2. Server-side FormSubmit AJAX relay to efapowertech042@gmail.com
    try {
      const originHeader =
        process.env.APP_URL ||
        (typeof req.headers.origin === 'string' ? req.headers.origin : 'https://efagodspower.portfolio');

      const relayRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: originHeader,
          Referer: originHeader,
        },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          message,
          _subject: subject,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const relayJson = (await relayRes.json().catch(() => null)) as
        | { success?: string | boolean; message?: string }
        | null;

      if (relayRes.ok && (relayJson?.success === 'true' || relayJson?.success === true)) {
        res.json({
          ok: true,
          method: 'formsubmit-relay',
          recipient: RECIPIENT_EMAIL,
          message: `Inquiry forwarded to ${RECIPIENT_EMAIL}. (If this is your first submission, confirm the one-time activation email in your Gmail inbox.)`,
        });
        return;
      }
    } catch (relayErr) {
      console.error('FormSubmit relay error:', relayErr);
    }

    // 3. Fallback response allowing one-click Gmail Web / mailto dispatch
    res.json({
      ok: true,
      method: 'direct-compose',
      recipient: RECIPIENT_EMAIL,
      message: `Inquiry prepared for ${RECIPIENT_EMAIL}. Click "Open in Gmail" below to dispatch directly from your inbox.`,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: 'spa',
      plugins: [
        {
          name: 'disable-preview-hmr-websocket',
          transform(code, id) {
            if (id.replace(/\\/g, '/').includes('vite/dist/client/client.mjs')) {
              return {
                code: code.replace(
                  'transport.connect(createHMRHandler(handleMessage));',
                  '/* HMR WebSocket disabled in preview environment */'
                ),
                map: null,
              };
            }
          },
        },
      ],
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      const indexHtml = path.join(distPath, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

createServer();
