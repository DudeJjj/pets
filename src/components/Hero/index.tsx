import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';

import { array } from '@/shared/constants/hero';
import styles from './Hero.module.scss';
import Image from 'next/image';

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
}

const Hero = () => {  
  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.root__content}>
          <Slider {...settings}>
            {array.map((item) => (
              <div className={styles.root__content__item} key={item.id}>
                <div className={styles.root__content__item_text}>
                  <h1>{item.header}</h1>
                  <button onClick={() => console.log('open modal')}>Βοηθήστε μας.</button>
                </div>
                <Image src={item.imageSrc} width={500} height={500} alt={item.header}/>
              </div>
            ))} 
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Hero
