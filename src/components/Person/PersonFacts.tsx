import SectionHeading from '@/components/Navigation/SectionHeading';
import { Person } from '@/types';
import { formatFullDate, roleLabel } from '@/utils/format';

/** "Personal details" card beside the filmography. Unknown values are left out. */
export default function PersonFacts({ person }: { person: Person }) {
  const facts = [
    ['Known for', roleLabel(person.knownForDepartment)],
    ['Born', formatFullDate(person.birthday)],
    ['Died', formatFullDate(person.deathday)],
    ['Place of birth', person.placeOfBirth],
    ['Also known as', person.alsoKnownAs.slice(0, 3).join(', ') || null],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  if (facts.length === 0) return null;

  return (
    <section
      aria-labelledby="person-details-heading"
      className="border-card-stroke bg-panel rounded-[16px] border p-[20px] lg:p-[24px]"
    >
      <SectionHeading id="person-details-heading">Personal details</SectionHeading>
      <dl className="mt-[20px] grid grid-cols-2 gap-x-[16px] gap-y-[18px] sm:grid-cols-3 sm:gap-x-[24px] lg:grid-cols-1">
        {facts.map(([label, value]) => (
          <div
            key={label}
            className={label === 'Also known as' ? 'col-span-2 min-w-0 sm:col-span-1' : 'min-w-0'}
          >
            <dt className="text-[12px] font-medium tracking-[0.06em] text-white/45 uppercase">
              {label}
            </dt>
            <dd className="mt-[4px] text-[15px] leading-[1.45] text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
