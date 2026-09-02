"use client";

import React from "react";
import {
  Search,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";

export default function ChatWindow({
  mobileView,
  setMobileView,
  activeChat,
  showProfile,
  setShowProfile,
  inputText,
  setInputText,
  handleSendMessage,
}) {
  return (
    <section
      className={`flex-1 flex-col h-full bg-[#e6eee9] dark:bg-slate-950 relative ${
        mobileView === "list" ? "hidden md:flex" : "flex"
      }`}
    >
      {/* Subtle Telegram Wallpaper Pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Chat Header */}
      <header className="h-16 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileView("list")}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 cursor-pointer"
          >
            {activeChat.isSavedMessages ? (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <BookmarkIcon className="w-5 h-5" />
              </div>
            ) : (
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-sm leading-tight flex items-center gap-1">
                {activeChat.name}
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {activeChat.status}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
          <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 z-10 flex flex-col justify-end">
        {activeChat.messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] md:max-w-[65%] ${
                isMe ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div
                className={`px-3.5 py-2 rounded-2xl text-sm shadow-sm relative group ${
                  isMe
                    ? "bg-blue-500 text-white rounded-tr-xs"
                    : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/50 dark:border-slate-800/80"
                }`}
              >
                {msg.senderName && (
                  <span className="block text-xs font-semibold text-purple-500 mb-0.5">
                    {msg.senderName}
                  </span>
                )}
                <p className="whitespace-pre-wrap leading-relaxed pr-12">
                  {msg.text}
                </p>
                <span
                  className={`text-[10px] absolute right-2.5 bottom-1 flex items-center gap-0.5 ${
                    isMe ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {msg.time}
                  {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 z-10">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <button
            type="button"
            className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Smile className="w-6 h-6" />
          </button>

          <input
            type="text"
            placeholder="Write a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
          />

          <button
            type="button"
            className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {inputText.trim() ? (
            <button
              type="submit"
              className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-transform active:scale-95 shadow-md shadow-blue-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Mic className="w-6 h-6" />
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

function BookmarkIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24" stroke="none">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}