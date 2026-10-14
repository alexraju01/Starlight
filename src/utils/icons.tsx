import {
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
import { FaCompass, FaFilm } from 'react-icons/fa6';
import { IoPlay } from 'react-icons/io5';
import { LuClapperboard } from 'react-icons/lu';

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
  play: <IoPlay />,
  genreIcons,
};

export default Icons;
export type { GenreKey };
