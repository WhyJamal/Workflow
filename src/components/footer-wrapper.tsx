"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import { PAGES } from "@/config/pages.config";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooterRoutes = [PAGES.MESSAGES, PAGES.PROFILE, PAGES.SAVED_JOBS, PAGES.MY_JOBS, PAGES.FIND_WORK];

  if (hideFooterRoutes.includes(pathname)) return null;

  return <Footer />;
}