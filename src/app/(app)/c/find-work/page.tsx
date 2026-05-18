import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const jobs = [
  {
    id: 1,
    title: "Разработка интернет-магазина на Next.js",
    category: "IT и разработка",
    desc: "Нужен опытный разработчик для создания интернет-магазина. Дизайн готов (Figma). Требуется: Next.js, Tailwind, Stripe интеграция.",
    budget: "1 500 000 – 3 000 000 сум",
    deadline: "2 недели",
    posted: "1 час назад",
    proposals: 4,
    client: { name: "ООО Bunyod Trade", rating: 4.9, jobs: 12 },
  },
  {
    id: 2,
    title: "Ремонт ванной комнаты под ключ",
    category: "Ремонт и строительство",
    desc: "Требуется полный ремонт ванной: укладка плитки, замена сантехники, установка душевой кабины. Площадь ~8 кв.м.",
    budget: "2 000 000 – 4 000 000 сум",
    deadline: "10 дней",
    posted: "3 часа назад",
    proposals: 7,
    client: { name: "Азиза Маматова", rating: 4.7, jobs: 3 },
  },
  {
    id: 3,
    title: "Фотосессия для ресторана",
    category: "Фото и видео",
    desc: "Нужен фотограф для съёмки блюд и интерьера нашего ресторана. ~60 фотографий с ретушью. Желательно опыт в food-фотографии.",
    budget: "500 000 – 800 000 сум",
    deadline: "1 день",
    posted: "5 часов назад",
    proposals: 11,
    client: { name: "Ресторан Samarkand", rating: 5.0, jobs: 8 },
  },
  {
    id: 4,
    title: "Уроки английского языка онлайн",
    category: "Репетиторы и обучение",
    desc: "Ищу репетитора по английскому для подготовки к IELTS. Уровень B1. Занятия 3 раза в неделю по 1.5 часа.",
    budget: "100 000 – 150 000 сум / занятие",
    deadline: "3 месяца",
    posted: "вчера",
    proposals: 16,
    client: { name: "Шерзод Умаров", rating: 4.8, jobs: 5 },
  },
  {
    id: 5,
    title: "Логотип и фирменный стиль для стартапа",
    category: "Дизайн и творчество",
    desc: "Нужен дизайнер для разработки логотипа и брендбука. Компания занимается доставкой продуктов. Нужен современный, минималистичный стиль.",
    budget: "700 000 – 1 200 000 сум",
    deadline: "5 дней",
    posted: "2 дня назад",
    proposals: 9,
    client: { name: "FastDeliver UZ", rating: 4.6, jobs: 2 },
  },
];

const categories = [
  "Все категории",
  "IT и разработка",
  "Ремонт и строительство",
  "Дизайн и творчество",
  "Репетиторы и обучение",
  "Фото и видео",
  "Бухгалтерия и финансы",
  "Красота и здоровье",
  "Юридические услуги",
];

export default function FindWorkPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">Найти работу</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Актуальные заказы от клиентов по всему городу</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <Input
            type="text"
            placeholder="Поиск по заказам..."
            className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14a800]/40"
          />
        </div>

        <Select>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">По дате (новые)</SelectItem>
              <SelectItem value="highest">По бюджету (выше)</SelectItem>
              <SelectItem value="fewest">Меньше откликов</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-[#14a800]/50 hover:shadow-sm transition-all cursor-pointer"
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
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-400">{job.proposals} откликов</span>
                <button className="bg-[#14a800] hover:bg-[#108a00] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
                  Откликнуться
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
