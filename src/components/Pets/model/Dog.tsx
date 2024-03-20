import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios'

import { PetMiniProps } from '@/shared/types/pet';
import UIHeader from '@/shared/ui/headers';
import styles from '../Pets.module.scss';

const Dog = () => {
  const [dogs, setDogs] = useState<PetMiniProps[]>();
  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/getDogs').then((res) => setDogs(res.data)) 
    }
    fetchData()
  }, [])

  return (
    <article className={styles.root}>
      <div className="container">
          <UIHeader header="Σκύλοι" link="/pets/dogs" />
        <div className={styles.root__content}>
          {dogs
            ?.slice(0,4)
            .map((dog: PetMiniProps) => (
              <div key={dog.id} className={styles.root__content__card}>
                  <>
                    <b>{`Full page`}</b>
                    <Link className={styles.root__content__card} href={`/pets/dogs/${dog.slug}`}>
                      <Image src={dog.imageSrc[0]} width={250} height={250} alt={dog.name} />
                      <div className={styles.root__content__card__info}>
                        <h3>{dog.name}</h3>
                        <div className={styles.root__content__card__info_price}>
                          <p>Το απαιτούμενο ποσό: <span>{dog.totalAmount} </span> EUR </p>
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

export default Dog
