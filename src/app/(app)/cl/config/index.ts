import { getClientDashboard } from "@/actions/client.actions";
import { PAGES } from "@/config/pages.config";
import {
    ClipboardList,
    Circle,
    Mail,
    CheckCircle2,
    Plus,
    Search,
    MessageCircle,
} from "lucide-react";

const data = await getClientDashboard();

export const stats = [
    {
        label: "Всего заказов",
        value: String(data.totalJobs),
        icon: ClipboardList,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
        label: "Активных",
        value: String(data.activeJobs),
        icon: Circle,
        color: "text-green-600 bg-green-50 dark:bg-green-900/20",
    },
    {
        label: "Новых заявок",
        value: String(data.newApplications),
        icon: Mail,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    },
    {
        label: "Завершено",
        value: String(data.completedJobs),
        icon: CheckCircle2,
        color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
];

export const quickActions = [
    {
        href: PAGES.CLIENT_POST_JOB,
        icon: Plus,
        label: "Разместить заказ",
        desc: "Новое задание для мастера",
    },
    {
        href: PAGES.CLIENT_FIND_MASTERS,
        icon: Search,
        label: "Найти мастера",
        desc: "Просмотр профилей",
    },
    {
        href: PAGES.CLIENT_MY_JOBS,
        icon: ClipboardList,
        label: "Мои заказы",
        desc: "Управление заказами",
    },
    {
        href: PAGES.CLIENT_MESSAGES,
        icon: MessageCircle,
        label: "Сообщения",
        desc: "Чат с мастерами",
    },
];