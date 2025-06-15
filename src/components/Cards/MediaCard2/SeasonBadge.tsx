import { HiRectangleStack } from "react-icons/hi2";
import { isTVShow } from "@/utils/typeGuard";
import { Media } from "@/types/global";

const SeasonBadge = ({ item }: { item: Media }) => {
	if (!isTVShow(item) || !item.number_of_seasons) return null;

	return (
		<div className='flex truncate text-lg '>
			<div className='flex gap-[4px] items-center text-gray-400 text-xl bg-[#141414] py-[6px] pl-[6px] pr-[10px] rounded-[51px] border border-[#262626]'>
				<i>
					<HiRectangleStack size={18} />
				</i>
				<p className='font-md'>
					{item.number_of_seasons} Season{item.number_of_seasons !== 1 ? "s" : ""}
				</p>
			</div>
		</div>
	);
};

export default SeasonBadge;
