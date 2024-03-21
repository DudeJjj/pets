import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Pagination } from 'flowbite-react'
import axios from 'axios'

import { facebook } from '@/utils/facebook'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { PetProps } from '@/shared/types/pet'
import styles from './Cats.module.scss'
import SkeletonMini from '@/components/Skeletons/Mini'

const CatsPage = () => {
  const [cats, setCats] = useState<PetProps[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [slice, setSlice] = useState([0, 4])
  const [isLoading, setIsLoading] = useState(true)
  const onPageChange = (page: number) => setCurrentPage(page);
 
  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/getCats').then((res) => setCats(res.data))
      setIsLoading(false)
    }
    fetchData()
  }, [currentPage])
  useEffect(() => setSlice([currentPage * 4 - 4, currentPage * 4]), [currentPage])

  return (
    <>
      <Head>
        <title>Όλες οι γάτες</title>
        <meta name="description" content="Pets Saver Company. Thank you for choosing us and thank you for your trust" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Όλα τα σκυλιά " />
        <meta property="og:description" content="Μάθετε ποια σκυλιά μπορείτε να βοηθήσετε μαζί μας" />
        <meta property="og:image" content="https://petssaver.com/logo.svg" />
        <meta property="og:url" content="https://petssavers.com" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <main className={styles.root}>
        <div className="container">
          <section className={styles.root__content}>
            {isLoading ? <SkeletonMini /> : (
              <>
                {cats
                  ?.slice(slice[0], slice[1])
                  .map((cat: PetProps) => (
                    <div key={cat.id}>
                        <Link href={`/pets/cats/${cat.slug}`}>
                          <div className={styles.root__content_pet}>
                            <div className={styles.root__content_pet_img}>
                              <Image src={cat.imageSrc[0]} width={150} height={90} alt={cat.name} />
                              <div className={styles.root__content_pet_img_text}>
                                <h3>{cat.name}</h3>
                                <p>{cat.characteristics.age}</p>
                              </div>
                            </div> 
                            <div className={styles.root__content_pet_info}>
                              <div className={styles.root__content_pet_info_text}>
                                <p>{cat.amount} €</p>
                                <p className={styles.root__content_pet_info_text_total}>{cat.totalAmount} €</p>
                              </div>
                            </div> 
                          </div>
                        </Link>
                    </div>
                ))}
              </>
            )}
          </section>
          <div className={styles.pagination}>
            <Pagination 
              layout="navigation" 
              currentPage={currentPage} 
              totalPages={2} 
              onPageChange={onPageChange}
              previousLabel="Προηγούμενο"
              nextLabel="Επόμενο"
            />
          </div> 
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CatsPage
