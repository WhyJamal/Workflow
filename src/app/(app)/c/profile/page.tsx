const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Figma", "Git"];

const portfolio = [
  { title: "Интернет-магазин одежды", category: "Веб-разработка", img: "🛍️" },
  { title: "Лендинг для стоматологии", category: "Веб-разработка", img: "🦷" },
  { title: "Мобильное приложение доставки", category: "UI/UX дизайн", img: "🚀" },
  { title: "Корпоративный сайт", category: "Веб-разработка", img: "🏢" },
];

const reviews = [
  { name: "FitLife Tashkent", rating: 5, text: "Отличная работа! Всё сделано точно по ТЗ и в срок. Рекомендуем!", date: "3 мая 2026" },
  { name: "Gulnora Shop", rating: 5, text: "Профессионал своего дела. Приятно работать — всё объясняет и согласовывает.", date: "28 апреля 2026" },
  { name: "Dinara Mirzaeva", rating: 4, text: "Хорошая работа. Немного затянули со сроками, но результатом довольна.", date: "20 апреля 2026" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < count ? "text-amber-400" : "text-zinc-200 dark:text-zinc-600"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#14a800] to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
              АМ
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white text-zinc-900">Алишер Маматов</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Fullstack-разработчик · Ташкент</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <StarRating count={5} />
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 ml-1">4.9</span>
                  <span className="text-xs text-zinc-400">(42 отзыва)</span>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                  ✓ Проверен
                </span>
              </div>
            </div>
          </div>
          <button className="bg-[#14a800] hover:bg-[#108a00] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Редактировать
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          {[
            { value: "42", label: "Выполнено заказов" },
            { value: "98%", label: "Успешных заказов" },
            { value: "2 года", label: "На платформе" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-[#14a800]">{s.value}</div>
              <div className="text-xs text-zinc-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* About */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-3 text-sm">О себе</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Опытный fullstack-разработчик с 5-летним стажем. Специализируюсь на создании 
              современных веб-приложений. Ответственный, всегда соблюдаю сроки.
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-3 text-sm">Навыки</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Rates */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-3 text-sm">Стоимость</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Почасовая:</span>
                <span className="font-medium dark:text-white text-zinc-900">50 000 сум / час</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Мин. проект:</span>
                <span className="font-medium dark:text-white text-zinc-900">300 000 сум</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6">
          {/* Portfolio */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold dark:text-white text-zinc-900 text-sm">Портфолио</h2>
              <button className="text-xs text-[#14a800] hover:underline">+ Добавить</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {portfolio.map((p, i) => (
                <div key={i} className="border border-zinc-100 dark:border-zinc-700 rounded-lg p-4 hover:border-[#14a800]/40 transition-colors cursor-pointer">
                  <div className="text-3xl mb-2">{p.img}</div>
                  <p className="text-sm font-medium dark:text-white text-zinc-900">{p.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-4 text-sm">Последние отзывы</h2>
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium dark:text-white text-zinc-900">{r.name}</span>
                    <span className="text-xs text-zinc-400">{r.date}</span>
                  </div>
                  <StarRating count={r.rating} />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
