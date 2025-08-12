export function InputBox({ label, placeholder, onChange, type = "text", value, error }) {
    return (
        <div className="mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">
                {label}
            </div>
            <input 
                type={type}
                value={value}
                onChange={onChange} 
                placeholder={placeholder} 
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    error 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                }`}
            />
            {error && (
                <div className="text-red-500 text-sm mt-1">
                    {error}
                </div>
            )}
        </div>
    );
}