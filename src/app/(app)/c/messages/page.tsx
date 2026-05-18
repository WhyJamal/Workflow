"use client";

import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "FitLife Tashkent",
    lastMessage: "Отлично! Когда сможете показать первый вариант?",
    time: "10:32",
    unread: 2,
    avatar: "FT",
    color: "from-blue-500 to-blue-700",
    online: true,
    jobTitle: "Разработка лендинга",
  },
  {
    id: 2,
    name: "Gulnora Shop",
    lastMessage: "Хорошо, давайте начнём с аудита текущей рекламы",
    time: "вчера",
    unread: 0,
    avatar: "GS",
    color: "from-pink-500 to-pink-700",
    online: false,
    jobTitle: "Настройка рекламы",
  },
  {
    id: 3,
    name: "Bobur Toshmatov",
    lastMessage: "Вы видели мой адрес в деталях заказа?",
    time: "вчера",
    unread: 1,
    avatar: "БТ",
    color: "from-amber-500 to-amber-700",
    online: true,
    jobTitle: "Установка кондиционера",
  },
  {
    id: 4,
    name: "Dinara Mirzaeva",
    lastMessage: "Спасибо за работу! Всё отлично 👍",
    time: "2 дня назад",
    unread: 0,
    avatar: "ДМ",
    color: "from-green-500 to-green-700",
    online: false,
    jobTitle: "Перевод документов",
  },
];

const messages = [
  { id: 1, from: "other", text: "Здравствуйте! Я посмотрел ваш профиль, очень впечатляет. Хотел обсудить детали заказа.", time: "10:15" },
  { id: 2, from: "me", text: "Добрый день! Готов обсудить. Что именно вас интересует?", time: "10:18" },
  { id: 3, from: "other", text: "Нам нужен лендинг для нашего фитнес-клуба. Дизайн частично готов в Figma, нужна разработка.", time: "10:20" },
  { id: 4, from: "me", text: "Понял, посмотрел ваш бриф. Могу сделать за 7-10 дней. Использую Next.js + Tailwind.", time: "10:24" },
  { id: 5, from: "other", text: "Звучит хорошо! Сможете уложиться в наш бюджет — 800 000 сум?", time: "10:28" },
  { id: 6, from: "me", text: "Да, всё реально. Давайте я пришлю детальное предложение сегодня вечером.", time: "10:30" },
  { id: 7, from: "other", text: "Отлично! Когда сможете показать первый вариант?", time: "10:32" },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-[calc(100vh-65px)] bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <div className="w-80 shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="font-semibold dark:text-white text-zinc-900 mb-3">Сообщения</h2>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Поиск..." className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14a800]/40" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              className={`w-full flex items-start gap-3 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left border-b border-zinc-50 dark:border-zinc-800/50 ${activeChat.id === conv.id ? "bg-zinc-50 dark:bg-zinc-800" : ""}`}
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${conv.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {conv.avatar}
                </div>
                {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white text-zinc-900 truncate">{conv.name}</span>
                  <span className="text-xs text-zinc-400 shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-zinc-500 truncate mt-0.5">{conv.lastMessage}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{conv.jobTitle}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-[#14a800] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${activeChat.color} flex items-center justify-center text-white text-xs font-bold`}>
              {activeChat.avatar}
            </div>
            <div>
              <p className="font-semibold dark:text-white text-zinc-900 text-sm">{activeChat.name}</p>
              <p className="text-xs text-zinc-400">{activeChat.jobTitle} · {activeChat.online ? <span className="text-green-500">онлайн</span> : "был(а) вчера"}</p>
            </div>
          </div>
          <button className="text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-700 px-3 py-1.5 rounded-lg transition-colors">
            Детали заказа
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === "me"
                    ? "bg-[#14a800] text-white rounded-br-sm"
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-bl-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/70" : "text-zinc-400"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Написать сообщение..."
              className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a800]/40"
            />
            <button
              className="bg-[#14a800] hover:bg-[#108a00] text-white p-2.5 rounded-xl transition-colors"
              onClick={() => setInputValue("")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
