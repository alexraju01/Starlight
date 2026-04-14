'use client';

import { useRouter } from 'next/navigation';

import Icons from '@/utils/icons';

export default function GoBack() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="relative top-32 left-8 flex h-16 w-16 cursor-pointer items-center justify-center text-[2.5rem]"
    >
      {Icons.goBack}
    </button>
  );
}
