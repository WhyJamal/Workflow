import { PAGES } from "@/config/pages.config";
import {
  Hammer,
  Code2,
  Palette,
  BookOpen,
  Sparkles,
  Scale,
  Camera,
  BarChart3,
  Zap,
  FileText,
  Truck,
  BrushCleaning,
} from "lucide-react";

export const categories = [
  { name: "Ремонт и строительство", count: "2 840 специалистов", icon: Hammer, color: "from-orange-500/20 to-orange-500/5" },
  { name: "IT и разработка", count: "4 120 специалистов", icon: Code2, color: "from-blue-500/20 to-blue-500/5" },
  { name: "Дизайн и творчество", count: "1 950 специалистов", icon: Palette, color: "from-purple-500/20 to-purple-500/5" },
  { name: "Репетиторы и обучение", count: "3 670 специалистов", icon: BookOpen, color: "from-yellow-500/20 to-yellow-500/5" },
  { name: "Красота и здоровье", count: "2 210 специалистов", icon: Sparkles, color: "from-pink-500/20 to-pink-500/5" },
  { name: "Юридические услуги", count: "890 специалистов", icon: Scale, color: "from-green-500/20 to-green-500/5" },
  { name: "Фото и видео", count: "1 450 специалистов", icon: Camera, color: "from-cyan-500/20 to-cyan-500/5" },
  { name: "Бухгалтерия и финансы", count: "1 100 специалистов", icon: BarChart3, color: "from-emerald-500/20 to-emerald-500/5" },
  { name: "Электрика и сантехника", count: "1 780 специалистов", icon: Zap, color: "from-amber-500/20 to-amber-500/5" },
  { name: "Переводы и тексты", count: "760 специалистов", icon: FileText, color: "from-indigo-500/20 to-indigo-500/5" },
  { name: "Транспорт и логистика", count: "1 320 специалистов", icon: Truck, color: "from-slate-500/20 to-slate-500/5" },
  { name: "Уборка и клининг", count: "930 специалистов", icon: BrushCleaning, color: "from-teal-500/20 to-teal-500/5" },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-[#14120f] py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#14a800] text-sm font-bold tracking-widest uppercase mb-3">Все сферы</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Популярные категории</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Более 50 категорий услуг. Найдите специалиста любой профессии в вашем городе.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={PAGES.SIGN_UP}
              className="group relative bg-white/4 border border-white/10 rounded-2xl p-5 hover:border-[#14a800]/50 hover:bg-white/7 transition-all duration-300 cursor-pointer"
            >
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <span className="text-3xl mb-3 block">
                  <cat.icon className="w-8 h-8" />
                </span>
                <h3 className="text-white text-sm font-semibold mb-1 leading-snug">{cat.name}</h3>
                <p className="text-white/40 text-xs">{cat.count}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={PAGES.SIGN_UP}
            className="inline-flex items-center gap-2 text-[#14a800] text-sm font-semibold hover:underline"
          >
            Смотреть все категории
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
