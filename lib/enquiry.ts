import { z } from "zod";
import { serviceOptions } from "@/data/portfolio";
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (v) => !v || /^[+()\d\s.-]{7,30}$/.test(v),
      "Please enter a valid phone number.",
    ),
  service: z
    .string()
    .refine((v) => serviceOptions.includes(v), "Please select a service."),
  message: z
    .string()
    .trim()
    .min(20, "Please tell me a little more (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
  website: z.string().max(0).optional(),
});
export type Enquiry = z.infer<typeof enquirySchema>;
