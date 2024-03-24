import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Countdown } from '../components/Countdown';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PlawLabs Careers</title>
        <link rel="icon" href="public/logo.png" />
      </Head>

      <main className={styles.main}>
        <Image src="/logo.png" alt="PlawLabs Logo" width={160} height={160} />
        <div className={styles.welcomeMessage}>
          <h2>Welcome to the page that will let you be a part of one of the world's biggest innovation potentials startup, PlawLabs.</h2>
          <p><i>"We're looking for dreamers, not employees 🎈"</i></p>
          <p><b>Where innovation meets execution</b></p>
        </div>
        <Countdown endDate={new Date('2024-03-25T18:30:00+0300')} />
        <div className={styles.buttonContainer}>
          <button onClick={() => window.open('https://www.plawlabs.com', '_blank')}>Visit Our Website</button>
        </div>
      </main>
    </div>
  );
}
