import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { toggleImage } from '@/redux/slices/main';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './FullImage.module.scss';

interface FullImageProps {
  src: string[]
}

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
}

const FullImage: React.FC<FullImageProps> = ({src}) => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(toggleImage())
    document.body.classList.remove('overflow-hidden')
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <section className={styles.root}>
        <button className={styles.root__close} onClick={onClose}>X</button>
          <Slider {...settings} className={styles.root__slider}>
            {src.map((image, index) => (
              <div key={index} className={styles.root__slider_slide}>
                <img src={image} alt={image} />
              </div>
            ))}
          </Slider>
      </section> 
    </>
  )
}

export default FullImage
