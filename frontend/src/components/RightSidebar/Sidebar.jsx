"use client";

import React from "react";
import { User, Bell, Lock, X } from "lucide-react";

export default function RightSidebar({ showProfile, setShowProfile, activeChat }) {
  if (!showProfile) return null;

  return (
    <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-col h-full hidden lg:flex shrink-0 animate-in slide-in-from-right duration-200">
      {/* Profile Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-semibold text-base">User Info</h3>
        <button
          onClick={() => setShowProfile(false)}
          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Details */}
      <div className="p-6 flex flex-col items-center text-center border-b border-slate-100 dark:border-slate-800">
        {activeChat.isSavedMessages ? (
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4">
            <BookmarkIcon className="w-10 h-10" />
          </div>
        ) : (
          <img
            src={activeChat.avatar}
            alt={activeChat.name}
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
          />
        )}
        <h2 className="font-bold text-lg">{activeChat.name}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{activeChat.status}</p>
      </div>

      {/* Info Rows */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
        <div className="flex items-start gap-4">
          <User className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {activeChat.username}
            </p>
            <p className="text-xs text-slate-400">Username</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Bell className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">Notifications</p>
            <p className="text-xs text-slate-400">Enabled</p>
          </div>
        </div>

        {activeChat.bio && (
          <div className="flex items-start gap-4">
            <Lock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeChat.bio}
              </p>
              <p className="text-xs text-slate-400 mt-1">Bio</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function BookmarkIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24" stroke="none">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}