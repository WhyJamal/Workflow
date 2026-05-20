import Link from "next/link";
import { getJobApplications } from "@/actions/client.actions";
import { notFound } from "next/navigation";
import { ApplicationActions } from "./application-actions";
import { StartChatButton } from "@/components/start-chat-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/get-user-initials";
import type { TJobApplicationCard } from "@/types/ui.type";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  const { job, applications } = await getJobApplications(jobId);

  if (!job) notFound();

  const statusLabel: Record<string, string> = {
    PENDING: "Ожидает",
    ACCEPTED: "Принят ✓",
    REJECTED: "Отклонён",
  };

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    ACCEPTED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    REJECTED: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
  };

  const hasAccepted = applications.some((a: TJobApplicationCard) => a.status === "ACCEPTED");

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          href="/cl/my-jobs"
          className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1 mb-4"
        >
          ← Назад к заказам
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold dark:text-white text-zinc-900 mb-1">
              {job.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap text-sm text-zinc-500 dark:text-zinc-400">
              <span>{job.category}</span>
              <span>·</span>
              <span className="text-[#14a800] font-medium">{job.budget}</span>
              <span>·</span>
              <span>Срок: {job.deadline}</span>
            </div>
          </div>
          {job.status === "OPEN" && (
            <Link
              href="/cl/post-job"
              className="text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#14a800] hover:text-[#14a800] px-4 py-2 rounded-lg transition-colors"
            >
              + Новый заказ
            </Link>
          )}
        </div>
      </div>

      {/* Applications */}
      <div>
        <h2 className="text-lg font-semibold dark:text-white text-zinc-900 mb-4">
          Заявки ({applications.length})
        </h2>

        {applications.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-1">
              Пока нет заявок
            </p>
            <p className="text-zinc-400 text-sm">
              Мастера скоро откликнутся на ваш заказ
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((a: TJobApplicationCard) => (
              <div
                key={a.id}
                className={`bg-white dark:bg-zinc-900 border rounded-xl p-6 transition-all ${a.status === "ACCEPTED"
                  ? "border-[#14a800]/40 shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={a.master.image ?? ""} alt={a.master.name ?? "User"} />
                    <AvatarFallback>{getUserInitials(a.master)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold dark:text-white text-zinc-900">
                            {a.master.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[a.status]}`}
                          >
                            {statusLabel[a.status]}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {a.master.title} · {a.master.city}
                        </p>
                      </div>

                      <div className="text-right">
                        {a.proposedPrice && (
                          <p className="text-[#14a800] font-semibold text-sm">
                            {a.proposedPrice}
                          </p>
                        )}
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <span className="text-amber-400">★</span>
                          <span className="text-sm text-zinc-600 dark:text-zinc-300">
                            {a.master.rating}
                          </span>
                          <span className="text-xs text-zinc-400">
                            ({a.master.reviewsCount} отзывов)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    {a.master.skills.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mb-3">
                        {a.master.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Cover letter */}
                    {a.coverLetter && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 rounded-lg px-3 py-2.5 mb-3">
                        {a.coverLetter}
                      </p>
                    )}

                    {/* Actions */}
                    {a.status === "PENDING" && !hasAccepted && (
                      <ApplicationActions
                        applicationId={a.id}
                        jobId={job.id}
                        jobStatus={job.status}
                      />
                    )}

                    {a.status === "ACCEPTED" && (
                      <div className="flex gap-2 flex-wrap">
                        <StartChatButton
                          otherUserId={a.master.id}
                          jobId={job.id}
                          redirectBase="/cl/messages"
                          label="💬 Написать мастеру"
                          className="text-sm bg-[#14a800] hover:bg-[#108a00] text-white px-4 py-2 rounded-lg transition-colors font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
