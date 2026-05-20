import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyJobs } from "@/actions/job.actions";
import type { TMyJobCard } from "@/types/ui.type";

const tabs = ["Все", "В работе", "Ожидают", "Завершённые", "Отменённые"];

export default async function MyJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; }>;
}) {
  const jobs = await getMyJobs((await searchParams).status);

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

      <Tabs defaultValue={(await searchParams).status ?? "Все"} className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-[#14a800] data-[state=active]:text-white text-sm font-medium px-4 py-2.5 rounded-lg"
            >
              <Link href={`?status=${tab}`}>{tab}</Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={(await searchParams).status ?? "Все"} className="mt-6">
          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">Нет заказов</h3>
              <p className="text-zinc-400 text-sm mb-6">Откликайтесь на заказы и начинайте работать</p>
              <Link
                href={PAGES.FIND_WORK}
                className="bg-[#14a800] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#108a00] transition-colors"
              >
                Найти работу
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: TMyJobCard) => (
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
                      {job.statusKey === "IN_PROGRESS" && (
                        <Link
                          href={PAGES.MESSAGES}
                          className="mt-2 inline-block text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#14a800] hover:text-[#14a800] px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Написать клиенту
                        </Link>
                      )}
                      {job.statusKey === "COMPLETED" && (
                        <span className="mt-2 inline-block text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-400 px-3 py-1.5 rounded-lg">
                          Завершён ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
