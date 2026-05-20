import { PAGES } from "@/config/pages.config";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
    title: "Стабильный доход",
    desc: "Получайте заказы каждый день. Больше не нужно искать клиентов — они сами вас найдут.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Гибкий график",
    desc: "Работайте когда удобно. Сами выбираете заказы и время их выполнения.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Защита и безопасность",
    desc: "Все сделки защищены платформой. Оплата гарантируется после подтверждения работы.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Рост репутации",
    desc: "Отзывы и рейтинг помогают привлекать больше клиентов и устанавливать более высокие цены.",
  },
];

export default function ForMastersSection() {
  return (
    <section id="for-masters" className="bg-[#14120f] py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-[#14a800] text-sm font-bold tracking-widest uppercase mb-4">Для специалистов</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
              Превратите свои навыки<br />
              <span className="text-[#14a800]">в стабильный доход</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Присоединяйтесь к тысячам специалистов, которые уже зарабатывают через Workflow. 
              Регистрация бесплатна — начните получать заказы уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={PAGES.SIGN_UP}
                className="inline-flex items-center justify-center gap-2 bg-[#14a800] hover:bg-[#108a00] text-white font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Стать специалистом
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Как это работает
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#14a800]/40 transition-colors"
              >
                <div className="text-[#14a800] mb-4">{b.icon}</div>
                <h3 className="text-white font-semibold text-base mb-2">{b.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
