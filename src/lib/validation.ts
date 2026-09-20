import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").trim(),
  phone: z
    .string()
    .trim()
    .min(6, "أدخل رقم هاتف صحيح")
    .max(20, "رقم الهاتف طويل بزاف")
    .refine((v) => v.replace(/\D/g, "").length >= 6, "أدخل رقم هاتف صحيح"),
  city: z.string().trim().optional(),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
