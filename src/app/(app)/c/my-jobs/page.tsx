import Link from "next/link";
import { PAGES } from "@/config/pages.config";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = ["Все", "В работе", "Ожидают", "Завершённые", "Отменённые"];

const jobs = [
  {
    id: 1,
    title: "Разработка лендинга для фитнес-клуба",
    client: "FitLife Tashkent",
    status: "В работе",
    price: "800 000 сум",
    deadline: "15 мая 2026",
    progress: 60,
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Настройка рекламы в Instagram",
    client: "Gulnora Shop",
    status: "В работе",
    price: "350 000 сум",
    deadline: "20 мая 2026",
    progress: 30,
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: 3,
    title: "Установка кондиционера",
    client: "Bobur Toshmatov",
    status: "Ожидает",
    price: "200 000 сум",
    deadline: "22 мая 2026",
    progress: 0,
    statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    id: 4,
    title: "Перевод документов (RU→EN)",
    client: "Dinara Mirzaeva",
    status: "Завершён",
    price: "150 000 сум",
    deadline: "5 мая 2026",
    progress: 100,
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: 5,
    title: "Фотосессия для свадьбы",
    client: "Jasur & Nilufar",
    status: "Завершён",
    price: "1 200 000 сум",
    deadline: "1 мая 2026",
    progress: 100,
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
];

export default function MyJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">Мои вакансии</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Все ваши заказы и их статус</p>
        </div>
        <Link
          href={PAGES.FIND_WORK}
          className="bg-[#14a800] hover:bg-[#108a00] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          + Найти работу
        </Link>
      </div>


      <Tabs defaultValue="Все" className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-[#14a800] data-[state=active]:text-white text-sm font-medium px-4 py-2.5 rounded-lg"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            {tab}
          </TabsContent>
        ))}
      </Tabs>

      {/* Jobs */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold dark:text-white text-zinc-900">{job.title}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.statusColor}`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                  Клиент: <span className="text-zinc-700 dark:text-zinc-300 font-medium">{job.client}</span>
                  <span className="mx-2">·</span>
                  Срок: <span className="text-zinc-700 dark:text-zinc-300 font-medium">{job.deadline}</span>
                </p>

                {/* Progress bar */}
                {job.progress > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full">
                      <div
                        className="h-full rounded-full bg-[#14a800] transition-all"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-400 shrink-0">{job.progress}%</span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#14a800]">{job.price}</p>
                {job.status === "В работе" && (
                  <button className="mt-2 text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#14a800] hover:text-[#14a800] px-3 py-1.5 rounded-lg transition-colors">
                    Написать клиенту
                  </button>
                )}
                {job.status === "Завершён" && (
                  <button className="mt-2 text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-400 px-3 py-1.5 rounded-lg cursor-default">
                    Отзыв получен
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
