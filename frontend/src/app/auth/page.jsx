"use client";

import React, { useState, useRef } from "react";
import {
    User,
    AtSign,
    Mail,
    Lock,
    Phone,
    Building2,
    Briefcase,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    Sparkles,
    ImagePlus,
} from "lucide-react";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { DEPARTMENTS } from "../constants/Constants";



export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState("");
    const fileInputRef = useRef(null);

    // Form States
    const [loginForm, setLoginForm] = useState({
        usernameOrEmail: "MGU0",
        password: "",
    });

    const [registerForm, setRegisterForm] = useState({
        name: "",
        username: "MGU0",
        email: "",
        password: "",
        phone: "",
        avatar: "",
        department: "",
        post: "",
    });

    // Password Strength Calculation
    const getPasswordStrength = (pass) => {
        if (!pass) return { score: 0, label: "", color: "bg-transparent" };
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 1) return { score: 1, label: "Weak", color: "bg-rose-500" };
        if (score === 2 || score === 3)
            return { score: 2, label: "Medium", color: "bg-amber-500" };
        return { score: 3, label: "Strong", color: "bg-emerald-500" };
    };

    const strength = getPasswordStrength(registerForm.password);

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
        if (name === "avatar") {
            setAvatarPreview(value);
        }
    };

    // Handle File Upload from Local Disk
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setRegisterForm({ ...registerForm, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Payload:", loginForm);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Register Payload (Matching userSchema):", registerForm);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">

            {/* Background Radial Lights */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none bg-blue-400/20 dark:bg-blue-600/15" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none bg-indigo-300/30 dark:bg-indigo-600/15" />

            {/* Main Glassmorphic Card */}
            <div className="w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px] z-10 bg-white/90 border-slate-200 shadow-slate-200/60 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-black/50 backdrop-blur-2xl transition-all duration-300">

                {/* Left Brand Panel */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400">
                            <Sparkles className="w-3.5 h-3.5" /> Workspace Portal
                        </div>

                        

                        <div className="space-y-4 pt-4">
                            
                        </div>
                    </div>

                    <div className="pt-8 border-t text-xs flex justify-between items-center border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-500">
                        <span>MGUMST Chat App - {new Date().getFullYear()}</span>
                        <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Developed By IT Department
                        </span>
                    </div>
                </div>

                {/* Right Form Container */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">

                    {/* Navigation Tabs */}
                    <div className="flex p-1.5 rounded-2xl border mb-8 max-w-xs mx-auto lg:mx-0 bg-slate-100 border-slate-200 dark:bg-slate-950/60 dark:border-slate-800">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${activeTab === "login"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${activeTab === "register"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* ==================== LOGIN FORM ==================== */}
                    {activeTab === "login" && (
                        <form onSubmit={handleLoginSubmit} className="space-y-5 animate-in fade-in duration-200">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Welcome back
                                </h2>
                                <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                                    Enter your credentials to access your account.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                                        Username or Email
                                    </label>
                                    <div className="relative">
                                        <AtSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            name="usernameOrEmail"
                                            required
                                            placeholder="alex_rivera or alex@company.com"
                                            value={loginForm.usernameOrEmail}
                                            onChange={handleLoginChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                                            Password
                                        </label>
                                        <a href="#" className="text-xs text-blue-500 hover:underline">
                                            Forgot?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            placeholder="••••••••"
                                            value={loginForm.password}
                                            onChange={handleLoginChange}
                                            className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99]"
                            >
                                Sign In
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* ==================== REGISTER FORM ==================== */}
                    {activeTab === "register" && (
                        <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-in fade-in duration-200">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Create your account
                                </h2>
                                <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                                    Complete profile parameters matching your organization structure.
                                </p>
                            </div>

                            {/* Hybrid Avatar Selector (File Upload & URL Link Toggle) */}
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {/* Avatar */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative w-32 h-32 rounded-full overflow-hidden
                       border-4 border-white dark:border-slate-900
                       bg-slate-100 dark:bg-slate-800
                       shadow-md
                       hover:shadow-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       group"
                                    >
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-12 h-12 text-slate-400" />
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div
                                            className="absolute inset-0 bg-black/40
                           opacity-0 group-hover:opacity-100
                           flex items-center justify-center
                           transition-opacity duration-200"
                                        >
                                            <ImagePlus className="w-8 h-8 text-white" />
                                        </div>
                                    </button>

                                    {/* Upload Button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-1 right-1
                       w-10 h-10 rounded-full
                       flex items-center justify-center
                       bg-blue-600 hover:bg-blue-700
                       text-white
                       border-4 border-white dark:border-slate-900
                       shadow-md
                       transition-all duration-200
                       hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label="Change profile picture"
                                    >
                                        <ImagePlus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Alex Rivera"
                                            value={registerForm.name}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Username *
                                    </label>
                                    <div className="relative">
                                        <AtSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            name="username"
                                            required
                                            placeholder="alex_rivera"
                                            value={registerForm.username}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="alex@company.com"
                                            value={registerForm.email}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="9999999999"
                                            value={registerForm.phone}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Department
                                    </label>

                                    <div className="relative">

                                        <div >
                                            <SearchableSelect
                                                value={registerForm.department}
                                                onChange={(value) =>
                                                    setRegisterForm((prev) => ({
                                                        ...prev,
                                                        department: value,
                                                    }))
                                                }
                                                options={DEPARTMENTS}
                                                placeholder="Select Department"
                                                searchPlaceholder="Search department..."
                                                icon={Building2}
                                                allowCustom
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Post */}
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Job Post / Title
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            name="post"
                                            placeholder="Office Assistant"
                                            value={registerForm.post}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                                    Password *
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        placeholder="Enter a strong password"
                                        value={registerForm.password}
                                        onChange={handleRegisterChange}
                                        className="w-full pl-9 pr-10 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-950/50 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {registerForm.password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-1.5 h-1">
                                            <div
                                                className={`flex-1 rounded-full transition-colors ${strength.score >= 1 ? strength.color : "bg-slate-200 dark:bg-slate-800"
                                                    }`}
                                            />
                                            <div
                                                className={`flex-1 rounded-full transition-colors ${strength.score >= 2 ? strength.color : "bg-slate-200 dark:bg-slate-800"
                                                    }`}
                                            />
                                            <div
                                                className={`flex-1 rounded-full transition-colors ${strength.score >= 3 ? strength.color : "bg-slate-200 dark:bg-slate-800"
                                                    }`}
                                            />
                                        </div>
                                        <p className="text-[10px] text-right font-medium text-slate-400">
                                            Strength: <span className="font-semibold text-slate-600 dark:text-slate-300">{strength.label}</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99] mt-2"
                            >
                                Create Account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}