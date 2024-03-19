import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.root} id="contacts">
      <div className="container">
        <div className={styles.root__content}>
          <div className={styles.root__content__info}>
            <div className={styles.root__content__info_logo}>
              <Image src="/logo.svg" alt="logo" width={160} height={160} />
              <b>PetSavers</b>
            </div>
            <div className={styles.root__content__links}>
              <ul>
                <Link href="/">Αρχική σελίδα</Link>
                <Link href="/pets/cats/">Γάτες</Link>
                <Link href="/privacy-policy">Πολιτική</Link>
                <Link href="/pets/dogs/">Σκύλοι</Link>
              </ul>
            </div>
          </div>
          
          <div className={styles.root__content__icons}>
              <Image src="/icons/trust.png" alt="trust" width={80} height={80} />
              <Image src="/icons/rated.png" alt="top rated 2023" width={160} height={160} />
            <ul>
              <Image src="/icons/visa.png" alt="visa" width={70} height={70} />
              <Image src="/icons/mastercard.png" alt="mastercard" width={70} height={70} />
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
