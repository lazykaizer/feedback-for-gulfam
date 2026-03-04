'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function FloatingCoffeeButton() {
    const controls = useAnimation();
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Shake animation every 2 minutes
    useEffect(() => {
        if (!mounted) return;

        // Initial shake after 3 seconds so the user notices it
        const initialShake = setTimeout(() => {
            controls.start({
                rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                transition: { duration: 0.6 },
            });
        }, 3000);

        const shakeInterval = setInterval(() => {
            controls.start({
                rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                transition: { duration: 0.6 },
            });
        }, 120000); // 2 mins

        return () => {
            clearTimeout(initialShake);
            clearInterval(shakeInterval);
        };
    }, [mounted, controls]);

    if (!mounted) return null;

    const handlePointerDown = (e: React.PointerEvent) => {
        dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleDragEnd = (event: any, info: any) => {
        const currentX = info.point.x;
        const isLeftSide = currentX < window.innerWidth / 2;

        // Snap to left or right edges
        controls.start({
            x: isLeftSide ? -(window.innerWidth - 88) : 0,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        });
    };

    const handleClick = (e: React.MouseEvent) => {
        // If dragged more than a few pixels, cancel the click navigation
        const distance = Math.sqrt(
            Math.pow(dragStartPos.current.x - e.clientX, 2) +
            Math.pow(dragStartPos.current.y - e.clientY, 2)
        );
        if (distance > 5) {
            e.preventDefault();
        } else {
            // Because framer-motion drag on an element can block default links, safely attempt to open
            e.preventDefault();
            window.open('https://buymeacoffee.com/lazykaizer', '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            <div
                ref={constraintsRef}
                style={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    right: 16,
                    bottom: 16, // Reset back to screen edge
                    pointerEvents: 'none',
                    zIndex: 40
                }}
            />

            <motion.a
                href="https://buymeacoffee.com/lazykaizer"
                target="_blank"
                rel="noopener noreferrer"
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                onClick={handleClick}
                onPointerDown={handlePointerDown}
                onDragEnd={handleDragEnd}
                animate={controls}
                initial={{ x: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    zIndex: 51,
                    touchAction: 'none'
                }}
                className="w-14 h-14 rounded-2xl bg-[#FFDD00] shadow-[0_0_20px_rgba(255,221,0,0.4)] flex items-center justify-center border border-[#FFDC00]/50 cursor-grab active:cursor-grabbing pointer-events-auto"
                title="Buy me a coffee"
                draggable="false"
            >
                <img
                    src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                    alt="Buy me a coffee"
                    className="w-8 h-8 pointer-events-none"
                    draggable="false"
                />
            </motion.a>
        </>
    );
}
