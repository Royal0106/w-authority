import { z } from 'zod'

/** All form schemas live here so validation rules are reviewable in one place. */

export const newsletterSchema = z.object({
  email: z.email('Enter a valid email address'),
})
export type NewsletterValues = z.infer<typeof newsletterSchema>

export const contactSchema = z.object({
  name: z.string().min(2, 'Please tell us your name'),
  email: z.email('Enter a valid email address'),
  subject: z.string().min(3, 'Add a short subject'),
  message: z.string().min(20, 'A little more detail helps us reply properly'),
})
export type ContactValues = z.infer<typeof contactSchema>

export const speakingEnquirySchema = z.object({
  name: z.string().min(2, 'Please tell us your name'),
  email: z.email('Enter a valid email address'),
  organization: z.string().min(2, 'Which organization is this for?'),
  eventType: z.string().min(1, 'Pick an event type'),
  eventDate: z.string().min(1, 'Add an approximate date'),
  message: z.string().min(10, 'Tell us a little about the audience'),
})
export type SpeakingEnquiryValues = z.infer<typeof speakingEnquirySchema>

export const bookingSchema = z.object({
  name: z.string().min(2, 'Please tell us your name'),
  email: z.email('Enter a valid email address'),
  sessionType: z.string().min(1, 'Choose a session type'),
  date: z.string().min(1, 'Choose a date'),
  time: z.string().min(1, 'Choose a time'),
  goals: z.string().min(20, 'What would you like to get out of the session?'),
})
export type BookingValues = z.infer<typeof bookingSchema>

export const commentSchema = z.object({
  comment: z.string().min(3, 'Write a little more before posting'),
})
export type CommentValues = z.infer<typeof commentSchema>
