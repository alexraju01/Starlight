import SiteShell from '@/components/Layout/SiteShell';

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
