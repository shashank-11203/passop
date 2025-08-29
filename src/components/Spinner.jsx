import React from 'react'

const Spinner = () => (
    <div className="flex items-center justify-center">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-400 border-dashed rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center font-semibold text-indigo-600">
            </div>
        </div>
    </div>
);
export default Spinner;