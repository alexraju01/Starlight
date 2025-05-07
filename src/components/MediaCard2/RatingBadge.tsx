import { Star } from "lucide-react";

export default function RatingBadge({ rating }: { rating: number }) {
	return (
		<div className='flex items-center gap-2'>
			<i>
				<Star fill='#FACC15' color='#FACC15' size={20} />
			</i>
			<p className='text-2xl'>{rating}</p>
		</div>
	);
}
