"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { portfolioContent } from "@/data/content";
import { Container } from "@/components/ui/container";
import { MapPin, Send, CheckCircle2, Copy, Check, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/social-icons";

export function Contact() {
  const { contact, socialLinks } = portfolioContent;
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const subjectValue = watch("subject");
  const messageValue = watch("message");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      // 1. Submit to API endpoint to store in Database
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // 2. Also forward to Netlify Forms as backup
      try {
        const formData = new URLSearchParams();
        formData.append("form-name", "contact");
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("subject", data.subject);
        formData.append("message", data.message);

        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });
      } catch {
        // Silently continue if Netlify form is not active in local environment
      }

      if (!apiRes.ok) {
        const errJson = await apiRes.json().catch(() => ({}));
        throw new Error(errJson.error || "Unable to transmit message. Please use direct email.");
      }

      setSubmitStatus("success");
      reset();
    } catch (err: unknown) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please email directly."
      );
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-4 w-4" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "instagram":
        return <InstagramIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-[#070C1A] text-white overflow-hidden border-t border-[#5CE1FF]/15"
    >
      {/* 48px Blueprint Grid in Hero/Contact Background */}
      <div className="blueprint-grid absolute inset-0 opacity-15 pointer-events-none" />

      {/* Crosshairs */}
      <div className="absolute top-4 left-4 text-[#5CE1FF] font-mono text-xs select-none opacity-60">+</div>
      <div className="absolute top-4 right-4 text-[#5CE1FF] font-mono text-xs select-none opacity-60">+</div>
      <div className="absolute bottom-4 left-4 text-[#5CE1FF] font-mono text-xs select-none opacity-60">+</div>
      <div className="absolute bottom-4 right-4 text-[#5CE1FF] font-mono text-xs select-none opacity-60">+</div>

      <Container className="relative z-10">
        {/* Section Mono Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#5CE1FF] mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-volt-lime rounded-full" />
          <span>{contact.sectionTag}</span>
        </div>

        {/* Giant Heading & Subheading */}
        <div className="mb-14 max-w-3xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white mb-4">
            {contact.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#8B949E] leading-relaxed">
            {contact.subheading}
          </p>
        </div>

        {/* 2-Column Grid: Left Details & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (5 cols): Email, Copy, Location, Socials */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {/* Huge Email Link with Copy Button */}
            <div className="blueprint-card p-6 sm:p-7 rounded-2xl bg-[#0F1217] border-2 border-cobalt/40 shadow-md">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#5CE1FF] mb-2">
                {"// DIRECT INBOX"}
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="font-display font-extrabold text-2xl sm:text-3xl text-white hover:text-volt-lime transition-colors block break-all mb-4"
              >
                {contact.email}
              </a>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#070C1A] hover:bg-white/5 border border-[#5CE1FF]/30 hover:border-volt-lime font-mono text-xs text-white hover:text-volt-lime transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-volt-lime" /> : <Copy className="w-3.5 h-3.5 text-[#5CE1FF]" />}
                  <span>{copied ? "Copied to clipboard" : "Copy Email"}</span>
                </button>
              </div>

              {/* Toast Feedback */}
              {copied && (
                <div className="mt-3 p-2.5 rounded-lg bg-volt-lime/10 border border-volt-lime font-mono text-xs text-volt-lime animate-in fade-in slide-in-from-top-1">
                  {contact.copiedToast}
                </div>
              )}
            </div>

            {/* Location Chip */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0F1217] border border-[#5CE1FF]/20 font-mono text-xs text-[#8B949E]">
              <div className="p-2 rounded-lg bg-cobalt/20 text-[#5CE1FF]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#5CE1FF] uppercase block">BASE LOCATION</span>
                <span className="text-white font-semibold text-sm">{contact.location}</span>
              </div>
            </div>

            {/* Social Buttons Dock */}
            <div>
              <div className="font-mono text-xs text-[#5CE1FF] uppercase tracking-wider mb-3">
                {"// SOCIAL NETWORKS"}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks
                  .filter((s) => s.platform !== "Email")
                  .map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F1217] border border-[#5CE1FF]/25 hover:border-volt-lime font-mono text-xs text-white hover:text-volt-lime transition-all"
                    >
                      {getSocialIcon(social.platform)}
                      <span>{social.platform}</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Netlify Contact Form */}
          <div className="lg:col-span-7">
            <div className="blueprint-card p-6 sm:p-8 rounded-2xl bg-[#0F1217] border-2 border-cobalt/40 shadow-cobalt">
              {submitStatus === "success" ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-volt-lime/20 border-2 border-volt-lime text-volt-lime mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {contact.formLabels.successTitle}
                  </h3>
                  <p className="text-sm font-mono text-[#8B949E] max-w-md mx-auto leading-relaxed">
                    {contact.formLabels.successMessage}
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-4 px-5 py-2 rounded-xl bg-cobalt text-white font-mono text-xs font-semibold hover:bg-cobalt-hover transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Hidden Netlify Bot Field */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-xs text-[#5CE1FF] mb-1.5 uppercase tracking-wider">
                        {contact.formLabels.name} *
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070C1A] border border-[#5CE1FF]/25 text-white placeholder-[#8B949E]/50 font-mono text-xs sm:text-sm focus:border-volt-lime focus:outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="mt-1 font-mono text-[11px] text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-xs text-[#5CE1FF] mb-1.5 uppercase tracking-wider">
                        {contact.formLabels.email} *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="ada@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070C1A] border border-[#5CE1FF]/25 text-white placeholder-[#8B949E]/50 font-mono text-xs sm:text-sm focus:border-volt-lime focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="mt-1 font-mono text-[11px] text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-mono text-xs text-[#5CE1FF] mb-1.5 uppercase tracking-wider">
                      {contact.formLabels.subject} *
                    </label>
                    <input
                      type="text"
                      {...register("subject")}
                      placeholder="Internship opportunity / Video collab"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070C1A] border border-[#5CE1FF]/25 text-white placeholder-[#8B949E]/50 font-mono text-xs sm:text-sm focus:border-volt-lime focus:outline-none transition-colors"
                    />
                    {errors.subject && (
                      <p className="mt-1 font-mono text-[11px] text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-xs text-[#5CE1FF] mb-1.5 uppercase tracking-wider">
                      {contact.formLabels.message} *
                    </label>
                    <textarea
                      rows={4}
                      {...register("message")}
                      placeholder="Hi Abhishek, I saw your portfolio and would like to chat about..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070C1A] border border-[#5CE1FF]/25 text-white placeholder-[#8B949E]/50 font-mono text-xs sm:text-sm focus:border-volt-lime focus:outline-none transition-colors resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-[11px] text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-500 font-mono text-xs text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button & Fallback */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cobalt hover:bg-cobalt-hover text-white font-mono text-xs sm:text-sm font-bold shadow-cobalt hover:shadow-cobalt-lg transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {submitStatus === "loading"
                          ? contact.formLabels.sendingButton
                          : contact.formLabels.submitButton}
                      </span>
                    </button>

                    {/* Mailto Fallback */}
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        subjectValue || "Portfolio Inquiry"
                      )}&body=${encodeURIComponent(messageValue || "")}`}
                      className="font-mono text-xs text-[#8B949E] hover:text-volt-lime transition-colors inline-flex items-center gap-1"
                    >
                      <span>{contact.mailtoFallbackText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
