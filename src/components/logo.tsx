"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  isLandingPage?: boolean;
}

export function Logo({ isLandingPage = false }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/logos/logo.green.jpg"
        alt="logo"
        width={40}
        height={40}
      />
    );
  }

  let src = "/logos/logo.green.jpg";

  if (isLandingPage) {
    src = "/logos/logo.white.png";
  } else {
    src =
      resolvedTheme === "dark"
        ? "/logos/logo.white.png"
        : "/logos/logo.green.jpg";
  }

  return (
    <Image
      src={src}
      alt="logo"
      width={40}
      height={40}
    />
  );
}