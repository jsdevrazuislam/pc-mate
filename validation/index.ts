import * as z from "zod";

export const formSchema = z.object({
  budget: z.number().min(1, "Budget is required!"),
  currency: z.enum(["BDT", "USD", "EUR", "GBP"]),
  location: z.string().min(2, "Location is required"),
  usage: z.array(z.string()).min(1, "Select at least one use case"),
  buildType: z.enum(["pc", "laptop", "both"]),
  notes: z.string().max(200).optional(),
});
