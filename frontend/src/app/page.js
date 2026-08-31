"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, MessageSquare, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";

export default function ChatIntro() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders theme-dependent UI after mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 ease-in-out relative overflow-hidden flex flex-col justify-between p-6 md:p-12">
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Header / Navbar */}
      <nav className="flex justify-between items-center z-10 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight hover:scale-105 transition-transform duration-200">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <MessageSquare className="w-6 h-6 animate-bounce" />
          </div>
          <span>PulseChat</span>
        </div>

        {/* Theme Toggle Button with Mount Guard to prevent hydration mismatch */}
        {mounted ? (
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        ) : (
          <div className="w-11 h-11" /> /* Placeholder to prevent layout shift */
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto z-10 py-12">
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-800/50">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Next-Gen Messaging</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Connect instantly with <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">zero effort.</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0">
            Experience ultra-fast, end-to-end encrypted messaging designed for seamless real-time conversations anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
            <button className="group w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-300 dark:hover:bg-slate-800 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Floating Chat Mockup */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                JD
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%] shadow-sm">
                Hey! Did you check out the new dark mode features? 🌙
              </div>
            </div>

            <div className="flex items-start gap-3 justify-end">
              <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-md">
                Yes! The smooth transitions look incredible. 🚀
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="animate-pulse">Sarah is typing...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Badges Footer */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800/60 z-10">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/40">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Ultra Fast</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Low-latency WebSockets delivery.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/40">
          <div className="p-3 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">End-to-End Encrypted</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your privacy comes first by default.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/40">
          <div className="p-3 bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Smart Themes</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Seamless Light and Dark modes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}