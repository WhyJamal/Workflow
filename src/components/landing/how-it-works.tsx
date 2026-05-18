"use client";

import { useState } from "react";

const clientSteps = [
  {
    step: "01",
    title: "Опишите задачу",
    desc: "Расскажите, что нужно сделать — укажите детали, сроки и бюджет. Это займёт не больше 2 минут.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Получите предложения",
    desc: "Проверенные специалисты откликнутся на вашу заявку. Сравните профили, отзывы и цены.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Начните работу",
    desc: "Выберите лучшего специалиста, обсудите детали в чате и следите за ходом выполнения заказа.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const masterSteps = [
  {
    step: "01",
    title: "Создайте профиль",
    desc: "Укажите свои навыки, опыт и расценки. Добавьте примеры работ, чтобы выделиться среди конкурентов.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Откликайтесь на заказы",
    desc: "Просматривайте заявки клиентов и откликайтесь на подходящие. Платформа подбирает заказы по вашей специальности.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Выполняйте и зарабатывайте",
    desc: "Выполните работу качественно и получите оплату. Хорошие отзывы помогут получать больше заказов.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [tab, setTab] = useState<"client" | "master">("client");
  const steps = tab === "client" ? clientSteps : masterSteps;

  return (
    <section id="how-it-works" className="bg-[#14120f] py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#14a800] text-sm font-bold tracking-widest uppercase mb-3">Просто и понятно</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Как это работает</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Workflow делает поиск специалистов и клиентов максимально простым — всего три шага.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-14">
          <button
            onClick={() => setTab("client")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              tab === "client" ? "bg-[#14a800] text-white" : "border border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Я ищу специалиста
          </button>
          <button
            onClick={() => setTab("master")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              tab === "master" ? "bg-[#14a800] text-white" : "border border-white/20 text-white/60 hover:text-white"
            }`}
          >
            Я специалист
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#14a800]/40 hover:bg-white/8 transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 text-[#14a800] text-xs font-black tracking-widest bg-[#14120f] px-3 py-1 border border-[#14a800]/30 rounded-full">
                ШАГ {s.step}
              </div>
              <div className="text-[#14a800] mb-5 mt-2">{s.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
