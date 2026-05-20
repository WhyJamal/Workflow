import { NavItem } from "@/types/header.type";
import { PAGES } from "./pages.config";

type UserRole = "CLIENT" | "MASTER";

export function getNavItems(role?: UserRole): NavItem[] {
  if (role === "CLIENT") {
    return [
      {
        title: "Заказы",
        items: [
          { label: "Разместить заказ", href: PAGES.CLIENT_POST_JOB },
          { label: "Мои заказы", href: PAGES.CLIENT_MY_JOBS },
        ],
      },
      {
        title: "Найти мастеров",
        link: PAGES.CLIENT_FIND_MASTERS,
      },
      {
        title: "Сообщения",
        link: PAGES.CLIENT_MESSAGES,
      },
    ];
  }

  // MASTER default
  return [
    {
      title: "Найти работу",
      items: [
        { label: "Все вакансии", href: PAGES.FIND_WORK },
        { label: "Сохранённые", href: PAGES.SAVED_JOBS },
      ],
    },
    {
      title: "Мои вакансии",
      link: PAGES.MY_JOBS,
    },
    {
      title: "Сообщения",
      link: PAGES.MESSAGES,
    },
  ];
}