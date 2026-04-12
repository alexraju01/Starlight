'use client';

import clsx from 'clsx';
import { Volume2, VolumeX } from 'lucide-react';

import Icons from '@/utils/icons';

interface ActionButtonsProps {
  onWatchTrailer: () => void;
  isLoading: boolean;
  isTrailerActive: boolean;
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
}

export default function ActionButtons({
  onWatchTrailer,
  isLoading,
  isTrailerActive,
  isMuted,
  onToggleMute,
}: ActionButtonsProps) {
  return (
    <div className="relative mb-9 flex w-full flex-row items-center justify-start gap-[13px] sm:mb-[7px] md:mb-[47px]">
      {/* Primary Button */}
      <div className="group relative flex w-full items-center justify-center sm:w-fit">
        <button
          onClick={onWatchTrailer}
          disabled={isLoading}
          className={clsx(
            'flex h-[50px] w-[220px] flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 text-[17.14px] transition-all duration-300 sm:h-[59px] sm:text-[20px]',
            isTrailerActive
              ? 'border border-white/20 bg-black/80 text-white shadow-lg hover:bg-[#9E221A]'
              : 'sm:bg-primary bg-white text-white hover:bg-[#9E221A]',
            isLoading && 'cursor-not-allowed opacity-40',
          )}
        >
          <div className="flex items-center justify-center">
            {isLoading ? (
              <span className="animate-spin">◌</span>
            ) : isTrailerActive ? (
              <span>✕</span>
            ) : (
              <span>{Icons.play}</span>
            )}
          </div>

          <span className="min-w-40 tracking-wide whitespace-nowrap">
            {isLoading ? 'Loading trailer ...' : isTrailerActive ? 'Stop Trailer' : 'Watch Trailer'}
          </span>
        </button>
      </div>

      {/* Secondary Buttons */}
      {/* Secondary Buttons */}
      <div className="flex gap-2.5 opacity-100 transition-all duration-500 ease-in-out">
        <div className="hidden items-center gap-2.5 sm:flex">
          <button
            onClick={onToggleMute}
            className={clsx(
              'flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded-[4.72px] border border-solid bg-[#100F10] transition-all duration-300 sm:h-[56px] sm:w-[56px] sm:rounded-[5.33px]',
              isTrailerActive
                ? 'hover:border-card-stroke border-transparent'
                : 'border-card-stroke',
            )}
          >
            {isMuted ? (
              <VolumeX size={30} />
            ) : (
              <svg
                width="26"
                height="24"
                viewBox="0 0 26 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2997 4.57529C25.4002 8.6758 25.4002 15.324 21.2997 19.4245M18.2064 7.66898C20.5984 10.0609 20.5984 13.9391 18.2064 16.331M6.875 7.62498L12.3813 2.11869C12.9325 1.56747 13.875 1.95787 13.875 2.73741V21.2625C13.875 22.0421 12.9325 22.4325 12.3813 21.8813L6.875 16.375H4.26056C3.23466 16.375 2.27356 15.7841 2.0011 14.795C1.75595 13.9051 1.625 12.9678 1.625 12C1.625 11.0321 1.75595 10.0949 2.0011 9.20492C2.27356 8.21586 3.23466 7.62498 4.26056 7.62498H6.875Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
