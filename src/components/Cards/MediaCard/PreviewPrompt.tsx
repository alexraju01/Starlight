import Link from 'next/link';

import { buttonClass } from '@/components/ui/buttonStyles';
import { ROUTES } from '@/constants/route';

const COMPACT = 'h-[36px] gap-[6px] px-[14px] text-[13px]';

interface Props {
  onAllow: (e: React.MouseEvent) => void;
  onDecline: (e: React.MouseEvent) => void;
}

/** Asked on the first hover preview: trailers come from YouTube, which may store data. */
export default function PreviewPrompt({ onAllow, onDecline }: Props) {
  return (
    <div className="animate-fadeIn absolute inset-0 z-[55] flex flex-col items-center justify-center gap-[10px] bg-black/75 px-[16px] text-center backdrop-blur-sm">
      <p className="text-[15px] font-semibold text-white">Play trailer previews?</p>
      <p className="max-w-[36ch] text-[12px] leading-[1.5] text-white/70">
        Trailers play from YouTube, which may store data on your device.{' '}
        <Link
          href={ROUTES.PRIVACY}
          onClick={(e) => e.stopPropagation()}
          className="text-white/90 underline underline-offset-2 hover:text-white"
        >
          Privacy
        </Link>
      </p>
      <div className="mt-[2px] flex gap-[8px]">
        <button type="button" onClick={onAllow} className={buttonClass('primary', null, COMPACT)}>
          Play previews
        </button>
        <button type="button" onClick={onDecline} className={buttonClass('ghost', null, COMPACT)}>
          No thanks
        </button>
      </div>
    </div>
  );
}
