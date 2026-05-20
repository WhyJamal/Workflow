import Link from "next/link";
import { getClientJobs } from "@/actions/client.actions";
import { PAGES } from "@/config/pages.config";
import type { TClientJobCard } from "@/types/ui.type";

const tabs = ["Все", "Открытые", "В работе", "Завершённые", "Отменённые"];

export default async function ClientMyJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const status = (await searchParams).status;
  const jobs = await getClientJobs(status);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">
            Мои заказы
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Все размещённые вами заказы
          </p>
        </div>
        <Link
          href="/cl/post-job"
          className="bg-[#14a800] hover:bg-[#108a00] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          + Новый заказ
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const active = (status ?? "Все") === tab;
          return (
            <Link
              key={tab}
              href={`?status=${tab}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? "bg-[#14a800] text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {tab}
            </Link>
          );
        })}
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">
            Нет заказов
          </h3>
          <p className="text-zinc-400 text-sm mb-6">
            Разместите первый заказ и получите отклики от мастеров
          </p>
          <Link
            href="/cl/post-job"
            className="bg-[#14a800] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#108a00] transition-colors"
          >
            Разместить заказ
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job: TClientJobCard) => (
            <Link
              key={job.id}
              href={PAGES.JOB(job.id)}
              className="block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-[#14a800]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                      {job.category}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.statusColor}`}
                    >
                      {job.status}
                    </span>
                    <span className="text-xs text-zinc-400">
                      от {job.createdAt}
                    </span>
                  </div>
                  <h3 className="font-semibold dark:text-white text-zinc-900 mb-1">
                    {job.title}
                  </h3>
                  {job.acceptedMaster ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Мастер:{" "}
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {job.acceptedMaster}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-zinc-400">
                      {job.applications === 0
                        ? "Пока нет заявок"
                        : `${job.applications} заявок — нажмите, чтобы просмотреть`}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#14a800] font-semibold text-sm">
                    {job.budget}
                  </p>
                  <p className="text-zinc-400 text-xs mt-1">
                    Срок: {job.deadline}
                  </p>
                  {job.applications > 0 && !job.acceptedMaster && (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full font-medium">
                      📨 {job.applications} заявок
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
