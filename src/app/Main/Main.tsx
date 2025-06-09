'use client';

import { useRouter } from 'next/navigation';
import { User } from '../../../lib/data/defaultUsers';
import './style.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext/page';

export default function Main() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push('/userDashboard');
    } else {
      router.push('/register');
    }
  };


  return (
  <div>
    <div className="header">
      <div className="container">
      <div className="header-content">
        <h1>Where Savings Sparkle</h1>
        <p>Your money, your magic — save smart, spend sweetly, and watch your goals bloom. Powered by heart, backed by security.</p>
        <button className={user ? 'dashboardButton' : 'button signupButton'}><a href={user ? '/userDashboard' : '/register'}>{user ? 'User Dashboard' : 'Join Us'}</a></button>
      </div>
    </div>
    
  </div>
  <div className="content content-main">
    <div className="container">
      <h1 className='m-auto'>Spend with joy!</h1>
      <p className='m-auto max-w-200'>From tiny treats to big dreams, every purchase feels brighter. Sanrio Bank makes saving simple and joyful — no stress, just smiles.</p>
      <div className="images-container">
        <div className="image-container">
          <img src="img/myMelloWallet.png" alt="mymelo" />
          <p>Peaceful Pockets: Budgeting You Can Trust</p>
        </div>
        <div className="image-container">
          <img src="img/kuromiholdingaphone.png" alt="bg" />
          <p>Send and receive with a smile — it's that simple.</p>
        </div>
        <div className="image-container">
          <img src="img/kuromi.png" alt="kuromi" />
          <p>Enjoy spending on what makes you sparkle.</p>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
}