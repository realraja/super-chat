"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Phone,
  User,
  HelpCircle,
  Settings,
  Users,
  Bookmark,
} from "lucide-react";

const emptySubscribe = () => () => {};

export default function Navbar({ isMenuOpen, setIsMenuOpen, setActiveChatId, setMobileView }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isMenuOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-white dark:bg-slate-900 z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header: User Info & Theme Switcher */}
        <div className="p-4 bg-blue-600 dark:bg-slate-800 text-white flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="My Avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
            />
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title="Toggle Theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-300" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-100" />
                )}
              </button>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-base leading-tight">Alex Rivera</h3>
            <p className="text-xs text-blue-100 dark:text-slate-400 mt-0.5">+1 (555) 019-2834</p>
          </div>
        </div>

        {/* Drawer Menu Links */}
        <div className="flex-1 py-2 overflow-y-auto text-sm font-medium">
          <button
            onClick={() => {
              setActiveChatId("4");
              setMobileView("chat");
              setIsMenuOpen(false);
            }}
            className="w-full px-5 py-3 flex items-center gap-6 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Bookmark className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>Saved Messages</span>
          </button>

          <button className="w-full px-5 py-3 flex items-center gap-6 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <Users className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>New Group</span>
          </button>

          <button className="w-full px-5 py-3 flex items-center gap-6 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>Contacts</span>
          </button>

          <button className="w-full px-5 py-3 flex items-center gap-6 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <Phone className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>Calls</span>
          </button>

          <hr className="my-2 border-slate-100 dark:border-slate-800" />

          <button className="w-full px-5 py-3 flex items-center gap-6 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>Settings</span>
          </button>

          {mounted && (
            <div
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-full px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-6">
                <Moon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span>Night Mode</span>
              </div>
              <span
                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                  resolvedTheme === "dark" ? "bg-blue-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    resolvedTheme === "dark" ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </span>
            </div>
          )}

          <button className="w-full px-5 py-3 flex items-center gap-6 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <HelpCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>Telegram Features</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 text-center">
          Telegram Web Next.js v4.0
        </div>
      </aside>
    </>
  );
}

function BookmarkIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24" stroke="none">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}