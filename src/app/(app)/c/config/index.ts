import { getDashboardStats } from "@/actions/job.actions";
import { PAGES } from "@/config/pages.config";
import {
    Search,
    MessageCircle,
    User,
    Bookmark,
    ClipboardList,
    Eye,
    CheckCircle2,
} from "lucide-react";

const data = await getDashboardStats();

export const quickActions = [
    {
        href: PAGES.FIND_WORK,
        label: "Найти работу",
        icon: Search,
        desc: "Просмотреть новые заказы",
    },
    {
        href: PAGES.MESSAGES,
        label: "Сообщения",
        icon: MessageCircle,
        desc: "Чат с клиентами",
    },
    {
        href: PAGES.PROFILE,
        label: "Профиль",
        icon: User,
        desc: "Редактировать анкету",
    },
    {
        href: PAGES.SAVED_JOBS,
        label: "Сохранённые",
        icon: Bookmark,
        desc: "Заказы в закладках",
    },
];

export const stats = [
    {
        label: "Активных заказов",
        value: String(data.activeJobs),
        icon: ClipboardList,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
        label: "Новых сообщений",
        value: String(data.newMessages),
        icon: MessageCircle,
        color: "text-green-600 bg-green-50 dark:bg-green-900/20",
    },
    {
        label: "Просмотров профиля",
        value: String(data.profileViews),
        icon: Eye,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    },
    {
        label: "Выполнено заказов",
        value: String(data.completedJobs),
        icon: CheckCircle2,
        color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
];