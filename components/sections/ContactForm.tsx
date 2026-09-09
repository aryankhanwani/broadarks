"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { ENQUIRY_TYPES, ORG } from "@/lib/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/ui/motion";

type Status = "idle" | "sending" | "sent" | "error";

const INITIAL = {
  name: "",
  organisation: "",
  designation: "",
  email: "",
  phone: "",
  enquiryType: ENQUIRY_TYPES[0] as string,
  message: "",
  consent: false,
  website: "", // honeypot
};

const FIELD_CLASS =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-gray-500 " +
  "transition-colors duration-[--duration-fast] focus:border-primary-400 focus:outline-none " +
  "focus:ring-4 focus:ring-primary-100";

const LABEL_CLASS = "block text-[13px] font-semibold text-ink";

/**
 * ContactForm — routed enquiry capture.
 *
 * Posts to /api/contact. If the deployment has no delivery webhook
 * configured yet, the API answers 501 and we fall back to opening
 * the visitor's mail client with the same message, already routed
 * by subject line — so an enquiry is never lost between the form
 * and the inbox.
 */
export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const set = <K extends keyof typeof INITIAL>(key: K, value: (typeof INITIAL)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const mailtoFallback = () => {
    const subject = `${values.enquiryType} Enquiry — ${values.organisation || values.name}`;
    const lines = [
      `Name: ${values.name}`,
      `Organisation: ${values.organisation}`,
      values.designation && `Designation: ${values.designation}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      `Enquiry type: ${values.enquiryType}`,
      "",
      values.message,
    ].filter(Boolean);

    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setNotice(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("sent");
        setValues(INITIAL);
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      // Delivery not wired up (501) or upstream failed (502) — hand the
      // fully-composed enquiry to the visitor's mail client instead.
      setStatus("error");
      setNotice(
        data.message ??
          "We could not submit that automatically, so we have opened your email client with the details filled in.",
      );
      mailtoFallback();
    } catch {
      setStatus("error");
      setNotice("Network error. Opening your email client with the details filled in.");
      mailtoFallback();
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        role="status"
        className="rounded-card border border-line bg-surface p-8 text-center sm:p-12"
      >
        <CheckCircle2 size={32} className="mx-auto text-secondary-500" aria-hidden />
        <h3 className="t-h3 mt-5 text-ink">Enquiry received</h3>
        <p className="t-body mx-auto mt-3 max-w-md text-[15px]">
          Thank you. We respond to every enquiry within two working days. If it is urgent, call{" "}
          <a href={ORG.phoneHref} className="font-medium text-primary-600">
            {ORG.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-primary-600 underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — visually and programmatically hidden from people. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(FIELD_CLASS, errors.name && "border-red-500")}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your full name"
          />
        </Field>

        <Field id="organisation" label="Organisation" required error={errors.organisation}>
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={errors.organisation ? "organisation-error" : undefined}
            className={cn(FIELD_CLASS, errors.organisation && "border-red-500")}
            value={values.organisation}
            onChange={(e) => set("organisation", e.target.value)}
            placeholder="Company, trust or institution"
          />
        </Field>

        <Field id="designation" label="Designation" error={errors.designation}>
          <input
            id="designation"
            name="designation"
            autoComplete="organization-title"
            className={FIELD_CLASS}
            value={values.designation}
            onChange={(e) => set("designation", e.target.value)}
            placeholder="Your role"
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(FIELD_CLASS, errors.email && "border-red-500")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@organisation.com"
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={FIELD_CLASS}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91"
          />
        </Field>

        <Field id="enquiryType" label="Enquiry type" required error={errors.enquiryType}>
          <select
            id="enquiryType"
            name="enquiryType"
            className={cn(FIELD_CLASS, "appearance-none bg-white pr-10")}
            value={values.enquiryType}
            onChange={(e) => set("enquiryType", e.target.value)}
          >
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(FIELD_CLASS, "resize-y", errors.message && "border-red-500")}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="What outcome are you working towards, and by when?"
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-primary-500 focus:ring-primary-300"
          />
          <span>
            Your information will be used only to respond to this enquiry and will not be shared
            with third parties. See our{" "}
            <a href="/privacy-and-policies" className="text-primary-600 underline underline-offset-2">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent && <FieldError>{errors.consent}</FieldError>}
      </div>

      <AnimatePresence>
        {notice && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="flex items-start gap-2.5 overflow-hidden rounded-lg bg-secondary-50 p-4 text-[13px] leading-relaxed text-secondary-900"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              {notice} If nothing opened, email{" "}
              <a href={`mailto:${ORG.email}`} className="font-semibold underline underline-offset-2">
                {ORG.email}
              </a>
              .
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center justify-center gap-2 rounded-pill bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-[background-color,box-shadow] duration-[--duration-base] hover:bg-primary-600 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

/* ---------------------------------------------------------------- */

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {/* The asterisk is decorative; "(required)" is what gets read out,
            because a lone "*" is announced as "star" or skipped. */}
        {required && (
          <>
            <span className="ml-1 text-secondary-700" aria-hidden>
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[13px] text-red-700" role="alert">
      {children}
    </p>
  );
}
