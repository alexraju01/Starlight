import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { ROUTES } from '@/constants/route';
import { SITE_NAME, SITE_URL } from '@/constants/site';
import { Person } from '@/types';

import { api } from './api';
import { getImageUrl } from './image/getImageUrl';
import { parseMediaId } from './mediaPage';
import { truncate } from './stringUtils';

import type { Metadata } from 'next';

/** Loads a person for `/person/[slug]`, or renders the 404 page. Shared by metadata and page. */
export const getPersonOrNotFound = cache(async (slug: string): Promise<Person> => {
  const id = parseMediaId(slug);
  if (!id) notFound();
  const person = await api.person.get(id);
  if (!person) notFound();
  return person;
});

export function buildPersonMetadata(person: Person): Metadata {
  // Worded the way people search: "<name> movies", "<name> tv shows".
  const title = `${person.name} – Movies, TV Shows & Biography`;
  const knownFor = person.knownFor
    .slice(0, 3)
    .map((c) => c.title)
    .join(', ');
  const lead = knownFor
    ? `${person.name}'s movies and TV shows, including ${knownFor}.`
    : `${person.name}'s movies and TV shows.`;
  const description = truncate(
    person.biography
      ? `${lead} ${person.biography}`
      : `${lead} Biography and filmography on ${SITE_NAME}.`,
    160,
  );
  const canonical = ROUTES.PERSON(person.id, person.name);
  const image = getImageUrl(person.profilePath, 'profile', 'h632');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'profile',
      images: image ? [{ url: image, alt: person.name }] : undefined,
    },
    twitter: { card: 'summary', title, description, images: image ? [image] : undefined },
  };
}

/** schema.org Person structured data. */
export function buildPersonJsonLd(person: Person) {
  const sameAs = Object.values(person.links).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: `${SITE_URL}${ROUTES.PERSON(person.id, person.name)}`,
    image: getImageUrl(person.profilePath, 'profile', 'h632') || undefined,
    description: person.biography ? truncate(person.biography, 300) : undefined,
    birthDate: person.birthday ?? undefined,
    deathDate: person.deathday ?? undefined,
    birthPlace: person.placeOfBirth ?? undefined,
    alternateName: person.alsoKnownAs.length ? person.alsoKnownAs.slice(0, 5) : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}
