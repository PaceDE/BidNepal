"use client";

import { motion} from "motion/react";
import { usePathname } from "next/navigation";

export default function PageAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
      <motion.main
        key={pathname}
        initial={{ opacity: 0.5}}
        animate={{ opacity: 1}}
        // exit={{ opacity: 0}}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.main>
   
  );
}