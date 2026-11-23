import { Metadata } from 'next';
import Link from 'next/link';

import PageHeader from '@/components/Layout/PageHeader';
import PrivacySettings from '@/components/Library/PrivacySettings';
import SectionHeading from '@/components/Navigation/SectionHeading';
import { ROUTES } from '@/constants/route';
import { SITE_NAME } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `What ${SITE_NAME} stores in your browser, what it doesn’t, and your choices.`,
  alternates: { canonical: ROUTES.PRIVACY },
};

const UPDATED = '23 November 2026';

/** Where visitors can reach the person who runs the site (contact form on the portfolio). */
const CONTACT_URL = 'https://alexraju.co.uk/';

/** What's kept in the visitor's browser, by whom and why. */
const STORED = [
  {
    name: 'My List',
    what: 'The titles you save, with their poster, rating and year.',
    when: 'Only when you press “Add to My List”.',
  },
  {
    name: 'Recently viewed',
    what: 'The last 20 titles you opened.',
    when: 'Only if you choose to have them remembered. Otherwise they’re forgotten when you leave.',
  },
  {
    name: 'Your choices',
    what: 'Your answers to the settings above (recently viewed, trailer previews).',
    when: 'When you answer, so we don’t ask again.',
  },
  {
    name: 'YouTube',
    what: 'YouTube’s own data (set by YouTube, not us).',
    when: 'Only when a trailer plays: after you press “Watch trailer”, or on hover once you’ve allowed trailer previews.',
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-[16px]">
      <SectionHeading>{title}</SectionHeading>
      <div className="flex flex-col gap-[12px] text-[15px] leading-[1.7] text-white/70 lg:text-[16px]">
        {children}
      </div>
    </section>
  );
}

const linkClass = 'text-white underline underline-offset-4 hover:text-white/80';

export default function PrivacyPage() {
  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <PageHeader
        title="Privacy"
        description={`${SITE_NAME} has no accounts, no ads, no analytics and no cookies of its own. Here’s what is stored, and how to change it.`}
      />
      <div className="page-gutter flex max-w-[860px] flex-col gap-[40px] pt-[32px] lg:pt-[48px]">
        <Section title="Your settings">
          <PrivacySettings />
        </Section>

        <Section title="What’s stored in your browser">
          <p>
            Everything below lives in your browser’s storage on this device. We never receive it, it
            isn’t linked to you, and it doesn’t follow you to other devices.
          </p>
          <dl className="border-card-stroke bg-panel rounded-[16px] border border-solid">
            {STORED.map((item) => (
              <div
                key={item.name}
                className="border-card-stroke grid gap-[4px] border-b border-solid px-[20px] py-[16px] last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-[16px] lg:px-[24px]"
              >
                <dt className="font-semibold text-white">{item.name}</dt>
                <dd className="flex flex-col gap-[2px]">
                  <span>{item.what}</span>
                  <span className="text-[14px] text-white/50">{item.when}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p>
            You can delete it all with the button in your settings above, or by clearing this site’s
            data in your browser. To remove only saved titles, use{' '}
            <Link href={ROUTES.MY_LIST} className={linkClass}>
              My List
            </Link>
            .
          </p>
        </Section>

        <Section title="Other services">
          <p>
            <strong className="text-white">TMDB.</strong> Movie and TV information and images come
            from{' '}
            <a
              href="https://www.themoviedb.org/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              The Movie Database
            </a>
            . Your browser loads posters from their servers, which can see your IP address, as any
            website you visit can.
          </p>
          <p>
            <strong className="text-white">YouTube.</strong> Trailers are played with YouTube’s
            privacy-enhanced player. Once one plays, YouTube may store data on your device under{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Google’s privacy policy
            </a>
            . Turning trailer previews off stops new previews, but data YouTube already stored can
            only be cleared in your browser’s settings.
          </p>
          <p>
            <strong className="text-white">Hosting.</strong> The site runs on{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Vercel
            </a>
            , which keeps short-lived technical logs (such as IP addresses and pages requested) to
            run the service and keep it secure.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            {SITE_NAME} is an independent project. For questions about privacy or anything on this
            page, send a message through the contact section on{' '}
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              alexraju.co.uk
            </a>
            .
          </p>
        </Section>

        <p className="text-[14px] text-white/40">Last updated {UPDATED}.</p>
      </div>
    </div>
  );
}
