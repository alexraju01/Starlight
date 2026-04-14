import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-md relative z-1 my-10 flex flex-col items-center justify-center gap-3 border-t border-gray-700 text-gray-400">
      <Image
        src="/images/TMDB-Primary-Short.svg"
        alt="The Movie Database (TMDB)"
        height={21}
        width={50}
        priority
      />
      <p className="">© {new Date().getFullYear()} Movie Explorer.</p>
      <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </footer>
  );
};

export default Footer;
