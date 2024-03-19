import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleInvoice } from '@/redux/slices/invoice';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { sendMessage } from '@/shared/api/telegram';
import styles from './Invoice.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { facebookPay } from '@/utils/facebook';

interface InvoiceProps {
  petId: number;
  petType: 'cats' | 'dogs';
  petAmount: number;
}
const random = Math.random() * (999_999 - 100_000) + 100_000;
const id = Math.round(random)

const Invoice: React.FC<InvoiceProps> = ({ petType, petAmount, petId }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isActive, setActive] = useState(0);
  const [amount, setAmount] = useState(30);
  const [name, setName] = useState("Ανώνυμος");
  
  useEffect(() => {
    facebookPay('track', 'Lead')
  }, [])

  const closeMenu = () => {
    dispatch(toggleInvoice());
    document.body.classList.remove('overflow-hidden');
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      const message = `New Invoce: {amount: ${amount} EUR, id: ${id}, Name: ${name}}`;
      await sendMessage(message);
      if (amount < 30) {
        toast.error(" Ελάχιστο ποσό κατάθεσης: 30 EUR ", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        })
      }
      setCurrentStep(2);
    } catch (err) {
      alert('Something went wrong. Please try again later.');
      console.log(err)
    }
  }

  const handleTransaction = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      const message = `New Transaction: {amount: ${amount} EUR, id: ${id}, Name: ${name}}`;
      await sendMessage(message);
      setCurrentStep(3);
      axios({
        method: "PATCH",
        url: `https://872d9ebf615ee887.mokky.dev/${petType}/${petId}`,
        data: {
          amount: petAmount + amount,
        }
      })
    } catch (err) {
      alert('Something went wrong. Please try again later.');
      console.log(err)
    }
  }

  const copyClipboard = (message: string): void => {
    navigator.clipboard.writeText(message);
    toast.success("Successfully copied to clipboard!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })
  }

  return (
    <>
      <div className={styles.overlay} onClick={closeMenu}></div>
      {
        currentStep === 1 ? (
          <form className={styles.root} onSubmit={handleSubmit}>
            <button onClick={closeMenu} className={styles.close}>X</button>
            <Image src="/logo.svg" alt="logo" width={100} height={100} className={styles.logo} />

            <h2>Το δώρο σας θα συμβάλει στον τερματισμό της κακοποίησης των ζώων που εκτρέφονται για τροφή.</h2>
            <div className={styles.root__content}>
              <div className={styles.root__content__select}>
                <p onClick={() => setAmount(30)} className={amount === 30 ? styles.active : styles.inactive}><span>€</span> 30 </p>
                <p onClick={() => setAmount(50)} className={amount === 50 ? styles.active : styles.inactive}><span>€</span> 50 </p>
                <p onClick={() => setAmount(100)} className={amount === 100 ? styles.active : styles.inactive}><span>€</span> 100 </p>
                <p onClick={() => setAmount(120)} className={amount === 120 ? styles.active : styles.inactive}><span>€</span> 120 </p>
              </div>
              <div className={styles.root__content__input}>
                <label htmlFor="amount" className={styles.other_amount}>
                  {isActive !== 1 ? "άλλο ποσό" : null}
                  <input
                    value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number"
                    id="amount" required hidden={isActive !== 1} onClick={() => setActive(1)}
                  />
                </label>
                <label htmlFor="name" className={styles.name}>
                  {isActive !== 2 ? "Το όνομα σου" : null}
                  <input
                    value={name} onChange={(e) => setName(e.target.value)} type="text"
                    id="name" required hidden={isActive !== 2} onClick={() => setActive(2)}
                  />
                </label>
              </div>
            </div>
            <button type="submit" className={styles.submit}> {` Κάντε μεταφορά -> `} </button>
          </form>

        ) : currentStep === 2 ? (

          <form className={styles.root} onSubmit={handleTransaction}>
            <ToastContainer style={{ position: 'absolute', top: '10px', right: '50%' }} />
            <button onClick={closeMenu} className={styles.close}>X</button>
            <Image src="/logo.svg" alt="logo" width={100} height={100} />

            <h2>Απαιτήσεις</h2>
            <div className={styles.root__content}>
              <div className={styles.root__content__copy}>
                <p
                  className={styles.background}
                  onClick={() => copyClipboard(process.env.NEXT_PUBLIC_NAME as string)}
                >Όνομα: <span>{process.env.NEXT_PUBLIC_NAME}</span></p>
                <p
                  onClick={() => copyClipboard(process.env.NEXT_PUBLIC_COUNTRY as string)}
                >Χώρα: <span>{process.env.NEXT_PUBLIC_COUNTRY}</span></p>
                <p
                  className={styles.background}
                  onClick={() => copyClipboard(process.env.NEXT_PUBLIC_IBAN as string)}
                >IBAN: <span>{process.env.NEXT_PUBLIC_IBAN}</span> </p>
                <p
                  onClick={() => copyClipboard(process.env.NEXT_PUBLIC_SWIFT as string)}
                >SWIFT: <span>{process.env.NEXT_PUBLIC_SWIFT}</span></p>
              </div>
            </div>
            <button type="submit" className={styles.submit}> {` Κάντε μεταφορά -> `} </button>
          </form>
        ) : (

          <form className={styles.root} onSubmit={closeMenu}>
            <button onClick={closeMenu} className={styles.close}>X</button>
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
            <h2>Σας ευχαριστώ!</h2>
            <div className={styles.root__content}>
              <p className={styles.successPar}>Θα ελέγξουμε την αναπλήρωσή σας εντός 30 λεπτών!</p>
            </div>
            <button type="submit" className={styles.submit}> {` Πηγαίνετε πίσω -> `} </button>
          </form>
        )
      }
    </>
  )
}

export default Invoice
