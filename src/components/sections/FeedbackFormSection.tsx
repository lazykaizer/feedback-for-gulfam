'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '@/components/ui/SectionWrapper';
import { StarRating } from '@/components/ui/StarRating';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { SuccessAnimation } from '@/components/ui/SuccessAnimation';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { projects, countries } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { FeedbackFormData, FormErrors, FormStatus } from '@/types';
import { Send, ChevronDown, Lock, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const initialFormData: FeedbackFormData = {
  projectId: '',
  rating: 0,
  reviewText: '',
  name: '',
  imageFile: null,
  country: '',
  consentPublic: false,
};

export function FeedbackFormSection() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [charCount, setCharCount] = useState(0);

  const updateField = useCallback(
    <K extends keyof FeedbackFormData>(key: K, value: FeedbackFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      // Clear error when user types
      if (errors[key as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    },
    [errors]
  );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.projectId) newErrors.projectId = 'Please select a project';
    if (formData.rating === 0) newErrors.rating = 'Please provide a rating';
    if (!formData.reviewText.trim()) newErrors.reviewText = 'Please write a review';
    if (!formData.country) newErrors.country = 'Please select your country';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');

    try {
      // Prepare multipart form data for image upload
      const payload = new FormData();
      payload.append('projectId', formData.projectId);
      payload.append('rating', String(formData.rating));
      payload.append('reviewText', formData.reviewText);
      payload.append('name', formData.name);
      payload.append('country', formData.country);
      payload.append('consentPublic', String(formData.consentPublic));
      if (formData.imageFile) {
        payload.append('image', formData.imageFile);
      }

      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      toast.error(err.message || 'Something went wrong. Please try again.');
      // Allow resubmission
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCharCount(0);
    setErrors({});
    setStatus('idle');
  };

  return (
    <SectionWrapper id="feedback" className="relative">
      {/* Background emphasis */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <SectionHeading
        badge="Share Your Experience"
        title="Your Review Makes a Difference"
        subtitle={status === 'success' ? undefined : "Honest feedback helps build better products. It only takes 30 seconds — no account needed."}
      />

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <SuccessAnimation
              key="success"
              visible={true}
              onReset={resetForm}
            />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="glass-card p-6 sm:p-8 lg:p-10 space-y-7"
            >
              {/* ── Project Selector ── */}
              <motion.div variants={fadeUp}>
                <label className="form-label">
                  Select Project <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.projectId}
                    onChange={(e) => updateField('projectId', e.target.value)}
                    className={cn(
                      'form-input appearance-none pr-10 cursor-pointer',
                      errors.projectId && 'border-red-500/50 focus:border-red-500/50'
                    )}
                  >
                    <option value="">Choose a project...</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
                {errors.projectId && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.projectId}</p>
                )}
              </motion.div>

              {/* ── Star Rating ── */}
              <motion.div variants={fadeUp}>
                <label className="form-label">
                  Your Rating <span className="text-emerald-400">*</span>
                </label>
                <StarRating
                  value={formData.rating}
                  onChange={(r) => updateField('rating', r)}
                  disabled={status === 'submitting'}
                />
                {errors.rating && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.rating}</p>
                )}
              </motion.div>

              {/* ── Review Text ── */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center justify-between mb-2">
                  <label className="form-label !mb-0">
                    Your Review <span className="text-emerald-400">*</span>
                  </label>
                  <span
                    className={cn(
                      'text-xs tabular-nums transition-colors',
                      charCount > 280
                        ? 'text-amber-400'
                        : charCount > 300
                          ? 'text-red-400'
                          : 'text-slate-500'
                    )}
                  >
                    {charCount}/300
                  </span>
                </div>
                <textarea
                  value={formData.reviewText}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 300);
                    updateField('reviewText', value);
                    setCharCount(value.length);
                  }}
                  rows={4}
                  placeholder="Share your honest experience working with me..."
                  className={cn(
                    'form-input resize-none',
                    errors.reviewText && 'border-red-500/50'
                  )}
                  disabled={status === 'submitting'}
                />
                {errors.reviewText && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.reviewText}</p>
                )}
              </motion.div>

              {/* ── Name + Image (optional row) ── */}
              <motion.div variants={fadeUp} className="flex items-start gap-5">
                <div className="flex-1">
                  <label className="form-label">
                    Your Name <span className="text-slate-500 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Anonymous"
                    className="form-input"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div>
                  <label className="form-label">
                    Photo <span className="text-slate-500 text-xs">(optional)</span>
                  </label>
                  <ImageUpload
                    onFileSelect={(f) => updateField('imageFile', f)}
                    disabled={status === 'submitting'}
                  />
                </div>
              </motion.div>

              {/* ── Country Selector ── */}
              <motion.div variants={fadeUp}>
                <label className="form-label">
                  Country <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className={cn(
                      'form-input appearance-none pr-10 cursor-pointer',
                      errors.country && 'border-red-500/50'
                    )}
                    disabled={status === 'submitting'}
                  >
                    <option value="">Select your country...</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
                {errors.country && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.country}</p>
                )}
              </motion.div>

              {/* ── Consent Checkbox ── */}
              <motion.div variants={fadeUp}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.consentPublic}
                      onChange={(e) => updateField('consentPublic', e.target.checked)}
                      className="sr-only peer"
                      disabled={status === 'submitting'}
                    />
                    <div className="w-5 h-5 rounded-md border border-slate-600 bg-slate-800/60 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all duration-200 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    I consent to my feedback being displayed publicly as a testimonial.
                    <span className="block text-xs text-slate-500 mt-1">
                      Your review may be featured on the portfolio. You can remain anonymous.
                    </span>
                  </span>
                </label>
              </motion.div>

              {/* ── Submit Button ── */}
              <motion.div variants={fadeUp} className="pt-2">
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full text-base py-4"
                >
                  {status === 'submitting' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Feedback
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* ── Trust signals ── */}
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 pt-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock size={12} />
                  Privacy Respected
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock size={12} />
                  ~30 seconds
                </span>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
