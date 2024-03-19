import { why } from '@/shared/constants/why';
import styles from './Why.module.scss';
import Image from 'next/image';

const Why = () => {
  return (
    <section className={styles.root} id="about-us">
      <div className="container">
        <div className={styles.root__content}>
          <h3>Γιατί εμείς</h3>
          <div className={styles.root__content__text}>
            {why.map((item) => (
              <div className={styles.root__content__text__item} key={item.id}>
                <p>{item.name}</p>
                <div className={styles.root__content__text__item_help}>
                  <Image src={item.imageSrc} width={50} height={50} alt="image descr" />
                  <p>{item.description}</p> 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why
