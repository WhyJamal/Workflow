import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobs, getCategories } from "@/actions/job.actions";
import { ApplyButton } from "./apply-button";
import { SaveJobButton } from "./save-job-button";
import type { TJobCard } from "@/types/ui.type";

const sortOptions = [
  { value: "newest", label: "По дате (новые)" },
  { value: "highest", label: "По бюджету (выше)" },
  { value: "fewest", label: "Меньше откликов" },
];

export default async function FindWorkPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>;
}) {
  const [jobs, categories] = await Promise.all([
    getJobs({
      search: (await searchParams).search,
      category: (await searchParams).category,
      sort: (await searchParams).sort,
    }),
    getCategories(),
  ]);

  const categoryNames = ["Все категории", ...categories.map((c: { name: string }) => c.name)];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">Найти работу</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Актуальные заказы от клиентов по всему городу</p>
      </div>

      <form method="get" className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <Input
            type="text"
            name="search"
            defaultValue={(await searchParams).search}
            placeholder="Поиск по заказам..."
            className="w-full pl-9 pr-4 py-2.5"
          />
        </div>

        <Select name="category" defaultValue={(await searchParams).category}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categoryNames.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select name="sort" defaultValue={(await searchParams).sort}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <button type="submit" className="bg-[#14a800] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#108a00] transition-colors">
          Найти
        </button>
      </form>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">Заказов не найдено</h3>
            <p className="text-zinc-400 text-sm">Попробуйте изменить фильтры поиска</p>
          </div>
        ) : (
          jobs.map((job: TJobCard) => (
            <div
              key={job.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-[#14a800]/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                      {job.category}
                    </span>
                    <span className="text-xs text-zinc-400">{job.posted}</span>
                  </div>
                  <h3 className="font-semibold dark:text-white text-zinc-900 text-base mb-2">{job.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">{job.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#14a800] font-semibold text-sm mb-1">{job.budget}</p>
                  <p className="text-zinc-400 text-xs">Срок: {job.deadline}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#14a800] to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                    {job.client.name[0]}
                  </div>
                  <div>
                    <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">{job.client.name}</span>
                    <span className="text-xs text-zinc-400 ml-2">⭐ {job.client.rating} · {job.client.jobs} заказов</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400">{job.proposals} откликов</span>
                  <SaveJobButton jobId={job.id} />
                  <ApplyButton jobId={job.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
