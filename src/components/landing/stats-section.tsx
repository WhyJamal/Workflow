import {
  Users,
  CheckCircle2,
  Trophy,
  Star,
} from "lucide-react";

export const stats = [
  {
    value: "120 000+",
    label: "Зарегистрированных пользователей",
    icon: Users,
  },
  {
    value: "18 500+",
    label: "Проверенных специалистов",
    icon: CheckCircle2,
  },
  {
    value: "95 000+",
    label: "Выполненных заказов",
    icon: Trophy,
  },
  {
    value: "4.8 / 5",
    label: "Средний рейтинг исполнителей",
    icon: Star,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0f0e0c] py-20 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">
                <s.icon className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-white text-3xl md:text-4xl font-black mb-2 tracking-tight">{s.value}</div>
              <div className="text-white/45 text-sm leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
