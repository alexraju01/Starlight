import NotFoundContent from '@/components/Error/NotFoundContent';
import SiteShell from '@/components/Layout/SiteShell';

/** Unknown URLs. Rendered outside the (root) layout, so it brings its own navbar and footer. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
