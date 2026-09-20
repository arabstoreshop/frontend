import { z } from "zod";

const phoneDigits = (value: string) => value.replace(/\D/g, "");

function saudiMobile(value: string) {
  let digits = phoneDigits(value);
  if (digits.startsWith("966")) digits = `0${digits.slice(3)}`;
  return /^05\d{8}$/.test(digits);
}

function moroccoMobile(value: string) {
  let digits = phoneDigits(value);
  if (digits.startsWith("212")) digits = `0${digits.slice(3)}`;
  return /^0[67]\d{8}$/.test(digits);
}

const checkoutFields = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").trim(),
  phone: z.string().trim().min(6, "أدخل رقم هاتف صحيح"),
  city: z.string().trim().min(2, "أدخل المدينة"),
  address: z.string().trim().min(4, "أدخل العنوان بالتفصيل"),
  notes: z.string().trim().optional(),
});

export function checkoutSchema(currency: "SAR" | "MAD") {
  return checkoutFields.superRefine((data, ctx) => {
    const ok = currency === "MAD" ? moroccoMobile(data.phone) : saudiMobile(data.phone);
    if (!ok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message:
          currency === "MAD"
            ? "أدخل رقم مغربي صحيح يبدأ بـ 06 أو 07"
            : "أدخل رقم سعودي صحيح يبدأ بـ 05",
      });
    }
  });
}

export type CheckoutFormData = z.infer<typeof checkoutFields>;
