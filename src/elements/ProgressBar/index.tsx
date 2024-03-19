import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  amount: number
  totalAmount: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({amount, totalAmount}) => {
  const progress = (Math.round(amount / totalAmount * 100))
  
  return (
    <div className={styles.root}>
      <div className={styles.root__bar}>
        <div className={styles.root__bar_fill}
          style={progress < 30 ? { width: `${progress}%`, background: 'linear-gradient(90deg, rgba(154,68,255,1) 0%, rgba(91,150,205,1) 50%)' }
            : progress < 60 ? { width: `${progress}%`, background: 'linear-gradient(90deg, rgba(154,68,255,1) 0%, rgba(91,150,205,1) 48%)' }
              : { width: `${progress}%`, maxWidth: '100%', background: 'linear-gradient(90deg, rgba(154,68,255,1) 0%, rgba(91,150,205,1) 48%, rgba(19,241,148,1) 100%)' }
          }
        >
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
