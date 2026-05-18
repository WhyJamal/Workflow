"use client";

import { useState, useRef, useEffect } from "react";

const trendingSkills = [
  { name: "Сантехник", growth: "+285%" },
  { name: "Дизайнер", growth: "+318%" },
  { name: "Программист", growth: "+2684%" },
  { name: "Репетитор", growth: "+1690%" },
  { name: "Фотограф", growth: "+1138%" },
  { name: "Бухгалтер", growth: "+18350%" },
  { name: "Электрик", growth: "+1138%" },
  { name: "Юрист", growth: "+2684%" },
  { name: "Сантехник", growth: "+285%" },
  { name: "Дизайнер", growth: "+318%" },
];

const rotatingProfessions = [
  "сантехника",
  "дизайнера",
  "программиста",
  "репетитора",
  "фотографа",
  "бухгалтера",
  "электрика",
  "юриста",
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"client" | "master">("client");
  const [searchValue, setSearchValue] = useState("");
  const [profIndex, setProfIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setProfIndex((prev) => (prev + 1) % rotatingProfessions.length);
        setFade(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#14120f] font-sans">

      <section className="relative w-full min-h-screen overflow-hidden">

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/preview/hero_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#14120f] to-transparent" />

        <div className="relative z-10 flex flex-col h-full px-10 md:px-20 pt-28 max-w-4xl">

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "client"
                  ? "bg-white text-black shadow"
                  : "text-white/60 hover:text-white border border-white/20"
              }`}
            >
              Найти специалиста
            </button>
            <button
              onClick={() => setActiveTab("master")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "master"
                  ? "bg-white text-black shadow"
                  : "text-white/60 hover:text-white border border-white/20"
              }`}
            >
              Найти клиентов
            </button>
          </div>

          {/* Headline */}
          {activeTab === "client" ? (
            <h1 className="text-white text-[2.8rem] md:text-[3.4rem] font-bold leading-[1.1] tracking-tight mb-5">
              Найдите{" "}
              <span
                className="text-[#14a800] inline-block transition-all duration-300"
                style={{
                  opacity: fade ? 1 : 0,
                  transform: fade ? "translateY(0)" : "translateY(-8px)",
                }}
              >
                {rotatingProfessions[profIndex]}
              </span>
              <br />
              за несколько минут
            </h1>
          ) : (
            <h1 className="text-white text-[2.8rem] md:text-[3.4rem] font-bold leading-[1.1] tracking-tight mb-5">
              Получайте заказы
              <br />
              <span className="text-[#14a800]">каждый день</span>
            </h1>
          )}

          {/* Subheading */}
          <p className="text-white/85 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
            {activeTab === "client"
              ? "Wokrflow объединяет вас с проверенными специалистами любой профессии — быстро, надёжно и без лишних хлопот."
              : "Создайте профиль, укажите свои навыки и начните получать заявки от клиентов по всему городу."}
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-102 shadow-lg">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                activeTab === "client"
                  ? "Нужен опытный сантехник..."
                  : "Ваша профессия или навык..."
              }
              className="flex-1 px-5 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button className="bg-[#14a800] hover:bg-[#108a00] transition-colors text-white text-sm font-semibold px-6 py-3 rounded-full m-1 whitespace-nowrap">
              {activeTab === "client" ? "Найти" : "Начать"}
            </button>
          </div>
        </div>
      </section>

      {/* Trending */}
      <div className="bg-[#14120f] border-t border-white/5 py-4 overflow-hidden">
        <div className="flex items-center gap-4 px-6 md:px-10">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-500 text-xs font-bold tracking-widest uppercase whitespace-nowrap">
              Популярно
            </span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-[#14120f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-[#14120f] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-2 animate-marquee whitespace-nowrap">
              {trendingSkills.map((skill, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-full px-4 py-1.5 cursor-pointer shrink-0"
                >
                  <svg
                    className="w-3.5 h-3.5 text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span className="text-white/80 text-sm font-medium">
                    {skill.name}
                  </span>
                  <span className="text-green-400 text-sm font-semibold">
                    {skill.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}