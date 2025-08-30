import { getImageUrl } from '@/utils/image/getImageUrl';
import Image from 'next/image';

interface Props {
  src: string | null;
  alt: string;
  className?: string;
}

const PosterImage = ({ src, alt, className }: Props) => (
  <Image
    src={getImageUrl(src, 'poster', 'w500')}
    alt={alt}
    fill
    quality={90}
    className={`object-cover ${className || ''}`}
  />
);

export default PosterImage;
