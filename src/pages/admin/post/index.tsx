import { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'

import { sendCode, sendMessage } from '@/shared/api/telegram'
import cats from '@/shared/constants/cats.json'
import dogs from '@/shared/constants/dogs.json'
import 'react-toastify/dist/ReactToastify.css';
import styles from './Post.module.scss'

const mathRandom = Math.floor(Math.random() * 90 + 10)

const PostPage = () => {

  const [currentStep, setCurrentStep] = useState(1)
  const [guard, setGuard] = useState(0)

  const [select, setSelect] = useState("amount")
  const [pet, setPet] = useState("cats")
  
  const [newAmount, setNewAmount] = useState(0)
  const [selectedId, setSelectedId] = useState(1)

  useEffect(() => {
    try {
      sendCode(mathRandom)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const confirmGuard = () => {
    if (guard === mathRandom) {
      setCurrentStep(2)
    }
  }

  const submitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(JSON.stringify({ pet, select, selectedId, newAmount }))
    const response = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pet, select, selectedId, newAmount }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      toast.success('Data sent successfully!', {
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
    } else {
      console.error('Failed to send data to API', response.status, response.statusText);
    }
  }

  return (
  <>
      
    <ToastContainer />
    <main>
      <div className="container">
        {currentStep === 1 ? (
          <div className={styles.guard}>
            <h1>επιβεβαιώστε την πρόσβαση</h1>
            <div>
              <input value={guard} onChange={(e) => setGuard(Number(e.target.value))} placeholder="Δωστός κωδικός" />
              <button onClick={confirmGuard}>{`-->`}</button>
            </div>
          </div>
        ) : currentStep === 2 && (
          <form onSubmit={submitButton} className={styles.select}>
            <div>
              <select value={select}>
                <option value="amount" onClick={() => setSelect("amount")}>Amount</option>
                <option value="totalAmount" onClick={() => setSelect("totalAmount")}>totalAmount</option>
              </select>
            </div>
            <div>
              <select value={pet}>
                <option value="cats" onClick={() => setPet("cats")}>Cats</option>
                <option value="dogs" onClick={() => setPet("dogs")}>Dogs</option>
              </select>
              <select value={selectedId}>
                {pet === "cats" ?
                  cats.map((cat) => <option key={cat.id} value={cat.id} onClick={() => setSelectedId(cat.id)}>{cat.name}</option>)
                  : dogs.map((dog) => <option key={dog.id} value={dog.id} onClick={() => setSelectedId(dog.id)}>{dog.name}</option>)
                }
              </select>
            </div>
            <input
              placeholder="newAmount" type="number"
              onChange={(e) => setNewAmount(Number(e.target.value))} value={newAmount}
            />
            <button type="submit">refresh</button>
          </form>
        )}
      </div>
    </main>
  </>
  )
}

export default PostPage
