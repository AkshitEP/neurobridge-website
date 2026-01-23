"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]"
        >
            {/* Background gradient - Updated for light mode */}
            <div className="absolute inset-0 bg-gradient-radial from-indigo-100/40 via-transparent to-transparent opacity-60" />

            {/* Animated grid background - Updated for light mode */}
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="badge mb-8"
                    >
                        <span>Alpha</span>
                    </motion.div>

                    {/* Main heading - solid text, gradient only on "Reimagined" */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-[var(--text-heading)] mb-6">
                        Communication
                        <br />
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Reimagined
                        </span>
                    </h1>

                    {/* Subheading - proper weight and color */}
                    <p className="text-lg md:text-xl text-[var(--text-body)] max-w-2xl mx-auto mb-10">
                        <span className="font-display">NeuroBridge</span> transforms intent into natural speech for those who cannot speak.
                        Powered by eye-tracking, context awareness, and advanced AI.
                    </p>

                    {/* CTA Buttons - Updated styling */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#product"
                            className="btn-primary w-full sm:w-auto text-center"
                        >
                            See How It Works
                        </Link>
                        <Link
                            href="#contact"
                            className="btn-secondary w-full sm:w-auto text-center"
                        >
                            Get Early Access
                        </Link>
                    </div>
                </motion.div>

                {/* Scroll indicator removed as per user request */}
            </div>
        </section>
    );
}
