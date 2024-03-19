import styles from './Trouble.module.scss';

interface TroubleProps {
  description: string; 
}

const Trouble: React.FC<TroubleProps> = ({description}) => {
  return (
    <section className={styles.root}>
      <p>{description}</p>
    </section>
  )
}

export default Trouble
