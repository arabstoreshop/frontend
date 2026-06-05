import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").trim(),
  phone: z
    .string()
    .regex(/^05\d{8}$/, "يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
