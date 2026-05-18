import Link from "next/link";
import { PAGES } from "@/config/pages.config";

const stats = [
  { label: "Активных заказов", value: "3", icon: "📋", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
  { label: "Новых сообщений", value: "7", icon: "💬", color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
  { label: "Просмотров профиля", value: "124", icon: "👁", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
  { label: "Выполнено заказов", value: "42", icon: "✅", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
];

const recentJobs = [
  { title: "Разработка лендинга", client: "Ахмад Рахимов", status: "В работе", price: "500 000 сум", time: "2 часа назад", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { title: "Ремонт сантехники", client: "Малика Юсупова", status: "Ожидает", price: "150 000 сум", time: "5 часов назад", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  { title: "Дизайн логотипа", client: "Санжар Бекмуродов", status: "Завершён", price: "300 000 сум", time: "вчера", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
];

const quickActions = [
  { href: PAGES.FIND_WORK, label: "Найти работу", icon: "🔍", desc: "Просмотреть новые заказы" },
  { href: PAGES.MESSAGES, label: "Сообщения", icon: "💬", desc: "Чат с клиентами" },
  { href: PAGES.PROFILE, label: "Профиль", icon: "👤", desc: "Редактировать анкету" },
  { href: PAGES.SAVED_JOBS, label: "Сохранённые", icon: "🔖", desc: "Заказы в закладках" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto px-6 py-10">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">Добро пожаловать 👋</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Вот что происходит с вашим аккаунтом сегодня</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">{s.value}</div>
            <div className="text-zinc-500 dark:text-zinc-400 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold dark:text-white text-zinc-900">Последние заказы</h2>
            <Link href={PAGES.MY_JOBS} className="text-sm text-[#14a800] hover:underline">Все заказы</Link>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                <div>
                  <p className="text-sm font-medium dark:text-white text-zinc-900">{job.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{job.client} · {job.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#14a800]">{job.price}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${job.statusColor}`}>{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold dark:text-white text-zinc-900 mb-5">Быстрые действия</h2>
          <div className="space-y-2">
            {quickActions.map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-xl">{a.icon}</span>
                <div>
                  <p className="text-sm font-medium dark:text-white text-zinc-900 group-hover:text-[#14a800] transition-colors">{a.label}</p>
                  <p className="text-xs text-zinc-400">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
