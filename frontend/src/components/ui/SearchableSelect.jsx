"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const SearchableSelect = ({
    value,
    onChange,
    options = [],
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    allowCustom = true,
    disabled = false,
    className = "",
    icon: Icon,
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Filter options
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    // Check whether typed value already exists
    const exactMatch = options.some(
        (option) => option.toLowerCase() === search.trim().toLowerCase()
    );

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setSearch("");
        setOpen(false);
    };

    const handleCustomValue = () => {
        const customValue = search.trim();

        if (!customValue) return;

        onChange(customValue);
        setSearch("");
        setOpen(false);
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
        >
            {/* Main Select */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => {
                    setOpen((prev) => !prev);

                    setTimeout(() => {
                        inputRef.current?.focus();
                    }, 0);
                }}
                className="
        w-full
        px-3 py-2
        rounded-xl
        text-xs
        text-left
        border
        flex items-center justify-between gap-2
        transition-all duration-200

        bg-slate-50
        border-slate-200
        text-slate-900

        dark:bg-slate-950/50
        dark:border-slate-800
        dark:text-slate-100

        focus:outline-none
        focus:border-blue-500

        disabled:opacity-50
        disabled:cursor-not-allowed
    "
            >
                <div className="flex items-center gap-2 min-w-0">

                    {/* Icon */}
                    {Icon && (
                        <Icon
                            className="w-4 h-4 shrink-0 text-slate-400"
                        />
                    )}

                    {/* Value */}
                    <span
                        className={`
                truncate
                ${value
                                ? "text-slate-900 dark:text-slate-100"
                                : "text-slate-400"
                            }
            `}
                    >
                        {value || placeholder}
                    </span>

                </div>

                <ChevronDown
                    className={`
            w-4 h-4
            text-slate-400
            shrink-0
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
        `}
                />
            </button>

            {/* Dropdown */}
            {open && !disabled && (
                <div
                    className="
                        absolute z-50
                        left-0 right-0
                        mt-1
                        rounded-xl
                        border
                        shadow-xl
                        overflow-hidden

                        bg-white
                        border-slate-200

                        dark:bg-slate-900
                        dark:border-slate-700
                    "
                >
                    {/* Search */}
                    <div className="p-2 border-b border-slate-200 dark:border-slate-700">
                        <div className="relative">
                            <Search
                                className="
                                    w-4 h-4
                                    absolute left-3 top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();

                                        if (
                                            allowCustom &&
                                            search.trim() &&
                                            !exactMatch
                                        ) {
                                            handleCustomValue();
                                        }
                                    }

                                    if (e.key === "Escape") {
                                        setOpen(false);
                                        setSearch("");
                                    }
                                }}
                                placeholder={searchPlaceholder}
                                className="
                                    w-full
                                    pl-9 pr-3 py-2
                                    rounded-lg
                                    text-xs

                                    bg-slate-100
                                    text-slate-900
                                    placeholder:text-slate-400

                                    dark:bg-slate-800
                                    dark:text-slate-100

                                    border-0
                                    focus:outline-none
                                "
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="max-h-52 overflow-y-auto p-1">
                        {filteredOptions.map((option) => {
                            const selected =
                                option.toLowerCase() ===
                                value?.toLowerCase();

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`
                                        w-full
                                        text-left
                                        px-3 py-2.5
                                        rounded-lg
                                        text-xs
                                        transition-colors

                                        ${selected
                                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                        }
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>

                                        {selected && (
                                            <span className="text-blue-500">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}

                        {/* Custom value */}
                        {allowCustom &&
                            search.trim() &&
                            !exactMatch && (
                                <button
                                    type="button"
                                    onClick={handleCustomValue}
                                    className="
                                        w-full
                                        text-left
                                        px-3 py-2.5
                                        rounded-lg
                                        text-xs
                                        font-medium

                                        text-blue-600
                                        hover:bg-blue-50

                                        dark:text-blue-400
                                        dark:hover:bg-blue-950/40
                                    "
                                >
                                    + Use &quot;{search.trim()}&quot;
                                </button>
                            )}

                        {/* No results */}
                        {filteredOptions.length === 0 &&
                            (!allowCustom || !search.trim()) && (
                                <div className="px-3 py-3 text-xs text-slate-400 text-center">
                                    No options found
                                </div>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;