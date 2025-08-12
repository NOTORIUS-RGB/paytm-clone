export function Button({ label, onClick, variant = "primary", disabled = false, loading = false }) {
    const baseClasses = "w-full font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-300 shadow-lg hover:shadow-xl",
        secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-300",
        success: "text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-300 shadow-lg hover:shadow-xl",
        danger: "text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-300 shadow-lg hover:shadow-xl"
    };

    return (
        <button 
            onClick={onClick} 
            disabled={disabled || loading}
            className={`${baseClasses} ${variants[variant]}`}
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