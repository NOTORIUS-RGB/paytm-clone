export function Button({ label, onClick, variant = "primary", disabled = false, loading = false, size = "md" }) {
    const baseClasses = "font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
    
    const sizeClasses = {
        sm: "text-sm px-4 py-2",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4"
    };
    
    const variants = {
        primary: "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-300 shadow-lg hover:shadow-xl",
        secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 border border-gray-300",
        success: "text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-300 shadow-lg hover:shadow-xl",
        danger: "text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:ring-red-300 shadow-lg hover:shadow-xl",
        outline: "text-blue-600 bg-transparent border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-300"
    };

    return (
        <button 
            onClick={onClick} 
            disabled={disabled || loading}
            className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} w-full`}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                </div>
            ) : (
                label
            )}
        </button>
    );
}