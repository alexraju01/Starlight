'use client';

import { useState } from 'react';

import { SegmentedButtons } from '@/components/ui/Segmented';
import { usePreferences } from '@/hooks/useLibrary';
import { myList, recentlyViewed, setHistoryEnabled } from '@/utils/library';
import { preferences } from '@/utils/preferences';

type Choice = 'on' | 'off' | 'unset';

const toChoice = (value: boolean | undefined): Choice =>
  value === undefined ? 'unset' : value ? 'on' : 'off';

const ON_OFF = [
  { value: 'on' as const, label: 'On' },
  { value: 'off' as const, label: 'Off' },
];

function Setting({
  title,
  children,
  value,
  onChange,
}: {
  title: string;
  children: React.ReactNode;
  value: Choice;
  onChange: (on: boolean) => void;
}) {
  return (
    <div className="border-card-stroke flex flex-col gap-[12px] border-b border-solid py-[20px] sm:flex-row sm:items-center sm:justify-between sm:gap-[32px]">
      <div className="flex flex-col gap-[4px]">
        <h3 className="text-[16px] font-semibold text-white">{title}</h3>
        <p className="max-w-[60ch] text-[14px] leading-[1.6] text-white/60">{children}</p>
      </div>
      <SegmentedButtons
        label={title}
        size="sm"
        value={value}
        onChange={(v) => onChange(v === 'on')}
        options={ON_OFF}
      />
    </div>
  );
}

/** The visitor's choices for what this site stores in their browser, and a way to wipe it. */
export default function PrivacySettings() {
  const prefs = usePreferences();
  const [cleared, setCleared] = useState(false);

  const clearAll = () => {
    if (!window.confirm('Delete My List, recently viewed and your choices from this browser?'))
      return;
    myList.forget();
    recentlyViewed.forget();
    preferences.reset();
    setCleared(true);
  };

  return (
    <div className="border-card-stroke bg-panel rounded-[16px] border border-solid px-[20px] lg:px-[24px]">
      <div>
        <Setting
          title="Remember recently viewed"
          value={toChoice(prefs?.history)}
          onChange={setHistoryEnabled}
        >
          Keeps the titles you open on this device, for the Recently viewed and “Because you looked
          at” rows on the home page. Turning it off deletes them.
        </Setting>
        <Setting
          title="Trailer previews"
          value={toChoice(prefs?.trailerPreviews)}
          onChange={(on) => preferences.set({ trailerPreviews: on })}
        >
          Plays a muted YouTube trailer when you hover over a title. YouTube may store data on your
          device when a trailer plays.
        </Setting>
      </div>
      <div className="flex flex-col gap-[8px] py-[20px] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] text-white/60" role="status">
          {cleared ? 'Done – nothing from StarLight is stored in this browser now.' : null}
        </p>
        <button
          type="button"
          onClick={clearAll}
          className="self-start text-[14px] font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white sm:self-auto"
        >
          Delete everything stored in this browser
        </button>
      </div>
    </div>
  );
}
