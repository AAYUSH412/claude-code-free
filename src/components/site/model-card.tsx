"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ModelCardProps {
name: string;
nimId: string;
provider: string;
logoName: string;
size: string;
speed: string;
coding: string;
bestFor: string;
category?: string;
}

export function ModelCard({ model, delay = 0 }: { model: ModelCardProps; delay?: number }) {
// Map provider names to local logo files in /public/Ai logos/
const logoMap: Record<string, string> = {
"NVIDIA": "/Ai logos/nvidia-color.svg",
"Meta": "/Ai logos/meta-color.svg",
"Google": "/Ai logos/gemma-color.svg",
"Qwen": "/Ai logos/qwen-color.svg",
"Mistral": "/Ai logos/mistral-color.svg",
"Zhipu": "/Ai logos/zai.svg",
"Moonshot AI": "/Ai logos/moonshot.svg",
"DeepSeek": "/Ai logos/deepseek-color.svg",
"MiniMax": "/Ai logos/minimax-color.svg",
"Black Forest": "/Ai logos/black_forest.svg",
};

const iconUrl = logoMap[model.provider] || null;

return (
<motion.article
initial={{ opacity: 0, y: 15 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "0px 0px -50px 0px" }}
transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} // ease-out-quint
className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-black/20"
tabIndex={0}
role="article"
aria-label={`Model: ${model.name} by ${model.provider}`}
>
<div className="relative z-10 flex flex-col h-full gap-5">
<div className="flex items-start justify-between">
<div className="flex items-center gap-4">
<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black/5 border border-black/5 p-2 shadow-inner">
{iconUrl ? (
<Image
src={iconUrl}
alt=""
width={28}
height={28}
className="h-7 w-7 object-contain"
onError={(e) => {
(e.target as HTMLImageElement).style.display = 'none';
const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
if (fallback) {
fallback.style.display = 'flex';
fallback.classList.add('visible');
}
}}
/>
) : null}
<span
className="hidden font-mono text-sm font-bold text-black/50 items-center justify-center w-full h-full"
style={{ display: 'none' }}
>
{model.provider.charAt(0)}
</span>
</div>
<div>
<p className="font-mono text-[10px] font-semibold text-black/40 tracking-[0.15em] uppercase">{model.provider}</p>
<h3 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">{model.name}</h3>
</div>
</div>
{model.category && (
<span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100/50">
{model.category}
</span>
)}
</div>

<div className="flex flex-col gap-1.5 mt-auto pt-2">
<p className="text-[10px] font-semibold text-black/40 uppercase tracking-[0.1em]">NIM API Target</p>
<code className="rounded bg-black/5 px-2.5 py-1.5 font-mono text-xs text-black/70 border border-transparent transition-colors group-hover:bg-white group-hover:border-black/10 group-hover:text-black">
{model.nimId}
</code>
</div>

<div className="grid grid-cols-2 gap-4 mt-2 mb-4">
<div className="space-y-1">
<p className="text-[10px] font-semibold text-black/40 uppercase tracking-[0.1em]">Performance</p>
<p className="text-sm font-medium text-[#1a1a1a]">{model.speed}</p>
</div>
<div className="space-y-1">
<p className="text-[10px] font-semibold text-black/40 uppercase tracking-[0.1em]">Coding Rating</p>
<p className="text-sm tracking-widest text-[#1a1a1a]">{model.coding}</p>
</div>
</div>

<div className="mt-auto space-y-1 border-t border-black/5 pt-4">
<p className="text-sm text-black/70 leading-relaxed">
<span className="font-semibold text-black/90">Ideal use case: </span>
{model.bestFor}
</p>
</div>
</div>
</motion.article>
);
}
