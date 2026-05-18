import Link from "next/link";
import { PAGES } from "@/config/pages.config";

const savedJobs = [
  {
    id: 1,
    title: "Создание мобильного приложения iOS/Android",
    category: "IT и разработка",
    budget: "5 000 000 – 10 000 000 сум",
    deadline: "2 месяца",
    proposals: 6,
    savedAt: "2 часа назад",
    client: { name: "TechStart UZ", rating: 4.8 },
    desc: "Разработка кросс-платформенного приложения на React Native для доставки еды. Дизайн готов.",
  },
  {
    id: 2,
    title: "SEO-оптимизация сайта",
    category: "IT и разработка",
    budget: "400 000 – 800 000 сум",
    deadline: "1 месяц",
    proposals: 13,
    savedAt: "вчера",
    client: { name: "Mirzo Online", rating: 4.6 },
    desc: "Нужна полная SEO-оптимизация интернет-магазина: аудит, семантика, On-page оптимизация, отчёты.",
  },
  {
    id: 3,
    title: "Преподаватель по рисованию (онлайн)",
    category: "Репетиторы и обучение",
    budget: "80 000 – 120 000 сум / занятие",
    deadline: "Постоянно",
    proposals: 5,
    savedAt: "3 дня назад",
    client: { name: "Камола Юнусова", rating: 5.0 },
    desc: "Ищу преподавателя по скетчингу и акварели для 10-летнего ребёнка. 2 раза в неделю по 1 часу.",
  },
];

export default function SavedJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">Сохранённые заказы</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{savedJobs.length} заказов в закладках</p>
        </div>
        <Link
          href={PAGES.FIND_WORK}
          className="text-sm text-[#14a800] border border-[#14a800]/30 hover:bg-[#14a800]/5 px-4 py-2 rounded-lg transition-colors"
        >
          Найти ещё
        </Link>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔖</div>
          <h3 className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">Нет сохранённых заказов</h3>
          <p className="text-zinc-400 text-sm mb-6">Сохраняйте интересные заказы, чтобы вернуться к ним позже</p>
          <Link href={PAGES.FIND_WORK} className="bg-[#14a800] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#108a00] transition-colors">
            Найти заказы
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-[#14a800]/40 transition-all"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                      {job.category}
                    </span>
                    <span className="text-xs text-zinc-400">Сохранено {job.savedAt}</span>
                  </div>
                  <h3 className="font-semibold dark:text-white text-zinc-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">{job.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span>⭐ {job.client.name} ({job.client.rating})</span>
                    <span>📅 {job.deadline}</span>
                    <span>👥 {job.proposals} откликов</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#14a800] font-semibold text-sm mb-3">{job.budget}</p>
                  <div className="flex gap-2 justify-end">
                    <button className="text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                      Удалить
                    </button>
                    <button className="text-xs bg-[#14a800] hover:bg-[#108a00] text-white px-4 py-1.5 rounded-lg transition-colors font-medium">
                      Откликнуться
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
