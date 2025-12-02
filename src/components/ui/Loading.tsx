'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${sizeClasses[size]} text-turquoise`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

interface PageLoaderProps {
  text?: string;
}

export function PageLoader({ text = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-white text-lg">{text}</p>
      </motion.div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style = {
    width: width || '100%',
    height: height || '1.5rem'
  };

  return (
    <div
      className={`bg-gray-200 animate-pulse ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Card skeleton for dynamic content
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Skeleton height={200} className="rounded-t-xl" />
      <div className="p-6 space-y-4">
        <Skeleton width="60%" height={24} />
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton width={100} height={32} className="rounded-full" />
          <Skeleton width={80} height={32} className="rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Stats skeleton
export function StatsSkeleton() {
  return (
    <div className="py-24 bg-navy text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4">
              <Skeleton width={80} height={48} className="mx-auto mb-2" />
              <Skeleton width={100} height={16} className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
