"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "50M+", label: "People who could benefit" },
    { value: "10x", label: "Faster than typing" },
    { value: "99%", label: "Intent accuracy" },
    { value: "24/7", label: "Always available" },
];

export default function About() {
    return (
        <section id="about" className="section-padding bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left column - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sm uppercase tracking-widest text-indigo-400 mb-4 block">
                            Our Mission
                        </span>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white/90 mb-6">
                            Giving voice to those who cannot speak<span className="text-white/40">.</span>
                        </h2>
                        <div className="space-y-4 text-white/60 leading-relaxed">
                            <p>
                                Millions of people worldwide live with conditions that affect their ability
                                to speak—ALS, cerebral palsy, stroke, and many others. Current communication
                                devices are slow, frustrating, and often fail to capture true intent.
                            </p>
                            <p>
                                NeuroBridge changes everything. By combining eye-tracking, environmental
                                awareness, and predictive AI, we've created a system that understands not
                                just what you want to say, but the context in which you want to say it.
                            </p>
                            <p>
                                Our goal is simple: make communication as natural as thought itself.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right column - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl glass text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/60">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
