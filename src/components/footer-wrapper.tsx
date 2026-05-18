"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import { PAGES } from "@/config/pages.config";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooterRoutes = [PAGES.MESSAGES];

  if (hideFooterRoutes.includes(pathname)) return null;

  return <Footer />;
}