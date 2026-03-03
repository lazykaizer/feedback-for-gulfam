'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export function ImageUpload({ onFileSelect, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileSelect(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [onFileSelect]
  );

  const clearImage = () => {
    setPreview(null);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 1,
    disabled,
  });

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-emerald-sm"
          >
            <Image
              src={preview}
              alt="Profile preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-400 transition-colors"
            >
              <X size={10} className="text-white" />
            </button>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/20 animate-pulse-glow" />
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...(getRootProps() as any)}
            className={cn(
              'w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300',
              isDragActive
                ? 'border-emerald-400 bg-emerald-500/10'
                : 'border-slate-700/50 bg-slate-800/40 hover:border-emerald-500/30 hover:bg-slate-800/60',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Upload size={20} className="text-emerald-400" />
            ) : (
              <User size={20} className="text-slate-500" />
            )}
            <span className="text-[9px] text-slate-500 mt-1">Photo</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
