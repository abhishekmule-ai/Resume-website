"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Contact() {
  const { personal, socialLinks } = portfolioData;
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit message.");
      }

      setSubmitStatus("success");
      setStatusMessage("Thank you! Your message has been sent successfully.");
      reset();
    } catch (err: unknown) {
      setSubmitStatus("error");
      setStatusMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try emailing directly."
      );
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <Container>
        <SectionHeading
          badge="Get in Touch"
          title="Let's Discuss Your Next Project"
          gradientWord="Discuss"
          description="Have an opportunity, consulting inquiry, or technical challenge? Feel free to reach out directly or send a message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Info Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-surface-elevated/50 border-surface-border p-6">
              <CardTitle className="text-xl font-bold mb-4">Contact Information</CardTitle>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 mt-0.5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-muted-foreground font-semibold">Direct Email</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="block text-foreground font-medium hover:text-blue-400 transition-colors"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {personal.phone && (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 mt-0.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase text-muted-foreground font-semibold">Phone</span>
                      <a
                        href={`tel:${personal.phone}`}
                        className="block text-foreground font-medium hover:text-purple-400 transition-colors"
                      >
                        {personal.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-muted-foreground font-semibold">Location</span>
                    <span className="block text-foreground font-medium">{personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels list */}
              <div className="mt-8 pt-6 border-t border-surface-border">
                <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider block mb-3">
                  Social Channels
                </span>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-surface-elevated text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-surface-border transition-colors"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card className="bg-surface-card border-surface-border p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Your Name"
                    placeholder="Jane Doe"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Your Email"
                    placeholder="jane@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <Input
                  id="subject"
                  label="Subject"
                  placeholder="Software Architecture Consulting / Project Inquiry"
                  error={errors.subject?.message}
                  {...register("subject")}
                />

                <Textarea
                  id="message"
                  label="Your Message"
                  rows={5}
                  placeholder="Tell me about your project, timeline, and goals..."
                  error={errors.message?.message}
                  {...register("message")}
                />

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <MagneticButton strength={0.2} className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={submitStatus === "loading"}
                    className="w-full sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </MagneticButton>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
