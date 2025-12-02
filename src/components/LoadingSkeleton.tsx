export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Image skeleton */}
                        <div className="h-64 bg-gray-300"></div>
                        
                        {/* Content skeleton */}
                        <div className="p-6 space-y-4">
                            {/* Badge */}
                            <div className="h-4 bg-gray-300 rounded-full w-20"></div>
                            
                            {/* Title */}
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            
                            {/* Rating */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <div key={j} className="h-4 w-4 bg-gray-300 rounded"></div>
                                ))}
                            </div>
                            
                            {/* Price */}
                            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                            
                            {/* Features */}
                            <div className="space-y-2">
                                {[...Array(3)].map((_, k) => (
                                    <div key={k} className="h-4 bg-gray-300 rounded"></div>
                                ))}
                            </div>
                            
                            {/* Button */}
                            <div className="h-12 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
