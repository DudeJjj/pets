import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import { toggleInvoice } from '@/redux/slices/invoice'
import { facebook } from '@/utils/facebook'
import useTimeout from '@/hooks/timeout'

import NotFound from '@/pages/404'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SkeletonMax from '@/components/Skeletons/Max'
import PetSlider from '@/elements/Slider'
import ProgressBar from '@/elements/ProgressBar'
import Trouble from '@/elements/Trouble'
import Invoice from '@/elements/Invoice'

import { PetProps } from '@/shared/types/pet'
import dogs from '@/shared/constants/dogs.json'
import styles from './Dogs.module.scss'

const nonFoundImage = '/images/non-found.png'

const CurrentDogPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const isInvoice = useSelector((state: RootState) => state.invoice.invoiceOpen)
  const [dog, setDog] = useState<PetProps>()
  const [fullImg, setFullImg] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(true)
  
  const [isFastRefresh, setIsFastRefresh] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    facebook()
  }, [])
  
  useEffect(() => {
    dogs.find((dog) => dog.slug === String(router.query.slug) && setDog(dog)) && setFullImg(dog?.fullImages)
    setIsLoading(false)
  }, [router.query.slug])

  const onInvoce = () => {
    dispatch(toggleInvoice())
    document.body.classList.toggle('overflow-hidden')
  }

  useTimeout(() => {
    if (dog === undefined) {
      setIsNotFound(true)
    }
  }, 500)
  
  if (isInvoice) {
    return <Invoice petId={dog?.id || 0} petType='dogs' petAmount={dog?.amount || 0} />
  }
  if (isNotFound === true) {
    return <NotFound />
  }
  if (isFastRefresh === true) {
    return <FastRefresh />
  }

  return (
  <>
    <Head>
      <title>Βοηθήστε αυτό το σκυλί μαζί μας</title>
      <meta name="description" content="Pets Saver Company. Thank you for choosing us and thank you for your trust" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Βοηθήστε αυτό το σκυλί μαζί μας" />
      <meta property="og:description" content="Μάθετε πώς να βοηθήσετε το κατοικίδιό σας να επανέλθει στην υγεία του στην ειδική σελίδα μας για τους ιδιοκτήτες άρρωστων κατοικίδιων ζώων. Λάβετε υποστήριξη και συμβουλές από έμπειρους κτηνιάτρους τώρα!" />
      <meta property="og:image" content="https://petssaver.com/logo.svg" />
      <meta property="og:url" content="https://petssavers.com" />
      <link rel="icon" href="/logo.svg" />
    </Head>
    <Header />
    <main>
      <div className={styles.root}>
        <div className="container">
          <div className={styles.root__content}>
            {isLoading ? <SkeletonMax /> : (
              <>
                <div className={styles.root__content__image}>
                  <PetSlider petImages={dog?.imageSrc || [nonFoundImage]} fullImages={fullImg || [nonFoundImage]}/>
                </div>
                <div className={styles.root__content__text}>
                  <h3>Γεια σας, <span>{`  είμαι ο ${dog?.name}`}</span></h3>
                  <div className={styles.root__content__text_characteristics}>
                    <p className={styles.secondary}>Ηλικία: <span>{dog?.characteristics.age}</span></p>
                    <p>Μέγεθος: <span>{dog?.characteristics.size}</span></p>
                    <p className={styles.secondary}>πελεκημένη: <span>{dog?.characteristics.chipped}</span></p>
                    <p>Στειρωμένο: <span>{dog?.characteristics.neutered}</span></p>
                    <p className={styles.secondary}>Διαβατήριο: <span>{dog?.characteristics.passport}</span></p>
                    <p>Παιδιά: <span>{dog?.characteristics.children}</span></p>
                  </div>
                  
                  <div className={styles.root__content__text_progress}>
                    <div className={styles.root__content__text_progress_text}>
                      <i>Πάρτε το ποσό: {dog?.amount} EUR</i>
                      <i>Απαιτούμενο ποσό: {dog?.totalAmount} EUR</i>
                    </div>
                    <ProgressBar amount={dog?.amount || 0} totalAmount={dog?.totalAmount || 0} />
                  </div>
                
                  <div className={styles.root__content__invoice}>
                    <button onClick={onInvoce}>Τιμολόγιο</button>
                  </div>
                  
                </div>
              </>
            )}
          </div>
           
          <Trouble description={dog?.characteristics.description || ''} />

        </div>
      </div>
    </main>
    <Footer />
  </>
)
}

export default CurrentDogPage
