"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postJob } from "@/actions/client.actions";
import { Input } from "@/components/ui/input";
import { PAGES } from "@/config/pages.config";

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim() || !form.deadline.trim()) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setLoading(true);
    try {
      const result = await postJob({
        title: form.title,
        description: form.description,
        budget: form.budget || `${form.budgetMin}–${form.budgetMax} сум`,
        budgetMin: form.budgetMin ? +form.budgetMin : undefined,
        budgetMax: form.budgetMax ? +form.budgetMax : undefined,
        deadline: form.deadline,
      });
      if (result.success) {
        router.push(PAGES.JOB(result.jobId));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ошибка при размещении заказа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">
          Разместить заказ
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Опишите задачу — мастера сами предложат свои услуги
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-zinc-900 dark:text-white text-sm">
            Основная информация
          </h2>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Название заказа <span className="text-red-500">*</span>
            </label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Например: Установка кондиционера на 2 комнаты"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Описание <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Подробно опишите задачу: что нужно сделать, какие материалы есть, особые условия..."
              rows={5}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2.5 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#14a800]/40 focus:border-[#14a800] resize-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-zinc-900 dark:text-white text-sm">
            Бюджет и сроки
          </h2>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Бюджет (текстом)
            </label>
            <Input
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
              placeholder="Например: 200 000 – 500 000 сум"
            />
            <p className="text-xs text-zinc-400 mt-1">
              Или укажите диапазон ниже
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                От (сум)
              </label>
              <Input
                type="number"
                value={form.budgetMin}
                onChange={(e) => set("budgetMin", e.target.value)}
                placeholder="100 000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                До (сум)
              </label>
              <Input
                type="number"
                value={form.budgetMax}
                onChange={(e) => set("budgetMax", e.target.value)}
                placeholder="500 000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Срок выполнения <span className="text-red-500">*</span>
            </label>
            <Input
              value={form.deadline}
              onChange={(e) => set("deadline", e.target.value)}
              placeholder="Например: 3 дня, до 25 мая, в течение недели"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-5 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#14a800] hover:bg-[#108a00] disabled:opacity-60 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            {loading ? "Размещаем..." : "Разместить заказ"}
          </button>
        </div>
      </form>
    </div>
  );
}
