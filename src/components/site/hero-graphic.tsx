"use client";

import { motion } from "framer-motion";

export function HeroGraphic() {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-black/5 bg-white/40 p-1 md:p-2 mt-8 lg:mt-0 aspect-video lg:aspect-square flex flex-col justify-center shadow-xl shadow-black/[0.03] backdrop-blur-md">
      
      {/* Decorative Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" 
        style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }}
      />
      
      {/* Glow Behind Terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-500/10 rounded-[4rem] blur-3xl opacity-50" />

      {/* Mock Terminal Window */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // ease-out-expo
        className="relative z-10 mx-auto w-[90%] md:w-[80%] overflow-hidden rounded-xl border border-black/10 bg-[#fafafa] shadow-2xl flex flex-col"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <p className="ml-2 font-mono text-[10px] font-medium tracking-widest text-[#999999]">~ /claude-code</p>
        </div>
        
        {/* Terminal Body */}
        <div className="flex flex-col gap-3 p-5 font-mono text-[13px] leading-relaxed text-[#1a1a1a]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <span className="text-[#2d55ff]">❯</span> claude-nim
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="text-[#666666]"
          >
            Starting LiteLLM proxy...
            <br />
            NVIDIA NIM API responding.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="rounded bg-black/5 p-3 text-[#1a1a1a]"
          >
            <span className="text-[#00d4aa] font-semibold">Claude Code via Llama 3.1 405B loaded</span>
            <br />
            Ready for your tasks.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.3 }}
          >
            <span className="text-[#2d55ff]">❯</span> <span className="text-[#999] opacity-50 relative after:content-[''] after:absolute after:w-1.5 after:h-4 after:bg-[#2d55ff] after:ml-0.5 after:animate-[pulse_1s_infinite]">|</span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Floating Status Badges */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        className="absolute -left-2 top-[30%] hidden md:flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-lg"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4aa] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4aa]"></span>
        </span>
        <span className="text-xs font-semibold tracking-wide text-black/70">Proxy Active</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
        className="absolute -right-4 bottom-[25%] hidden md:flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-lg"
      >
        <span className="text-xs font-semibold tracking-wide text-[#2d55ff]">Free execution</span>
      </motion.div>
    </div>
  );
}
