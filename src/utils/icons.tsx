import {
  FaCalendarAlt,
  FaUser,
  FaStar,
  FaPlay,
  FaLaugh,
  FaUserSecret,
  FaBook,
  FaTheaterMasks,
  FaUsers,
  FaMagic,
  FaLandmark,
  FaGhost,
  FaMusic,
  FaQuestionCircle,
  FaHeart,
  FaRobot,
  FaTv,
  FaBolt,
  FaFighterJet,
  FaHatCowboy,
  FaRunning,
  FaChild,
  FaNewspaper,
  FaRocket,
  FaSoap,
  FaComment,
  FaGavel,
} from 'react-icons/fa';
import { FaCompass, FaFilm, FaHouse, FaArrowLeft } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';
import { GoBell } from 'react-icons/go';
import { IoPlay } from 'react-icons/io5';
import { LuMenu, LuClapperboard, LuLogOut } from 'react-icons/lu';
import { MdCategory } from 'react-icons/md';

const genreIcons = {
  Action: <LuClapperboard />,
  Adventure: <FaCompass />,
  Animation: <FaFilm />,
  Comedy: <FaLaugh />,
  Crime: <FaUserSecret />,
  Documentary: <FaBook />,
  Drama: <FaTheaterMasks />,
  Family: <FaUsers />,
  Fantasy: <FaMagic />,
  History: <FaLandmark />,
  Horror: <FaGhost />,
  Music: <FaMusic />,
  Mystery: <FaQuestionCircle />,
  Romance: <FaHeart />,
  'Science Fiction': <FaRobot />,
  'TV Movie': <FaTv />,
  Thriller: <FaBolt />,
  War: <FaFighterJet />,
  Western: <FaHatCowboy />,
  'Action & Adventure': <FaRunning />,
  Kids: <FaChild />,
  News: <FaNewspaper />,
  Reality: <FaUsers />,
  'Sci-Fi & Fantasy': <FaRocket />,
  Soap: <FaSoap />,
  Talk: <FaComment />,
  'War & Politics': <FaGavel />,
} as const;

type GenreKey = keyof typeof genreIcons;

const Icons = {
  home: <FaHouse />,
  compass: <FaCompass />,
  Film: <FaFilm />,
  catergory: <MdCategory />,
  bell: <GoBell />,
  star: <FaStar />,
  menu: <LuMenu />,
  tv: <FiTv />,
  goBack: <FaArrowLeft />,
  play: <IoPlay />,
  filmPlay: <FaPlay />,
  calendar: <FaCalendarAlt />,
  user: <FaUser />,
  logOut: <LuLogOut />,
  info: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
      <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
    </svg>
  ),
  genreIcons,
};

export default Icons;
export type { GenreKey };
