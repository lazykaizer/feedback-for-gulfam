"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Star, Quote } from 'lucide-react';

// --- Types ---
export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
    rating?: number;
}

function StarDisplay({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={14}
                    className={
                        star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700/50'
                    }
                />
            ))}
        </div>
    );
}

// --- Sub-Components ---
export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role, rating }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    aria-hidden={index === 1 ? "true" : "false"}
                                    tabIndex={index === 1 ? -1 : 0}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -4,
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    whileFocus={{
                                        scale: 1.02,
                                        y: -4,
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    className="glass-card p-8 rounded-3xl max-w-xs w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-emerald-500/30 flex flex-col relative overflow-hidden"
                                >
                                    {/* Quote icon */}
                                    <Quote
                                        size={32}
                                        className="absolute top-4 right-4 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors duration-300"
                                    />

                                    {/* Rating */}
                                    {rating && typeof rating === 'number' && (
                                        <div className="mb-4">
                                            <StarDisplay rating={rating} />
                                        </div>
                                    )}

                                    <blockquote className="m-0 p-0 flex-1 flex flex-col">
                                        <p className="text-sm text-slate-300 leading-relaxed font-normal m-0 transition-colors duration-300 flex-1 mb-5">
                                            &ldquo;{text}&rdquo;
                                        </p>

                                        {/* Divider */}
                                        <div className="h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 mb-5" />

                                        <footer className="flex items-center gap-3 mt-auto">
                                            <img
                                                width={40}
                                                height={40}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-10 w-10 rounded-xl object-cover border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300 ease-in-out"
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-medium text-sm not-italic tracking-tight leading-5 text-white transition-colors duration-300">
                                                    {name}
                                                </cite>
                                                <span className="text-xs leading-5 tracking-tight text-slate-500 mt-0.5 transition-colors duration-300">
                                                    {role}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};
