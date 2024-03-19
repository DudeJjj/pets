import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '@/redux/slices/main'
import { RootState } from '@/redux/store'
import Image from 'next/image'
import Link from 'next/link'

import Menu from './ui/Menu'
import styles from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state: RootState) => state.main.menuOpen);

  if (menuOpen) {
    return <Menu />
  }
  
  const onClickMenu = () => {
    document.body.classList.toggle('overflow-hidden')
    dispatch(toggleMenu())
  }

  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.root__content}>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logotype"
              width={72}
              height={16}
            />
          </Link>
    
          <nav>
            <Link href="/#about-us">
              Σχετικά με εμάς
            </Link>
            <Link href="/#contacts">Επαφές</Link>
            <Link href="/#pets">Κατοικίδια ζώα</Link>
          </nav>
          
          <button onClick={onClickMenu}>
            <Image src="/icons/menu.png" alt="menu" width={64} height={64}/>
          </button>

        </div>
      </div>
    </header>
  ) 
}

export default Header
