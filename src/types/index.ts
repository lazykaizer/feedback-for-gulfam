/** Form state types */
export interface FeedbackFormData {
  projectId: string;
  rating: number;
  reviewText: string;
  name: string;
  imageFile: File | null;
  country: string;
  consentPublic: boolean;
}

export interface FormErrors {
  projectId?: string;
  rating?: string;
  reviewText?: string;
  country?: string;
  consentPublic?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
