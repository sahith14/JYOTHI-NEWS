'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseSchema } from '@/lib/validations/case';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';

type CaseFormData = z.infer<typeof caseSchema>;

interface CaseFormProps {
  initialData?: CaseFormData;
  onSubmit: (data: CaseFormData) => Promise<void>;
}

const categories = [
  'Farmers',
  'Political Accountability',
  'Violent Crime',
  'Accidents',
  'Drunk Driving',
  'Corruption',
  'Social Justice',
  'Governance Failure'
] as const;

const statuses = [
  'pending',
  'investigation',
  'court-proceedings',
  'closed',
  'compensation-paid',
  'unresolved'
] as const;

export function CaseForm({ initialData, onSubmit }: CaseFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      category: 'Violent Crime',
      location: '',
      dateOfIncident: '',
      summary: '',
      detailedSummary: '',
      status: 'pending',
      legalStatus: '',
      compensationAnnounced: '',
      isClosed: false,
      images: [],
      tags: [],
      internalNotes: '',
      sources: [],
      timeline: [],
      governmentResponses: [],
    },
  });

  // Timeline field array
  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
    control,
    name: 'timeline',
  });

  // Gov response field array
  const { fields: govFields, append: appendGov, remove: removeGov } = useFieldArray({
    control,
    name: 'governmentResponses',
  });

  const submitHandler = async (data: CaseFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
      {/* Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL-friendly)</Label>
              <Input id="slug" {...register('slug')} />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue('category', value as any)} defaultValue={initialData?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (District / City)</Label>
              <Input id="location" {...register('location')} />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfIncident">Date of Incident</Label>
              <Input id="dateOfIncident" type="date" {...register('dateOfIncident')} />
              {errors.dateOfIncident && <p className="text-sm text-red-500">{errors.dateOfIncident.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Current Status</Label>
              <Select onValueChange={(value) => setValue('status', value as any)} defaultValue={initialData?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => (
                    <SelectItem key={s} value={s}>{s.replace('-', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary (brief)</Label>
            <Textarea id="summary" rows={3} {...register('summary')} />
            {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailedSummary">Detailed Summary (HTML allowed)</Label>
            <Textarea id="detailedSummary" rows={6} {...register('detailedSummary')} />
            {errors.detailedSummary && <p className="text-sm text-red-500">{errors.detailedSummary.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalStatus">Legal Status</Label>
            <Textarea id="legalStatus" rows={2} {...register('legalStatus')} />
            {errors.legalStatus && <p className="text-sm text-red-500">{errors.legalStatus.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compensationAnnounced">Compensation Announced (if any)</Label>
              <Input id="compensationAnnounced" {...register('compensationAnnounced')} />
            </div>
            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="isClosed"
                checked={watch('isClosed')}
                onCheckedChange={(checked) => setValue('isClosed', checked as boolean)}
              />
              <Label htmlFor="isClosed">Case Closed</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Timeline</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => appendTimeline({ date: '', title: '', description: '' })}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Event
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {timelineFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeTimeline(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" {...register(`timeline.${index}.date`)} />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...register(`timeline.${index}.title`)} />
                </div>
              </div>
              <div className="space-y-2 mt-2">
                <Label>Description</Label>
                <Textarea rows={2} {...register(`timeline.${index}.description`)} />
              </div>
              <div className="space-y-2 mt-2">
                <Label>Source URL (optional)</Label>
                <Input {...register(`timeline.${index}.source`)} />
              </div>
            </div>
          ))}
          {timelineFields.length === 0 && (
            <p className="text-sm text-gray-500">No timeline events added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Government Response Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Government Response</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => appendGov({})}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Response
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {govFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeGov(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label>Announcements (comma-separated)</Label>
                <Input
                  {...register(`governmentResponses.${index}.announcements`)}
                  placeholder="Enter announcements, separated by commas"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label>Compensation</Label>
                  <Input {...register(`governmentResponses.${index}.compensation`)} />
                </div>
                <div className="space-y-2">
                  <Label>Arrests (number)</Label>
                  <Input type="number" {...register(`governmentResponses.${index}.arrests`)} />
                </div>
              </div>
              <div className="space-y-2 mt-2">
                <Label>Official Statements (comma-separated)</Label>
                <Input
                  {...register(`governmentResponses.${index}.officialStatements`)}
                  placeholder="Enter statements, separated by commas"
                />
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`filedFIR-${index}`}
                    checked={watch(`governmentResponses.${index}.filedFIR`)}
                    onCheckedChange={(checked) => setValue(`governmentResponses.${index}.filedFIR`, checked as boolean)}
                  />
                  <Label htmlFor={`filedFIR-${index}`}>FIR Filed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`chargesheetFiled-${index}`}
                    checked={watch(`governmentResponses.${index}.chargesheetFiled`)}
                    onCheckedChange={(checked) => setValue(`governmentResponses.${index}.chargesheetFiled`, checked as boolean)}
                  />
                  <Label htmlFor={`chargesheetFiled-${index}`}>Chargesheet Filed</Label>
                </div>
              </div>
            </div>
          ))}
          {govFields.length === 0 && (
            <p className="text-sm text-gray-500">No government responses added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Additional Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information (Admin only)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internalNotes">Internal Notes</Label>
            <Textarea rows={3} {...register('internalNotes')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sources">Source URLs (comma-separated)</Label>
            <Input {...register('sources')} placeholder="Enter URLs, separated by commas" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Image URLs (comma-separated)</Label>
            <Input {...register('images')} placeholder="Enter image URLs, separated by commas" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input {...register('tags')} placeholder="Enter tags, separated by commas" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Case'}
        </Button>
      </div>
    </form>
  );
}
