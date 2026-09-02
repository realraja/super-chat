"use client";

import ChatWindow from "@/components/ChatWindow/ChatWindow";
import LeftSidebar from "@/components/LiftSidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import RightSidebar from "@/components/RightSidebar/Sidebar";
import React, { useState } from "react";

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
  const [activeChatId, setActiveChatId] = useState("2");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileView, setMobileView] = useState("list");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setActiveChatId={setActiveChatId}
        setMobileView={setMobileView}
      />

      <LeftSidebar
        mobileView={mobileView}
        setIsMenuOpen={setIsMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredChats={filteredChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setMobileView={setMobileView}
      />

      <ChatWindow
        mobileView={mobileView}
        setMobileView={setMobileView}
        activeChat={activeChat}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={handleSendMessage}
      />

      <RightSidebar
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        activeChat={activeChat}
      />
    </div>
  );
}