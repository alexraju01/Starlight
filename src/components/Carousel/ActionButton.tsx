import Icons from "@/utils/icons";

export default function ActionButtons() {
	return (
		<div className='flex flex-wrap gap-4 sm:gap-5 items-center justify-center md:justify-normal mb-9 md:mb-[47px]'>
			<button className='flex text-base sm:text-[20px] items-center gap-2 bg-[#9E221A] h-[50px] sm:h-[59px] px-4 sm:px-[14px] rounded-[8px] text-white w-full sm:w-auto justify-center'>
				<span>{Icons.play}</span>Watch Trailer
			</button>
			<div className='flex gap-2.5 w-full sm:w-auto justify-center sm:justify-start'>
				<button className='bg-[#100F10] w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-[8px] flex items-center justify-center border border-[#100F10]'>
					<svg
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M14 7V21M21 14L7 14'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<button className='bg-[#100F10] w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-[8px] flex items-center justify-center border border-[#100F10]'>
					<svg
						width='26'
						height='24'
						viewBox='0 0 26 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M6.738 10.9583C7.67874 10.9583 8.52756 10.4382 9.10811 9.69792C10.0101 8.54779 11.147 7.59061 12.4465 6.89856C13.289 6.44988 14.02 5.78331 14.3745 4.89706C14.6226 4.27692 14.75 3.61516 14.75 2.94726V2.20831C14.75 1.72506 15.1418 1.33331 15.625 1.33331C17.0747 1.33331 18.25 2.50857 18.25 3.95831C18.25 5.30188 17.9472 6.57472 17.4061 7.7123C17.0962 8.3637 17.5309 9.20831 18.2522 9.20831M18.2522 9.20831H21.899C23.0968 9.20831 24.1689 10.018 24.2957 11.209C24.3481 11.7016 24.375 12.2018 24.375 12.7083C24.375 16.0305 23.2178 19.0825 21.2845 21.4831C20.8323 22.0446 20.1332 22.3333 19.4123 22.3333H14.727C14.1627 22.3333 13.6021 22.2423 13.0668 22.0639L9.43324 20.8527C8.89791 20.6743 8.33732 20.5833 7.77304 20.5833H5.88824M18.2522 9.20831H15.625M5.88824 20.5833C5.98485 20.822 6.08999 21.0563 6.20327 21.2859C6.43326 21.752 6.11223 22.3333 5.59245 22.3333H4.53337C3.49654 22.3333 2.5349 21.729 2.23232 20.7373C1.83743 19.443 1.625 18.0692 1.625 16.6458C1.625 14.8346 1.96894 13.1037 2.59507 11.5149C2.95097 10.6119 3.86189 10.0833 4.83258 10.0833H6.0608C6.61138 10.0833 6.93019 10.7319 6.64435 11.2024C5.6802 12.7897 5.125 14.6529 5.125 16.6458C5.125 18.0382 5.39604 19.3674 5.88824 20.5833Z'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<button className='bg-[#100F10] w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-[8px] flex items-center justify-center border border-[#100F10]'>
					<svg
						width='26'
						height='24'
						viewBox='0 0 26 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M21.2997 4.57529C25.4002 8.6758 25.4002 15.324 21.2997 19.4245M18.2064 7.66898C20.5984 10.0609 20.5984 13.9391 18.2064 16.331M6.875 7.62498L12.3813 2.11869C12.9325 1.56747 13.875 1.95787 13.875 2.73741V21.2625C13.875 22.0421 12.9325 22.4325 12.3813 21.8813L6.875 16.375H4.26056C3.23466 16.375 2.27356 15.7841 2.0011 14.795C1.75595 13.9051 1.625 12.9678 1.625 12C1.625 11.0321 1.75595 10.0949 2.0011 9.20492C2.27356 8.21586 3.23466 7.62498 4.26056 7.62498H6.875Z'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
