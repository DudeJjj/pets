import { useEffect, useState } from "react";
import Head from "next/head";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pets from "@/components/Pets";
import Help from "@/components/Help";
import Why from "@/components/Why";
import Footer from "@/components/Footer";
import WindowPopup from "@/elements/Popup";
import { facebook } from "@/utils/facebook";

const Home = () => {
  const [windowIsOpen, setWindowIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setWindowIsOpen(true), 100000)
  }, [])
  
  useEffect(() => {
    facebook()
  }, [])

  return (
    <>
      <Head>
        <title>Pet Savers</title>
        <meta name="description" content="Pets Saver Company. Thank you for choosing us and thank you for your trust" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Εξοικονόμηση κατοικίδιων ζώων" />
        <meta property="og:description" content="Εταιρεία Pets Saver. Βοηθήστε μας να σώσουμε κατοικίδια" />
        <meta property="og:image" content="https://petssaver.com/logo.svg" />
        <meta property="og:url" content="https://petssavers.com" />
      </Head>
      <Header />
      {windowIsOpen && <WindowPopup func={() => setWindowIsOpen(false)} />} 
      <main>
        <Hero />
        <Pets />
        <Help />
        <Why />
      </main> 
      <Footer />
    </>
  )
}

export default Home
