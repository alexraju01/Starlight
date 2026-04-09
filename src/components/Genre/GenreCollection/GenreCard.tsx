'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaQuestionCircle } from 'react-icons/fa';

import { ROUTES } from '@/constants/route';

interface GenreCardProps {
  name: string;
  index: number;
  icon?: React.ReactNode;
}

export default function GenreCard({ name, index, icon }: GenreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={ROUTES.GENRE(name)}
        className="group relative flex h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/5 bg-[#111] p-6 text-center transition-all hover:border-red-600/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-600/0 opacity-0 transition-opacity duration-500 group-hover:from-red-600/10 group-hover:opacity-100" />

        <span className="relative z-10 text-3xl text-slate-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-red-600">
          {icon ?? <FaQuestionCircle />}
        </span>

        <div className="relative z-10">
          <h3 className="text-lg font-medium tracking-wide text-slate-200 group-hover:text-white">
            {name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-tighter text-slate-500 group-hover:text-red-500/80">
            View Collection
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
      </Link>
    </motion.div>
  );
}
