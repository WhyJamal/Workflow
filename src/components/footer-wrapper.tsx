"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import { PAGES } from "@/config/pages.config";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooterRoutes = [
    PAGES.MESSAGES, PAGES.PROFILE, PAGES.SAVED_JOBS, 
    PAGES.MY_JOBS, PAGES.FIND_WORK, PAGES.CLIENT_MESSAGES, 
    PAGES.CLIENT_MY_JOBS, PAGES.CLIENT_FIND_MASTERS, PAGES.CLIENT_POST_JOB,
  ];

  const shouldHideFooter =
    hideFooterRoutes.includes(pathname) ||
    pathname.startsWith("/cl/my-jobs/");

  if (shouldHideFooter) return null;

  return <Footer />;
}