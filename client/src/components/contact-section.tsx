import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Please enter a message with at least 10 characters")
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours."
      });
      reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: error.message || "Please try again later."
      });
    }
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "pkoduri@gmail.com",
      href: "mailto:pkoduri@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone", 
      value: "(812) 606-0365",
      href: "tel:+18126060365"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bloomington, IN",
      href: null
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: Github, href: "#", color: "bg-gray-800 hover:bg-gray-900" },
    { icon: Twitter, href: "#", color: "bg-blue-400 hover:bg-blue-500" }
  ];

  const quickFacts = [
    { label: "Response Time:", value: "Within 24 hours" },
    { label: "Availability:", value: "Immediate" },
    { label: "Preferred Contact:", value: "Email" }
  ];

  return (
    <section className="py-20 theme-transition" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="contact-title">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="contact-subtitle">
            Ready to discuss how strategic marketing expertise can drive your medical device innovation forward?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="contact-form-title">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      {...register("firstName")}
                      placeholder="John"
                      data-testid="input-first-name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Doe"
                      data-testid="input-last-name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@company.com"
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company"
                    {...register("company")}
                    placeholder="Medical Device Company"
                    data-testid="input-company"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    {...register("message")}
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    data-testid="input-message"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-medium"
                  disabled={contactMutation.isPending}
                  data-testid="submit-contact-form"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="contact-info-title">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <div className="flex items-center" data-testid={`contact-info-${index}`}>
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="text-accent-foreground" size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{info.label}</div>
                        <div className="text-muted-foreground">{info.value}</div>
                      </div>
                    </div>
                  );
                  
                  return info.href ? (
                    <a key={index} href={info.href} className="block hover:opacity-80 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="social-links-title">
                Connect on Social
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 text-white rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                      data-testid={`social-link-${index}`}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="quick-facts-title">
                  Quick Facts
                </h4>
                <div className="space-y-3 text-sm">
                  {quickFacts.map((fact, index) => (
                    <div key={index} className="flex justify-between" data-testid={`quick-fact-${index}`}>
                      <span className="text-muted-foreground">{fact.label}</span>
                      <span className="font-medium text-foreground">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
