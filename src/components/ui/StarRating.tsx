'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
  disabled?: boolean;
}

export function StarRating({ value, onChange, size = 32, disabled = false }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hovered || value);

        return (
          <motion.button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className={cn(
              'relative transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              size={size}
              className={cn(
                'transition-all duration-200',
                isActive
                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  : 'text-slate-600 fill-transparent'
              )}
            />
            {/* Glow effect when active */}
            {isActive && (
              <motion.div
                layoutId={undefined}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-full bg-amber-400/20"
              />
            )}
          </motion.button>
        );
      })}
      
      {/* Rating label */}
      <span className="ml-2 text-sm text-slate-400 tabular-nums min-w-[2ch]">
        {value > 0 ? value : '—'}/5
      </span>
    </div>
  );
}
