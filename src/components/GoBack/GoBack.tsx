"use client";

import { useRouter } from "next/navigation";
import Icons from "../../utils/icons";

export default function GoBack() {
	const router = useRouter();
	return (
		<button
			type='button'
			onClick={() => router.back()}
			className='flex justify-center items-center relative top-32 left-8 text-[2.5rem] cursor-pointer h-16 w-16'>
			{Icons.goBack}
		</button>
	);
}
