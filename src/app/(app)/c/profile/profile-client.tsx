"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/profile.actions";
import type { MasterProfilePageData } from "@/actions/profile.actions";
import type { WorkWithDetails } from "@/actions/work.actions";
import { PAGES } from "@/config/pages.config";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-amber-400" : "text-zinc-200 dark:text-zinc-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function WorkMediaThumb({ work }: { work: WorkWithDetails }) {
  const first = work.media[0];

  if (!first) {
    return <div className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800" />;
  }

  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group">
      {first.type === "VIDEO" ? (
        <video src={first.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
      ) : (
        <img src={first.url} alt={work.caption ?? "Work"} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-90" />

      <div className="absolute left-3 right-3 bottom-3">
        <div className="flex items-center justify-between gap-2 text-white text-xs">
          <span className="rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
            {work.media.length > 1 ? `${work.media.length} media` : first.type === "VIDEO" ? "Video" : "Photo"}
          </span>
          <span className="rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
            ❤ {work._count.likes}
          </span>
        </div>
        {work.caption && (
          <p className="mt-2 text-sm text-white/90 line-clamp-2">
            {work.caption}
          </p>
        )}
      </div>
    </div>
  );
}

function WorkSection({ works }: { works: WorkWithDetails[] }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-semibold dark:text-white text-zinc-900 text-sm">
            Мои работы
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Лента портфолио с фото и видео
          </p>
        </div>
        <Link
          href={PAGES.WORKS}
          className="text-xs text-[#14a800] hover:underline font-medium"
        >
          Перейти ко всем работам
        </Link>
      </div>

      {works.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 p-8 text-center">
          <div className="text-4xl mb-3">🖼️</div>

          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Работы пока не добавлены
          </p>

          <p className="text-xs text-zinc-400 mt-1">
            Опубликуйте первый пост и заполните свой профиль
          </p>

          <Link
            href={PAGES.WORKS}
            className="inline-flex mt-4 items-center justify-center rounded-lg bg-[#14a800] px-4 py-2 text-sm font-semibold text-white hover:bg-[#108a00] transition-colors"
          >
            Разместить работу
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {works.slice(0, 6).map((work) => (
              <WorkMediaThumb key={work.id} work={work} />
            ))}
          </div>

          {works.length > 6 && (
            <p className="text-xs text-zinc-400 mt-3">
              Еще {works.length - 6} работ
            </p>
          )}
        </>
      )}
    </div>
  );
}

export function ProfileClient({ profile }: { profile: MasterProfilePageData }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    bio: profile?.bio ?? "",
    title: profile?.title ?? "",
    city: profile?.city ?? "",
    hourlyRate: profile?.hourlyRate ? String(profile.hourlyRate) : "",
    minBudget: profile?.minBudget ? String(profile.minBudget) : "",
    skills: profile?.skills.join(", ") ?? "",
  });
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    try {
      await updateProfile({
        bio: form.bio,
        title: form.title,
        city: form.city,
        hourlyRate: form.hourlyRate ? parseFloat(form.hourlyRate) : undefined,
        minBudget: form.minBudget ? parseFloat(form.minBudget) : undefined,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setEditing(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        <p className="text-zinc-400">Не удалось загрузить профиль</p>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#14a800] to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold dark:text-white text-zinc-900">{profile.name || "Без имени"}</h1>
                {profile.isVerified && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                    ✓ Проверен
                  </span>
                )}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                {profile.title || "Специалист"} · {profile.city}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <StarRating count={Math.round(profile.stats.avgRating)} />
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 ml-1">{profile.stats.avgRating}</span>
                  <span className="text-xs text-zinc-400">({profile.stats.reviewsCount} отзывов)</span>
                </div>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                  {profile.stats.worksCount} {profile.stats.worksCount === 1 ? "работа" : "работ"} в портфолио
                </span>
              </div>
            </div>
          </div>

          {editing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(false)}
                className="text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 px-4 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#14a800] hover:bg-[#108a00] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#14a800] hover:bg-[#108a00] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Редактировать
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          {[
            { value: String(profile.stats.completedJobs), label: "Выполнено" },
            { value: profile.stats.avgRating > 0 ? `${profile.stats.avgRating}/5` : "—", label: "Рейтинг" },
            { value: profile.stats.yearsOnPlatform, label: "На платформе" },
            { value: String(profile.stats.worksCount), label: "Работы" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-[#14a800]">{s.value}</div>
              <div className="text-xs text-zinc-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-3 text-sm">О себе</h2>
            {editing ? (
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                className="w-full text-sm border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800]/40 resize-none"
                placeholder="Расскажите о себе..."
              />
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {profile.bio || "Не указано"}
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-3 text-sm">Навыки</h2>
            {editing ? (
              <input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className="w-full text-sm border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800]/40"
                placeholder="Next.js, React, TypeScript..."
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.length > 0 ? (
                  profile.skills.map((s) => (
                    <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-zinc-400">Не указано</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-3 text-sm">Стоимость</h2>
            {editing ? (
              <div className="space-y-2">
                <input
                  type="number"
                  value={form.hourlyRate}
                  onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                  placeholder="Почасовая (сум)"
                  className="w-full text-sm border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800]/40"
                />
                <input
                  type="number"
                  value={form.minBudget}
                  onChange={(e) => setForm({ ...form, minBudget: e.target.value })}
                  placeholder="Мин. проект (сум)"
                  className="w-full text-sm border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800]/40"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Почасовая:</span>
                  <span className="font-medium dark:text-white text-zinc-900">
                    {profile.hourlyRate ? `${profile.hourlyRate.toLocaleString()} сум / час` : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Мин. проект:</span>
                  <span className="font-medium dark:text-white text-zinc-900">
                    {profile.minBudget ? `${profile.minBudget.toLocaleString()} сум` : "—"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold dark:text-white text-zinc-900 text-sm">Портфолио</h2>
              <button className="text-xs text-[#14a800] hover:underline">+ Добавить</button>
            </div>
            {profile.portfolio.length === 0 ? (
              <p className="text-xs text-zinc-400">Нет работ в портфолио</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {profile.portfolio.map((p) => (
                  <div key={p.id} className="border border-zinc-100 dark:border-zinc-700 rounded-lg p-4 hover:border-[#14a800]/40 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">🖼️</div>
                    <p className="text-sm font-medium dark:text-white text-zinc-900">{p.title}</p>
                    {p.category && <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <WorkSection works={profile.works} />

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold dark:text-white text-zinc-900 mb-4 text-sm">Последние отзывы</h2>
            {profile.reviews.length === 0 ? (
              <p className="text-xs text-zinc-400">Нет отзывов</p>
            ) : (
              <div className="space-y-4">
                {profile.reviews.map((r) => (
                  <div key={r.id} className="pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white text-zinc-900">{r.name}</span>
                      <span className="text-xs text-zinc-400">{r.date}</span>
                    </div>
                    <StarRating count={r.rating} />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
