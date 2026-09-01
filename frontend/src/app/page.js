"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  Menu,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  Sun,
  Moon,
  CheckCheck,
  Lock,
  Pin,
  User,
  Bell,
  ArrowLeft,
  X
} from "lucide-react";

// --- DUMMY DATA ---
const INITIAL_CHATS = [
  {
    id: "1",
    name: "Telegram News",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    isOfficial: true,
    unreadCount: 3,
    pinned: true,
    status: "4.2M subscribers",
    bio: "Official channel for Telegram news and updates.",
    username: "@telegram",
    messages: [
      { id: "m1", text: "Welcome to the new Telegram web client layout! 🚀", time: "10:14 AM", sender: "them", status: "read" },
      { id: "m2", text: "We have introduced brand new custom themes and seamless performance upgrades.", time: "10:15 AM", sender: "them", status: "read" },
      { id: "m3", text: "Check out the smooth animations in both light and dark modes!", time: "10:16 AM", sender: "them", status: "read" },
    ],
  },
  {
    id: "2",
    name: "Sarah Connor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    online: true,
    unreadCount: 0,
    pinned: true,
    status: "online",
    bio: "Building cool web apps | Next.js enthusiast",
    username: "@sarah_c",
    messages: [
      { id: "m10", text: "Hey! Are we still meeting for coffee today?", time: "Yesterday", sender: "them", status: "read" },
      { id: "m11", text: "Yes absolutely! 3 PM works fine.", time: "Yesterday", sender: "me", status: "read" },
      { id: "m12", text: "Great, see you at the usual spot! ☕", time: "8:30 AM", sender: "them", status: "read" },
    ],
  },
  {
    id: "3",
    name: "Dev Team Hub",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    unreadCount: 12,
    pinned: false,
    status: "148 members, 12 online",
    bio: "Official dev group chat for project releases.",
    username: "@devhub_global",
    messages: [
      { id: "m20", text: "Alex pushed new changes to the main branch.", time: "May 12", sender: "them", senderName: "Alex", status: "read" },
      { id: "m21", text: "Make sure to run npm install before building!", time: "May 12", sender: "them", senderName: "Elena", status: "read" },
    ],
  },
  {
    id: "4",
    name: "Saved Messages",
    isSavedMessages: true,
    unreadCount: 0,
    pinned: false,
    status: "Your cloud storage",
    bio: "Forward messages here to keep them safe. Send media and files to store them in the cloud.",
    username: "@me",
    messages: [
      { id: "m30", text: "API Keys & Server IP credentials notes", time: "Apr 04", sender: "me", status: "read" },
      { id: "m31", text: "https://nextjs.org/docs/app/building-your-application/styling/tailwind-css", time: "Apr 10", sender: "me", status: "read" },
    ],
  },
  {
    id: "5",
    name: "Michael Scott",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    online: false,
    unreadCount: 0,
    pinned: false,
    status: "last seen 2 hours ago",
    bio: "Regional Manager at Dunder Mifflin",
    username: "@the_boss",
    messages: [
      { id: "m40", text: "That's what she said!", time: "Mar 22", sender: "them", status: "read" },
    ],
  },
];

export default function TelegramUI() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeChatId, setActiveChatId] = useState("2");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileView, setMobileView] = useState("list"); // 'list' | 'chat'

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
      status: "sent",
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
    setInputText("");
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      
      {/* 1. LEFT SIDEBAR: CHAT LIST */}
      <aside
        className={`w-full md:w-[380px] lg:w-[420px] flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shrink-0 ${
          mobileView === "chat" ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-3 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/50">
          <button
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
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/70 border-none rounded-full text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-sky-600" />
              )}
            </button>
          )}
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
                    ? "bg-sky-500/10 dark:bg-sky-600/20"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  {chat.isSavedMessages ? (
                    <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white">
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
                        <span className="w-4 h-4 bg-sky-500 text-white rounded-full inline-flex items-center justify-center text-[10px] font-bold">
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
                        <span className="px-1.5 py-0.5 bg-sky-500 text-white rounded-full text-[11px] font-medium min-w-[18px] text-center">
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

      {/* 2. MIDDLE / MAIN CHAT WINDOW */}
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
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white">
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
                <p className="text-xs text-sky-600 dark:text-sky-400">
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
                      ? "bg-sky-500 text-white rounded-tr-xs"
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
                      isMe ? "text-sky-100" : "text-slate-400"
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
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-10">
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
              className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
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
                className="p-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-transform active:scale-95 shadow-md shadow-sky-500/20"
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

      {/* 3. RIGHT SIDEBAR: USER / CHANNEL PROFILE (TOGGLEABLE) */}
      {showProfile && (
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
              <div className="w-24 h-24 rounded-full bg-sky-500 flex items-center justify-center text-white mb-4">
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
      )}
    </div>
  );
}

// Inline Bookmark Icon Helper
function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
    >
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}