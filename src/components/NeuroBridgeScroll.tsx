"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

const TOTAL_FRAMES = 240;

// Frame paths for different themes
const getFramePath = (theme: string | undefined) => {
    // Default to white frames for light mode (or when theme is undefined)
    return theme === "dark" ? "/frames-black/ezgif-frame-" : "/frames-white/ezgif-frame-";
};

// Loading Spinner Component
const LoadingSpinner = ({ progress }: { progress: number }) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)]">
        <div className="relative w-24 h-24">
            {/* Outer ring */}
            <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--text-body)"
                    strokeWidth="2"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--text-heading)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-light tracking-tight text-[var(--text-heading)]">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
        <p className="mt-8 text-sm tracking-widest text-[var(--text-body)] uppercase">
            Loading NeuroBridge
        </p>
    </div>
);

// Text Overlay Component
interface TextOverlayProps {
    children: React.ReactNode;
    scrollProgress: number;
    showStart: number;
    showEnd: number;
    position?: "center" | "left" | "right";
    className?: string;
}

const TextOverlay = ({
    children,
    scrollProgress,
    showStart,
    showEnd,
    position = "center",
    className = "",
}: TextOverlayProps) => {
    const fadeIn = showStart;
    const fadeOut = showEnd;
    const peakStart = showStart + 0.05;
    const peakEnd = showEnd - 0.05;

    let opacity = 0;
    if (scrollProgress >= fadeIn && scrollProgress <= fadeOut) {
        if (scrollProgress < peakStart) {
            opacity = (scrollProgress - fadeIn) / (peakStart - fadeIn);
        } else if (scrollProgress > peakEnd) {
            opacity = 1 - (scrollProgress - peakEnd) / (fadeOut - peakEnd);
        } else {
            opacity = 1;
        }
    }

    const positionClasses = {
        center: "left-1/2 -translate-x-1/2 text-center",
        left: "left-8 md:left-16 lg:left-24 text-left",
        right: "right-8 md:right-16 lg:right-24 text-right",
    };

    return (
        <motion.div
            className={`text-overlay top-1/2 -translate-y-1/2 ${positionClasses[position]} ${className}`}
            style={{ opacity }}
            initial={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default function NeuroBridgeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const currentFrameRef = useRef(0);
    const { theme, resolvedTheme } = useTheme();

    // Use resolvedTheme for actual theme value (handles 'system' theme)
    const currentTheme = resolvedTheme || theme;

    // Set mounted state after hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll progress tracking - only use after mounted
    const { scrollYProgress } = useScroll({
        target: isMounted ? containerRef : undefined,
        offset: ["start start", "end end"],
    });

    // Smooth interpolation for frame index
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
    const [currentProgress, setCurrentProgress] = useState(0);

    // Load images on mount and when theme changes
    useEffect(() => {
        // Don't load until mounted (to avoid hydration issues with theme)
        if (!isMounted) return;

        // Reset loading state when theme changes
        setIsLoading(true);
        setLoadProgress(0);

        const framePath = getFramePath(currentTheme);
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                const frameNumber = String(index + 1).padStart(3, "0");
                img.src = `${framePath}${frameNumber}.jpg`;

                img.onload = () => {
                    loadedImages[index] = img;
                    loadedCount++;
                    setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
                    resolve();
                };

                img.onerror = () => {
                    loadedCount++;
                    setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
                    resolve();
                };
            });
        };

        // Load images in batches for better performance
        const loadAllImages = async () => {
            const batchSize = 20;
            for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
                const batch = [];
                for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
                    batch.push(loadImage(j));
                }
                await Promise.all(batch);
            }
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadAllImages();
    }, [isMounted, currentTheme]);

    // Draw frame to canvas with cropping
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Cropping percentages
        const cropTopPercent = 0.20;    // 20% from top
        const cropBottomPercent = 0.20; // 20% from bottom
        const cropRightPercent = 0.03;  // 3% from right

        // Calculate source crop dimensions
        const srcX = 0;
        const srcY = img.height * cropTopPercent;
        const srcWidth = img.width * (1 - cropRightPercent);
        const srcHeight = img.height * (1 - cropTopPercent - cropBottomPercent);

        // Set canvas dimensions to match cropped aspect ratio
        const newWidth = srcWidth;
        const newHeight = srcHeight;

        if (canvas.width !== newWidth || canvas.height !== newHeight) {
            canvas.width = newWidth;
            canvas.height = newHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw cropped portion of image to fill canvas
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, canvas.width, canvas.height);
    }, [images]);

    // Update canvas on scroll
    useEffect(() => {
        if (images.length === 0 || !isMounted) return;

        const unsubscribe = frameIndex.on("change", (latest) => {
            const index = Math.min(Math.floor(latest), TOTAL_FRAMES - 1);
            if (index !== currentFrameRef.current && images[index]) {
                currentFrameRef.current = index;
                requestAnimationFrame(() => drawFrame(index));
            }
        });

        // Draw first frame immediately
        if (images[0]) {
            drawFrame(0);
        }

        return () => unsubscribe();
    }, [images, frameIndex, drawFrame, isMounted]);

    // Track scroll progress for text overlays
    useEffect(() => {
        if (!isMounted) return;

        const unsubscribe = smoothProgress.on("change", (latest) => {
            setCurrentProgress(latest);
        });
        return () => unsubscribe();
    }, [smoothProgress, isMounted]);

    return (
        <>
            {/* Loading overlay */}
            {isLoading && <LoadingSpinner progress={loadProgress} />}

            {/* Main scroll container - always rendered for ref attachment */}
            <div
                ref={containerRef}
                className="relative h-[400vh] bg-[var(--background)]"
                style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            >
                {/* Sticky Canvas Container */}
                <div className="scroll-canvas">
                    <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-full object-contain"
                    />

                    {/* Text Overlays */}
                    {/* 0% - Opening Title */}
                    <TextOverlay
                        scrollProgress={currentProgress}
                        showStart={0}
                        showEnd={0.2}
                        position="center"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[var(--text-heading)] mb-4">
                            <span className="font-display">NeuroBridge</span><span className="text-[var(--text-body)]">.</span>
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-[var(--text-body)]">
                            Intent-Based Communication
                        </p>
                    </TextOverlay>

                    {/* 30% - See the World */}
                    <TextOverlay
                        scrollProgress={currentProgress}
                        showStart={0.25}
                        showEnd={0.45}
                        position="left"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-heading)] mb-3">
                            See the World<span className="text-[var(--text-body)]">.</span>
                        </h2>
                        <p className="text-lg md:text-xl font-light text-[var(--text-body)] max-w-md">
                            Advanced vision sensors capture your environment in real-time,
                            providing context for natural communication.
                        </p>
                    </TextOverlay>

                    {/* 60% - Think in Intent */}
                    <TextOverlay
                        scrollProgress={currentProgress}
                        showStart={0.5}
                        showEnd={0.7}
                        position="right"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-heading)] mb-3">
                            Think in Intent<span className="text-[var(--text-body)]">.</span>
                        </h2>
                        <p className="text-lg md:text-xl font-light text-[var(--text-body)] max-w-md ml-auto">
                            Neural processing transforms your intentions into meaningful
                            expressions, powered by cutting-edge AI.
                        </p>
                    </TextOverlay>

                    {/* 90% - Speak Naturally CTA */}
                    <TextOverlay
                        scrollProgress={currentProgress}
                        showStart={0.8}
                        showEnd={1}
                        position="center"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-heading)] mb-6">
                            Speak Naturally<span className="text-[var(--text-body)]">.</span>
                        </h2>
                        <p className="text-lg md:text-xl font-light text-[var(--text-body)] mb-8 max-w-lg mx-auto">
                            Experience communication without barriers.
                            NeuroBridge gives voice to your thoughts.
                        </p>
                        <button className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 pointer-events-auto">
                            Learn More
                        </button>
                    </TextOverlay>
                </div>
            </div>
        </>
    );
}
