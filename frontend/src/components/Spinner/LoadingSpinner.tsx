
interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

export default function LoadingSpinner({ 
    size = 'medium',
    message = 'Loading patient data...' 
}: LoadingProps) {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    const containerSizeClasses = {
        small: 'h-16',
        medium: 'h-24',
        large: 'h-32'
    };

    return (
        <div className={` bg-opacity-10 rounded-lg p-10 ${containerSizeClasses[size]}`}>
            <div className="flex flex-col items-center justify-center h-full gap-3">
                {/* Spinner */}
                <div className="relative">
                    <div className={`${sizeClasses[size]} border-4 border-white border-t-red-500 rounded-full animate-spin`} />
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1 -translate-y-1 w-2 h-2 bg-red-500 rounded-full`} />
                </div>
                
                {/* Loading message */}
                <p className="text-red-700 font-medium text-sm">
                    {message}
                </p>
            </div>
        </div>
    );
}
