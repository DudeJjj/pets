import Cat from './model/Cat';
import Dog from './model/Dog';
import styles from './Pets.module.scss';

const Pets = () => {
  return (
    <section className={styles.pets} id="pets">
      <Cat />
      <Dog />
    </section>
  )
}

export default Pets
