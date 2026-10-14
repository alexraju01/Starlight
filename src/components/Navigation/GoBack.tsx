'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { hasInAppHistory } from '@/hooks/useInAppHistory';

export default function GoBack({ className = '' }: { className?: string }) {
  const router = useRouter();

  const handleBack = () => {
    // Visitors arriving from Google / a shared link have no in-app history:
    // `router.back()` would take them off the site, so send them home instead.
    if (hasInAppHistory()) router.back();
    else router.push('/');
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className={`flex size-[44px] items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70 ${className}`}
    >
      <ArrowLeft aria-hidden="true" className="size-[20px]" />
    </button>
  );
}
