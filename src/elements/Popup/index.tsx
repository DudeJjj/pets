import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './Popup.module.scss';
import { getCats } from '@/shared/api/fetch';

interface WindowPopupProps {
  func: () => void;
}

const nonFoundImage = '/non-found.png';

const WindowPopup: React.FC<WindowPopupProps> = ({ func }) => {

  const [slug, setSlug] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string[]>();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const limit = 1;
        const response = await getCats(limit, 1);
        setSlug(response.items[0].slug);
        setImageUrl(response.items[0].imageSrc);
        console.log(response.items[0].imageSrc)
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems()
  }, []);

  return (
    <article className={styles.root}>
      <button onClick={func}>X</button>
      <div className={styles.root__content}>
        <Image src="/logo.svg" alt="logotype" width={32} height={32} />
        <p>Βοηθήστε αυτό <br /> Γάτα από</p>
        <Link href={`/pets/cats/${slug}`}>
          30€
        </Link>
      </div>
      <Image src={imageUrl && imageUrl[0] ? imageUrl[0] : nonFoundImage} alt="cat" width={100} height={100} className={styles.root__cat} />
    </article>
  )
}

export default WindowPopup
