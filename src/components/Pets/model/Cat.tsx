import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { PetMiniProps } from '@/shared/types/pet';
import UIHeader from '@/shared/ui/headers';
import styles from '../Pets.module.scss';

const Cat = () => {
  const [cats, setCats] = useState<PetMiniProps[]>();
  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/getCats').then((res) => setCats(res.data))
    }
    fetchData()
  }, [])
  
  return (
    <article className={styles.root}>
      <div className="container">
        <UIHeader header="Γάτες" link="/pets/cats" />
        <div className={styles.root__content}>
          {cats
            ?.slice(0,4)
            .map((cat: PetMiniProps) => (
              <div key={cat.id} className={styles.root__content__card}>
                  <>
                    <b>{`Full page `}</b>
                    <Link className={styles.root__content__card} href={`/pets/cats/${cat.slug}`}>
                      <Image src={cat.imageSrc[0]} width={250} height={50} alt={cat.name} />
                      <div className={styles.root__content__card__info}>
                        <h3>{cat.name}</h3>
                        <div className={styles.root__content__card__info_price}>
                          <p>Το απαιτούμενο ποσό: <span>{cat.totalAmount} </span> EUR </p>
                        </div>
                      </div>
                    </Link>
                  </>
              </div>
            ))} 
        </div>
      </div>
    </article>
  )
}

export default Cat
