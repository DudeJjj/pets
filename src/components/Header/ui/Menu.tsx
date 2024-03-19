import { useDispatch } from 'react-redux'
import { toggleMenu } from '@/redux/slices/main'
import Link from 'next/link'

import styles from '../Header.module.scss'

const Menu = () => {
  const dispatch = useDispatch()

  const closeMenu = () => {
    dispatch(toggleMenu())
    document.body.classList.remove('overflow-hidden')
  }

  return (
    <div className={styles.menu}>
      <button onClick={closeMenu}>X</button>
      <nav>
        <Link onClick={closeMenu} href="/#about-us">Σχετικά με εμάς</Link>
        <Link onClick={closeMenu} href="/#contacts">Επαφές</Link>
        <Link onClick={closeMenu} href="/#pets">Κατοικίδια ζώα</Link>
      </nav>
    </div>
  )
}

export default Menu
