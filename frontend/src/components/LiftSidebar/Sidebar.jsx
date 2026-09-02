"use client";

import React from "react";
import { Search, Menu, Pin } from "lucide-react";

export default function LeftSidebar({
  mobileView,
  setIsMenuOpen,
  searchQuery,
  setSearchQuery,
  filteredChats,
  activeChatId,
  setActiveChatId,
  setMobileView,
}) {
  return (
    <aside
      className={`w-full md:w-[380px] lg:w-[420px] flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shrink-0 ${
        mobileView === "chat" ? "hidden md:flex" : "flex"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-3 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/50">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/70 border-none rounded-full text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Chat List Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/20">
        {filteredChats.map((chat) => {
          const lastMsg = chat.messages[chat.messages.length - 1];
          const isActive = chat.id === activeChatId;

          return (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                setMobileView("chat");
              }}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-colors relative ${
                isActive
                  ? "bg-blue-500/10 dark:bg-blue-600/20"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                {chat.isSavedMessages ? (
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <BookmarkIcon className="w-6 h-6" />
                  </div>
                ) : (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                {chat.online && (
                  <span className="w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full absolute bottom-0 right-0" />
                )}
              </div>

              {/* Info & Last Message */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-sm truncate flex items-center gap-1">
                    {chat.name}
                    {chat.isOfficial && (
                      <span className="w-4 h-4 bg-blue-500 text-white rounded-full inline-flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </h4>
                  {lastMsg && (
                    <span className="text-xs text-slate-400 shrink-0">
                      {lastMsg.time}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <p className="truncate pr-2">
                    {lastMsg ? lastMsg.text : "No messages yet"}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    {chat.pinned && <Pin className="w-3.5 h-3.5 text-slate-400 rotate-45" />}
                    {chat.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-blue-500 text-white rounded-full text-[11px] font-medium min-w-[18px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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