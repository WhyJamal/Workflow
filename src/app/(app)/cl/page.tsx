import Link from "next/link";
import { getClientDashboard } from "@/actions/client.actions";
import { auth } from "@/auth";
import { PAGES } from "@/config/pages.config";
import { quickActions, stats } from "./config";
import type { TClientDashboardJob } from "@/types/ui.type";

export default async function ClientDashboardPage() {
  const session = await auth();
  const data = await getClientDashboard();

  return (
    <div className="mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">
          Добро пожаловать, {session?.user?.name?.split(" ")[0] ?? ""}! 👋
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Здесь вы можете управлять заказами и находить мастеров
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
          >
            <div
              className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center text-lg mb-3`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">
              {s.value}
            </div>
            <div className="text-zinc-500 dark:text-zinc-400 text-xs">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent jobs */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold dark:text-white text-zinc-900">
              Последние заказы
            </h2>
            <Link
              href={PAGES.MY_JOBS}
              className="text-sm text-[#14a800] hover:underline"
            >
              Все заказы
            </Link>
          </div>

          {data.recentJobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-zinc-400 text-sm mb-4">
                У вас пока нет заказов
              </p>
              <Link
                href={PAGES.CLIENT_POST_JOB}
                className="bg-[#14a800] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#108a00] transition-colors"
              >
                Разместить заказ
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.recentJobs.map((job: TClientDashboardJob) => (
                <Link
                  key={job.id}
                  href={PAGES.JOB(job.id)}
                  className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 group"
                >
                  <div>
                    <p className="text-sm font-medium dark:text-white text-zinc-900 group-hover:text-[#14a800] transition-colors">
                      {job.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {job.master ? `Мастер: ${job.master}` : `${job.applications} заявок`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#14a800]">
                      {job.budget}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${job.statusColor}`}
                    >
                      {job.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold dark:text-white text-zinc-900 mb-5">
            Быстрые действия
          </h2>
          <div className="space-y-2">
            {quickActions.map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-xl">
                  <a.icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-medium dark:text-white text-zinc-900 group-hover:text-[#14a800] transition-colors">
                    {a.label}
                  </p>
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
