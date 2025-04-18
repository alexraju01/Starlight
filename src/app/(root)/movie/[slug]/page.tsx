import { Suspense } from "react";

import { MediaOverview } from "@/components";
import { Spinner } from "@/components/LoadingSkeletons";
import { MediaMode } from "@/types/mediaMode";

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
	const { slug } = await params;

	return (
		<section className='w-full h-full'>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={slug} mediaMode={MediaMode.Movie} />
			</Suspense>
		</section>
	);
}
