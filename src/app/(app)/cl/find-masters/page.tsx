import { getMasters } from "@/actions/client.actions";
import Link from "next/link";
import { StartChatButton } from "@/components/start-chat-button";
import { Dot, MapPin, Star } from "lucide-react";
import { PAGES } from "@/config/pages.config";

export default async function FindMastersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; }>;
}) {
  const masters = await getMasters({ search: (await searchParams).search });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">
          Найти мастера
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Просматривайте профили мастеров и находите подходящего
        </p>
      </div>

      <form method="get" className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              name="search"
              defaultValue={(await searchParams).search}
              placeholder="Поиск по имени, специальности, навыкам..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#14a800]/40 focus:border-[#14a800] transition-colors"
            />
          </div>
          <button type="submit" className="bg-[#14a800] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#108a00] transition-colors">
            Найти
          </button>
        </div>
      </form>

      {masters.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">Мастера не найдены</h3>
          <p className="text-zinc-400 text-sm">Попробуйте изменить запрос</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {masters.map((master) => (
            <div key={master.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-[#14a800]/40 hover:shadow-sm transition-all flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#14a800] to-emerald-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {master.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold dark:text-white text-zinc-900 text-sm truncate">{master.name}</p>
                    {master.isVerified && <span className="text-[#14a800] text-xs" title="Верифицирован">✓</span>}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{master.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {master.rating > 0
                    ? `${master.rating} (${master.reviewsCount})`
                    : "Нет отзывов"}
                </span>

                <span className="flex items-center gap-1">
                  <Dot className="w-4 h-4 text-zinc-400" />
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  {master.city}
                </span>

                {master.hourlyRate && (
                  <span className="flex items-center gap-1">
                    <Dot className="w-4 h-4 text-zinc-400" />
                    <span className="text-[#14a800] font-medium">
                      {master.hourlyRate.toLocaleString()} сум/ч
                    </span>
                  </span>
                )}
              </div>

              {master.bio && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">{master.bio}</p>
              )}

              {master.skills.length > 0 && (
                <div className="flex gap-1 flex-wrap mb-4">
                  {master.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                  {master.skills.length > 3 && (
                    <span className="text-xs text-zinc-400">+{master.skills.length - 3}</span>
                  )}
                </div>
              )}

              <div className="mt-auto flex gap-2">
                <StartChatButton
                  otherUserId={master.id}
                  redirectBase={PAGES.CLIENT_MESSAGES}
                  label="💬 Написать"
                  className="flex-1 text-center text-xs bg-[#14a800] hover:bg-[#108a00] text-white px-3 py-2 rounded-lg transition-colors font-medium"
                />
                <Link
                  href={PAGES.CLIENT_POST_JOB}
                  className="flex-1 text-center text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#14a800] hover:text-[#14a800] px-3 py-2 rounded-lg transition-colors"
                >
                  Предложить заказ
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
