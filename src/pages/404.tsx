import Head from 'next/head';
import Link from 'next/link';

import styles from '@/styles/error.module.scss';

const NotFound = () => {
  return (
  <>
    <Head>
      <title>Σφάλμα 404</title>
      <meta name="description" content="Pets Saver Company. Thank you for choosing us and thank you for your trust" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Σφάλμα 404" />
      <meta property="og:description" content="Έχετε εισάγει λανθασμένη διεύθυνση." />
      <meta property="og:image" content="https://petssaver.com/logo.svg" />
      <meta property="og:url" content="https://petssavers.com" />
      <link rel="icon" href="/logo.svg" />
    </Head>
    <section className={styles.root}> 
      <div className="container">
        <div className={styles.root__content}>
          <h1>Ουάου, φαίνεται ότι πέφτεις σε λανθασμένη διεύθυνση &#128553; </h1>
          <Link href="/">{` Αρχική σελίδα -> `}</Link>
        </div>
      </div>
    </section>   

    </>
  )
}

export default NotFound;
