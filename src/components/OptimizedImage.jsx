import { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage - A component that provides:
 * - Lazy loading with Intersection Observer
 * - Smooth fade-in animation on load
 * - Loading placeholder with shimmer effect
 * - Proper loading attribute for native lazy loading
 */
export default function OptimizedImage({
    src,
    alt,
    className = '',
    priority = false,
    onLoad,
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef(null);

    useEffect(() => {
        if (priority) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px', // Start loading 200px before visible
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = (e) => {
        setIsLoaded(true);
        onLoad?.(e);
    };

    return (
        <div
            ref={imgRef}
            className={`optimized-image-wrapper ${className}`}
            {...props}
        >
            {/* Shimmer placeholder */}
            {!isLoaded && (
                <div className="image-placeholder shimmer" />
            )}

            {/* Actual image */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={priority ? 'high' : 'auto'}
                    onLoad={handleLoad}
                    className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
                />
            )}
        </div>
    );
}

/**
 * Preload critical images - call this early in your app
 */
export function preloadCriticalImages() {
    const criticalImages = [
        '/SanSatLogo.webp',
        '/icon-192.png'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}
