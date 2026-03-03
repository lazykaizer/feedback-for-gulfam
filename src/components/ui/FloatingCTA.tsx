'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Show after scrolling past hero (approx 600px)
    setVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#feedback"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 
                     bg-button-gradient text-white text-sm font-semibold rounded-2xl 
                     shadow-emerald-lg hover:shadow-emerald-glow transition-shadow duration-300"
          aria-label="Give Feedback"
        >
          <MessageSquarePlus size={18} />
          <span className="hidden sm:inline">Give Feedback</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
