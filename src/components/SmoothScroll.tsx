"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis smooth scrolling
        lenisRef.current = new Lenis({
            duration: 1.2, // Scroll animation duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Animation frame loop
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}
