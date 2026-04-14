"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.documentElement.scrollHeight - window.innerHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/5">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
