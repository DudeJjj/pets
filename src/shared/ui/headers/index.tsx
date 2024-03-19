import styles from './Headers.module.scss';

interface UIHeaderProps {
  header: string;
  link: string;
}

const UIHeader = ({ header, link }: UIHeaderProps) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.header}>{header}</h2>
      <a href={link} rel="noreferrer" className={styles.link}>
        {`Όλοι τους ${header} -> `} 
      </a>
    </div>
  );
};

export default UIHeader;
