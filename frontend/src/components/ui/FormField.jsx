import React from 'react'

export const FormField = ({
    label,
    required = false,
    icon: Icon,
    children,
}) => {
    return (
        <div className="w-full">
            <label className="block mb-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            w-4
                            h-4
                            text-slate-400
                            pointer-events-none
                            z-10
                        "
                    />
                )}

                {children}
            </div>
        </div>
    );
};
