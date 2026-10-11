'use client';

import { useRouter } from 'next/navigation';

import { hasInAppHistory } from '@/hooks/useInAppHistory';
import Icons from '@/utils/icons';

export default function GoBack() {
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
      className="relative top-32 left-8 z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-black/30 text-[2.5rem] backdrop-blur-sm transition-colors hover:bg-black/60"
    >
      <span aria-hidden="true">{Icons.goBack}</span>
    </button>
  );
}
