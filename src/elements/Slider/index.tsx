import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Slider.module.scss";
import { RootState } from "@/redux/store";
import FullImage from "@/components/FullImage";
import { toggleImage } from "@/redux/slices/main";

type PetSliderProps = {
  petImages: string[],
  fullImages: string[],
}

const PetSlider: React.FC<PetSliderProps> = ({ petImages, fullImages }) => {
  const dispatch = useDispatch();  
  const isImageOpen = useSelector((state: RootState) => state.main.imageOpen)

  const [index, setIndex] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const onClick = (ind: number) => {
    setIndex(ind)
    setIsDisabled(true)
    setTimeout(() => setIsDisabled(false), 1000)
  }

  const openFull = () => {
    dispatch(toggleImage())
    document.body.classList.add('overflow-hidden')
  }
  

  return (
  <>
    {isImageOpen && <FullImage src={fullImages} />}      
    <div className={styles.images}>
      <div className={styles.images__left}>
        {
          petImages
            .map((src, ind) => (
              <button key={ind} onClick={() => onClick(ind)} disabled={isDisabled} >
                <Image width={130} height={130} alt="preview" src={src} />
              </button>
            ))
            .filter((_, ind) => ind !== index)
        }

      </div>
      <button className={styles.images__right} onClick={() => openFull()}>
        <Image
          width={420}
          height={620}
          alt="pet preview"
          src={petImages[index]}
        />
      </button>
    </div>

    </>
  )
}

export default PetSlider;
