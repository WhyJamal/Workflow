const testimonials = [
  {
    name: "Алишер Каримов",
    role: "Клиент",
    avatar: "АК",
    rating: 5,
    text: "Нашёл отличного электрика через Workflow буквально за час. Мастер приехал вовремя, всё сделал профессионально. Теперь пользуюсь платформой постоянно.",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Малика Юсупова",
    role: "Дизайнер интерьеров",
    avatar: "МЮ",
    rating: 5,
    text: "Через Workflow я получаю 3-4 новых заказа в неделю. Платформа удобная, клиенты серьёзные. Рекомендую всем фрилансерам.",
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Жасур Рахимов",
    role: "Клиент",
    avatar: "ЖР",
    rating: 5,
    text: "Искал программиста для своего магазина. На Workflow нашёл специалиста с отличными отзывами, который сделал всё именно так, как я хотел.",
    color: "from-green-500 to-green-700",
  },
  {
    name: "Нилуфар Хасанова",
    role: "Репетитор по математике",
    avatar: "НХ",
    rating: 5,
    text: "До Workflow у меня было 5 учеников в месяц. Сейчас — 15-18. Платформа реально работает и привлекает именно тех клиентов, которые мне нужны.",
    color: "from-amber-500 to-amber-700",
  },
  {
    name: "Санжар Бекмуродов",
    role: "Клиент",
    avatar: "СБ",
    rating: 5,
    text: "Отличный сервис! Нашёл фотографа для корпоратива за 20 минут. Все фото получились великолепно. Уже рекомендую коллегам.",
    color: "from-red-500 to-red-700",
  },
  {
    name: "Дилноза Ахмедова",
    role: "Бухгалтер-фрилансер",
    avatar: "ДА",
    rating: 5,
    text: "Работаю на Workflow уже больше года. Стабильный поток клиентов, удобный чат и простая система оплаты — всё что нужно для работы.",
    color: "from-teal-500 to-teal-700",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#14a800]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0f0e0c] py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#14a800] text-sm font-bold tracking-widest uppercase mb-3">Отзывы</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Что говорят пользователи</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Тысячи клиентов и специалистов уже оценили удобство Workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-11 h-11 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
              <StarRating count={t.rating} />
              <p className="text-white/65 text-sm leading-relaxed mt-3">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
