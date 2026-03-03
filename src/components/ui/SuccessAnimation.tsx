'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

interface SuccessAnimationProps {
  visible: boolean;
  onReset?: () => void;
}

export function SuccessAnimation({ visible, onReset }: SuccessAnimationProps) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (visible && !hasRun.current) {
      hasRun.current = true;

      // Fire confetti burst
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };

      frame();
    }
    if (!visible) hasRun.current = false;
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex flex-col items-center justify-center text-center py-16 px-8"
        >
          {/* Animated checkmark circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative mb-8"
          >
            {/* Pulsing glow ring */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-24 h-24 rounded-full bg-emerald-500/20"
            />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-emerald-glow">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
              >
                <CheckCircle2 size={44} className="text-white" strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 justify-center mb-3">
              <Sparkles size={18} className="text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Thank You!</span>
              <Sparkles size={18} className="text-emerald-400" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold gradient-text-white mb-3">
              Your Feedback Matters
            </h3>

            <p className="text-slate-400 text-base sm:text-lg max-w-md leading-relaxed mb-8">
              Your review has been submitted successfully. It helps build better
              products and inspires continuous improvement.
            </p>

            {onReset && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onReset}
                className="btn-secondary"
              >
                <ArrowLeft size={16} />
                Submit Another Review
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
