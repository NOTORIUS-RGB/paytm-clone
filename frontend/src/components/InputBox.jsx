export function InputBox({ label, placeholder, onChange, type = "text", value }) {
    return (
        <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
                {label}
            </div>
            <input 
                type={type}
                value={value}
                onChange={onChange} 
                placeholder={placeholder} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400" 
            />
        </div>
    );
}