import { z } from "zod";

export const feedbackSchema = z.object({
  overallRating: z.number().min(1, "Please provide an overall rating"),
  speakerRating: z.number().min(1, "Please rate the speaker"),
  organizationRating: z.number().min(1, "Please rate the organization"),
  contentRating: z.number().min(1, "Please rate the content"),
  comment: z.string().max(500, "Comment must be less than 500 characters").optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;