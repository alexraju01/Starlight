import { ExternalLink, MonitorPlay } from 'lucide-react';
import Image from 'next/image';

import SectionHeading from '@/components/Navigation/SectionHeading';
import { WatchKind, WatchOptions } from '@/types';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { providerSearchUrl } from '@/utils/watchLinks';

interface Props {
  title: string;
  options: WatchOptions | null;
  /** Country the options are for, e.g. "United Kingdom". */
  regionLabel: string;
}

const KIND_LABEL: Record<WatchKind, string> = {
  stream: 'Stream',
  free: 'Free',
  rent: 'Rent',
  buy: 'Buy',
};

/**
 * Streaming, free, rental and purchase options in the visitor's country. Each service opens
 * its own search for the title where we know one, otherwise the JustWatch page for it.
 */
export default function WhereToWatch({ title, options, regionLabel }: Props) {
  return (
    <section
      id="where-to-watch"
      aria-labelledby="where-to-watch-heading"
      className="scroll-mt-[calc(var(--nav-h)+24px)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[4px]">
        <SectionHeading id="where-to-watch-heading">Where to watch</SectionHeading>
        <p className="text-[13px] text-white/45">{regionLabel}</p>
      </div>

      {options ? (
        <div className="mt-[20px] flex flex-col gap-[16px]">
          {options.groups.map(({ kind, providers }) => (
            <div
              key={kind}
              className="grid gap-[10px] sm:grid-cols-[64px_minmax(0,1fr)] sm:items-center"
            >
              <h3 className="text-[12px] font-semibold tracking-[0.08em] text-white/45 uppercase">
                {KIND_LABEL[kind]}
              </h3>
              <ul className="flex flex-wrap gap-[8px]">
                {providers.map((provider) => (
                  <li key={provider.id}>
                    <a
                      href={providerSearchUrl(provider.name, title) ?? options.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${KIND_LABEL[kind]} ${title} on ${provider.name} (opens in a new tab)`}
                      className="flex h-[44px] items-center gap-[10px] rounded-full border border-white/10 bg-white/[0.04] py-[4px] pr-[16px] pl-[4px] transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      <Image
                        src={getImageUrl(provider.logoPath, 'logo', 'w92')}
                        alt=""
                        width={36}
                        height={36}
                        className="size-[36px] rounded-full object-cover"
                      />
                      <span className="text-[14px] font-medium text-white/90">{provider.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[20px] flex items-center gap-[14px] rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-[16px]">
          <MonitorPlay aria-hidden="true" className="size-[22px] shrink-0 text-white/45" />
          <p className="text-[14px] leading-[1.5] text-white/65">
            {title} isn’t available to stream, rent or buy in your country right now.
          </p>
        </div>
      )}

      {/* Attribution required by TMDB's terms for this data. */}
      <p className="mt-[14px] flex items-center gap-[6px] text-[12px] text-white/40">
        Availability from{' '}
        <a
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white/60 underline decoration-white/20 underline-offset-2 hover:text-white"
        >
          JustWatch
        </a>
        {options && (
          <>
            {' · '}
            <a
              href={options.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[4px] font-medium text-white/60 hover:text-white"
            >
              All options
              <ExternalLink aria-hidden="true" className="size-[12px]" />
            </a>
          </>
        )}
      </p>
    </section>
  );
}
