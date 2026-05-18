import { NavItem } from "@/types/header.type";
import { PAGES } from "./pages.config";

export const NAV_ITEMS: NavItem[] = [
    {
        title: "Найти работу",
        items: [
            { label: "Все вакансии", href: PAGES.FIND_WORK },
            { label: "Сохранённые", href: PAGES.SAVED_JOBS },
        ]
    },
    {
        title: "Мои вакансии",
        link: PAGES.MY_JOBS
    },
    {
        title: "Сообщения",
        link: PAGES.MESSAGES
    },
]