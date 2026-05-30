"use client";

import { m } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
      <m.main
        key={pathname}
        initial={{ opacity: 0.5}}
        animate={{ opacity: 1}}
        className="animated-element"
        transition={{ duration: 0.25 }}
      >
        {children}
      </m.main>
   
  );
}