import { useState, FormEvent } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Send,
  Phone,
  Mail,
  Copy,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { CANONICAL_URLS, CONTACT_INFO } from '../data/portfolioData';

type InquiryType =
  | 'Full-Time Data Scientist'
  | 'AI/ML Evaluation Specialist'
  | 'BI & Analytics Consulting'
  | 'General Collaboration';

const INQUIRY_OPTIONS: InquiryType[] = [
  'Full-Time Data Scientist',
  'AI/ML Evaluation Specialist',
  'BI & Analytics Consulting',
  'General Collaboration',
];

interface DeliveryResult {
  method: string;
  recipient: string;
  message: string;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>('Full-Time Data Scientist');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deliveryResult, setDeliveryResult] = useState<DeliveryResult | null>(null);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

  const handleCopy = (field: 'phone' | 'email', value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const buildGmailComposeUrl = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${inquiryType} — from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nReply Email: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      CONTACT_INFO.email
    )}&su=${subject}&body=${body}`;
  };

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${inquiryType} — from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nReply Email: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
    );
    return `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSending(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, inquiryType, message }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        method?: string;
        recipient?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setErrorMsg(
          data.error ||
            `Unable to send automatically. You can dispatch directly to ${CONTACT_INFO.email} below.`
        );
        return;
      }

      setDeliveryResult({
        method: data.method || 'formsubmit-relay',
        recipient: data.recipient || CONTACT_INFO.email,
        message:
          data.message ||
          `Inquiry routed to ${CONTACT_INFO.email}.`,
      });
    } catch {
      // If preview/network blocks server relay, still allow immediate Gmail/mailto dispatch
      setDeliveryResult({
        method: 'direct-compose',
        recipient: CONTACT_INFO.email,
        message: `Ready to send directly to ${CONTACT_INFO.email}. Use "Open in Gmail" below to complete delivery from your inbox.`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setInquiryType('Full-Time Data Scientist');
    setMessage('');
    setErrorMsg(null);
    setDeliveryResult(null);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="border-b border-white/[0.08] pb-8">
        <p className="font-mono text-xs text-amber-300">Contact &amp; Collaboration</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start a Conversation
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          Inquiries submitted here route directly to{' '}
          <span className="font-mono text-amber-300">{CONTACT_INFO.email}</span>. Available for Machine Learning Engineering roles, Data Science positions, and BI consulting.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        {/* Form Column */}
        <div className="lg:col-span-7">
          {deliveryResult ? (
            <div className="rounded-2xl border border-amber-400/35 bg-[#0B0F17]/90 backdrop-blur-md p-7">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    Inquiry Dispatched to Gmail
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {deliveryResult.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-white/[0.08] pt-4 text-xs text-slate-300">
                <p>
                  <span className="font-semibold text-white">Recipient:</span>{' '}
                  <span className="font-mono text-amber-300">{deliveryResult.recipient}</span>
                </p>
                <p>
                  <span className="font-semibold text-white">Sender:</span> {name} ({email})
                </p>
                <p>
                  <span className="font-semibold text-white">Inquiry Type:</span> {inquiryType}
                </p>
                <p>
                  <span className="font-semibold text-white">Message:</span> {message}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={buildGmailComposeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white hover:from-amber-400 hover:to-orange-500"
                >
                  Open in Gmail
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={buildMailtoUrl()}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-100 hover:border-amber-400/50 hover:text-white"
                >
                  Open Mail App
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-[40px] items-center rounded-lg border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-6 sm:p-8"
            >
              {errorMsg && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/35 bg-rose-500/10 p-3.5 text-xs text-rose-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-200">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#070A10]/90 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-200">
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#070A10]/90 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-inquiry" className="block text-xs font-semibold text-slate-200">
                  Inquiry Type
                </label>
                <select
                  id="contact-inquiry"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                  className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#070A10]/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-200">
                  Project Scope or Role Details
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details on your ML evaluation needs, predictive modeling goals, or BI dashboard timeline..."
                  className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#070A10]/90 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 disabled:opacity-60"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending to Gmail...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Collaboration Inquiry
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                    `[Portfolio Inquiry] ${inquiryType}`
                  )}`}
                  className="text-xs font-medium text-amber-300 hover:text-orange-300 transition-colors"
                >
                  Or email directly →
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Direct Contact & Canonical Routes Column */}
        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-6">
            <h2 className="font-display text-lg font-semibold text-white">
              Direct Contact Details
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
              Reach out directly by phone or Gmail for immediate inquiries.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#080B12]/90 px-4 py-3">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-100 transition-colors hover:text-amber-300"
                >
                  <Phone className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  <span className="font-mono tabular-nums truncate">{CONTACT_INFO.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', CONTACT_INFO.phone)}
                  aria-label="Copy phone number"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.04] text-slate-300 transition-colors hover:text-white"
                >
                  {copiedField === 'phone' ? (
                    <Check className="h-3.5 w-3.5 text-amber-300" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#080B12]/90 px-4 py-3">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-100 transition-colors hover:text-amber-300"
                >
                  <Mail className="h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
                  <span className="truncate">{CONTACT_INFO.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('email', CONTACT_INFO.email)}
                  aria-label="Copy email address"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.04] text-slate-300 transition-colors hover:text-white"
                >
                  {copiedField === 'email' ? (
                    <Check className="h-3.5 w-3.5 text-amber-300" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-6">
            <h2 className="font-display text-lg font-semibold text-white">
              Direct Channels &amp; Repositories
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Inspect production codebases, live Tableau Public workbooks, or visit the original Google Sites endpoints directly.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={CANONICAL_URLS.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#080B12]/90 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-amber-400/50 hover:text-white"
              >
                <span>GitHub — efapowertech042-ai</span>
                <ExternalLink className="h-4 w-4 text-amber-300" aria-hidden="true" />
              </a>

              <a
                href={CANONICAL_URLS.tableauSalary}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#080B12]/90 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-amber-400/50 hover:text-white"
              >
                <span>Tableau Public — AI &amp; Data Salary Viz</span>
                <ExternalLink className="h-4 w-4 text-amber-300" aria-hidden="true" />
              </a>

              <a
                href={CANONICAL_URLS.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#080B12]/90 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-amber-400/50 hover:text-white"
              >
                <span>Original Contact Page (Google Sites)</span>
                <ExternalLink className="h-4 w-4 text-amber-300" aria-hidden="true" />
              </a>

              <a
                href={CANONICAL_URLS.root}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#080B12]/90 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-amber-400/50 hover:text-white"
              >
                <span>Google Sites Root Portal</span>
                <ExternalLink className="h-4 w-4 text-amber-300" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
