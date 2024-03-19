import Head from "next/head";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleInvoice } from '@/redux/slices/invoice'
import { RootState } from '@/redux/store'
import useTimeout from '@/hooks/timeout'
import { facebook } from '@/utils/facebook'

import NotFound from '@/pages/404'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SkeletonMax from '@/components/Skeletons/Max'
import PetSlider from '@/elements/Slider'
import ProgressBar from '@/elements/ProgressBar'
import Trouble from '@/elements/Trouble'
import Invoice from '@/elements/Invoice'

import { PetProps } from '@/shared/types/pet'
import cats from '@/shared/constants/cats.json'
import styles from './Cats.module.scss'

const nonFoundImage = '/images/non-found.png'

const CurrentCatPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const isInvoice = useSelector((state: RootState) => state.invoice.invoiceOpen)
  const [cat, setCat] = useState<PetProps>()
  const [fullImg, setFullImg] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(true)
  
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    facebook()
  }, [])
  
  useEffect(() => {
    cats.find((cat) => cat.slug === String(router.query.slug) && setCat(cat)) && setFullImg(cat?.fullImages)
    setIsLoading(false)
  }, [router.query.slug])
  
  const onInvoce = () => {
    dispatch(toggleInvoice())
    document.body.classList.toggle('overflow-hidden')
  }

  useTimeout(() => {
    if (cat === undefined) {
      setIsNotFound(true)
    }
  }, 500)
  
  if (isInvoice) {
    return <Invoice petId={cat?.id || 0} petType='cats' petAmount={cat?.amount || 0} />
  }
  if (isNotFound === true) {
    return <NotFound />
  }

  return (
  <>
    <Head>
      <title>Pet Savers</title>
      <meta name="description" content="Pets Saver Company. Thank you for choosing us and thank you for your trust" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Εξοικονόμηση κατοικίδιων ζώων" />
      <meta property="og:description" content="Εταιρεία Pets Saver. Βοηθήστε μας να σώσουμε κατοικίδια" />
      <meta property="og:image" content="https://petssaver.com/logo.svg" />
      <meta property="og:url" content="https://petssavers.com" />
    </Head>
    <Header />
    <main>
      <div className={styles.root}>
        <div className="container">
          <div className={styles.root__content}>
            {isLoading ? <SkeletonMax /> : (
              <>
                <div className={styles.root__content__image}>
                  <PetSlider petImages={cat?.imageSrc || [nonFoundImage]} fullImages={fullImg || [nonFoundImage]} />
                </div>
                <div className={styles.root__content__text}>
                  <h3>Γεια σας, <span>{`είμαι ο  ${cat?.name}`}</span></h3>
                  <div className={styles.root__content__text_characteristics}>
                    <p className={styles.secondary}>Ηλικία: <span>{cat?.characteristics.age}</span></p>
                    <p>Μέγεθος: <span>{cat?.characteristics.size}</span></p>
                    <p className={styles.secondary}>πελεκημένη: <span>{cat?.characteristics.chipped}</span></p>
                    <p>Στειρωμένο: <span>{cat?.characteristics.neutered}</span></p>
                    <p className={styles.secondary}>Διαβατήριο: <span>{cat?.characteristics.passport}</span></p>
                    <p>Παιδιά: <span>{cat?.characteristics.children}</span></p>
                  </div>
                  <div className={styles.root__content__text_progress}>
                    <div className={styles.root__content__text_progress_text}>
                      <i>Πάρτε το ποσό: {cat?.amount} EUR</i>
                      <i>Απαιτούμενο ποσό: {cat?.totalAmount} EUR</i>
                    </div>
                    <ProgressBar amount={cat?.amount || 0} totalAmount={cat?.totalAmount || 0} />
                  </div>
                
                  <div className={styles.root__content__invoice}>
                    <button onClick={onInvoce}>Τιμολόγιο</button>
                  </div>
                  
                </div>
              </>
            )}
          </div>
           
          <Trouble description={cat?.characteristics.description || ''} />

        </div>
      </div>
    </main>
    <Footer />
  </>
)
}

export default CurrentCatPage
