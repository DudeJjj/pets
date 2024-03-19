import styles from './Help.module.scss'

const Help = () => {
  return (
    <section className={styles.root}>
      <div className="container">
        <div className={styles.root__content}>
          <h4>{`> 1 150 000`}</h4>
          <p>τα κατοικίδια ζώα λαμβάνουν βοήθεια <br /> από 10 χρόνια δουλειάς μας. </p>
        </div>
      </div>
    </section>
  )
}

export default Help
