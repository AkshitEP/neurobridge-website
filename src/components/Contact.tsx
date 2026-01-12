"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send to your backend
        setSubmitted(true);
        setEmail("");
    };

    return (
        <section id="contact" className="section-padding bg-[#080808] relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="text-sm uppercase tracking-widest text-indigo-400 mb-4 block">
                        Join the Waitlist
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white/90 mb-6">
                        Be the first to know<span className="text-white/40">.</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
                        NeuroBridge is currently in development. Sign up for early access
                        and be part of the communication revolution.
                    </p>

                    {/* Email form */}
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 rounded-2xl glass inline-block"
                        >
                            <div className="flex items-center gap-3 text-green-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg">You're on the list! We'll be in touch.</span>
                            </div>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105 whitespace-nowrap"
                            >
                                Get Early Access
                            </button>
                        </form>
                    )}

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Privacy First</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>No Spam</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Early Access Benefits</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
