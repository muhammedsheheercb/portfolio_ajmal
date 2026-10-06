"use client";
import { useRef, useState, useEffect, type FormEvent } from "react";
import { enquirySchema, type Enquiry } from "@/lib/enquiry";
import { profile, serviceOptions } from "@/data/portfolio";
type Errors = Partial<Record<keyof Enquiry, string[]>>;
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service && serviceOptions.includes(service)) {
      const select =
        form.current?.querySelector<HTMLSelectElement>("[name=service]");
      if (select) select.value = service;
    }
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const result = enquirySchema.safeParse(values);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      setErrors(fields);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      const first = Object.keys(fields)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.fields || {});
        throw new Error(
          data.error || "Unable to send your enquiry. Please try again.",
        );
      }
      setStatus("success");
      setMessage("Thank you. Your enquiry has been sent to Ajmal.");
      form.current?.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The request timed out. Please try again or use email.",
      );
    }
  }
  const field = (
    name: "name" | "email" | "phone",
    label: string,
    type: string,
    placeholder: string,
    required = false,
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {!required && <span> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={
          name === "name" ? "name" : name === "email" ? "email" : "tel"
        }
        maxLength={name === "name" ? 100 : name === "email" ? 254 : 30}
        required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]?.[0]}
        </p>
      )}
    </div>
  );
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className="enquiry-form"
      aria-busy={status === "sending"}
    >
      <div className="form-heading">
        <span className="eyebrow">TELL ME WHAT YOU HAVE IN MIND</span>
        <p>A moment, a story, a new idea.</p>
      </div>
      <div className="form-row">
        {field("name", "Your name", "text", "Full name", true)}
        {field("email", "Email address", "email", "you@example.com", true)}
      </div>
      <div className="form-row">
        {field("phone", "Phone number", "tel", "Country code + number")}
        <div className="field">
          <label htmlFor="service">Service</label>
          <select
            name="service"
            id="service"
            defaultValue=""
            required
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {errors.service && (
            <p className="field-error" id="service-error">
              {errors.service[0]}
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Your project</label>
        <textarea
          name="message"
          id="message"
          rows={4}
          placeholder="A little about your project, location and timeline…"
          minLength={20}
          maxLength={5000}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message[0]}
          </p>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input name="website" id="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="form-privacy">
        Your details are used only to respond to your enquiry.
      </p>
      <button className="solid-button" disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SEND ENQUIRY"}
      </button>
      {message && (
        <p
          className={`form-status ${status}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
      {status === "error" && (
        <a className="text-link" href={`mailto:${profile.email}`}>
          Email Ajmal directly
        </a>
      )}
    </form>
  );
}
