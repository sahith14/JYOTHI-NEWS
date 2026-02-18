import { z } from 'zod';

export const timelineEventSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  source: z.string().optional(),
});

export const governmentResponseSchema = z.object({
  announcements: z.array(z.string()).optional(),
  compensation: z.string().optional(),
  officialStatements: z.array(z.string()).optional(),
  filedFIR: z.boolean().optional(),
  arrests: z.number().int().optional(),
  chargesheetFiled: z.boolean().optional(),
});

export const caseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  category: z.enum([
    'Farmers',
    'Political Accountability',
    'Violent Crime',
    'Accidents',
    'Drunk Driving',
    'Corruption',
    'Social Justice',
    'Governance Failure'
  ]),
  location: z.string().min(1, 'Location is required'),
  dateOfIncident: z.string().min(1, 'Date of incident is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  detailedSummary: z.string().min(20, 'Detailed summary must be at least 20 characters'),
  status: z.enum([
    'pending',
    'investigation',
    'court-proceedings',
    'closed',
    'compensation-paid',
    'unresolved'
  ]),
  legalStatus: z.string().min(1, 'Legal status is required'),
  compensationAnnounced: z.string().optional(),
  isClosed: z.boolean().default(false),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  internalNotes: z.string().optional(),
  sources: z.array(z.string().url()).optional(),
  timeline: z.array(timelineEventSchema).optional(),
  governmentResponses: z.array(governmentResponseSchema).optional(),
});
