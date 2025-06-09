'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomAlert from '../../../components/Alert/page';
import { getAllUsers } from '../login/page';
import { Grid } from '@mui/material';
import CurrencyConverter from '../../../components/CurrencyConverter/page';

type AlertState = {
  message: string;
  success?: boolean;
} | null;


export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [phone, setPhone] = useState<string | null>(null);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [amount, setAmount] = useState<string>('0');

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedInUser');
    const userPhone = localStorage.getItem('logPhone');
    const userBalance = localStorage.getItem('balance');

    if (!loggedUser || !userPhone || userBalance === null) {
      router.push('/login');
    } else {
      setUser(loggedUser);
      setPhone(userPhone);
      setBalance(Number(userBalance));
    }
  }, [router]);
  const [showCheck, setShowCheck] = useState(false);
const [alert, setAlert] = useState<{ message: string; success?: boolean } | null>(null);

const validateTransfer = (e: React.FormEvent) => {
  e.preventDefault();

  let users = getAllUsers();
  const senderPhone = localStorage.getItem('logPhone');

  const senderIndex = users.findIndex(u => u.phone === senderPhone);
  const recipientIndex = users.findIndex(u => u.phone === recipientPhone);

  if (senderIndex === -1) {
    setAlert({ message: 'Sender not found.' });
    return;
  }

  if (recipientIndex === senderIndex) {
    setAlert({ message: 'Cannot transfer money to yourself.' });
    return;
  }

  if (recipientIndex === -1) {
    setAlert({ message: 'Recipient not found.' });
    return;
  }

  if (users[senderIndex].balance < Number(amount)) {
    setAlert({ message: 'Insufficient funds.' });
    return;
  }

  setAlert(null);
  setShowCheck(true); 
};

const confirmTransfer = () => {
  let users = getAllUsers();
  const senderPhone = localStorage.getItem('logPhone');

  const senderIndex = users.findIndex(u => u.phone === senderPhone);
  const recipientIndex = users.findIndex(u => u.phone === recipientPhone);

  users[senderIndex].balance -= Number(amount);
users[recipientIndex].balance += Number(amount);

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('balance', users[senderIndex].balance.toString());
  setBalance(users[senderIndex].balance);

  setShowCheck(false); 
  setAlert({ message: `✅ Sent $${amount} to ${recipientPhone}`, success: true });

  setRecipientPhone('');
  setAmount('0');
};

  return (
    <div className="dashboard w-full min-h-screen flex-col flex items-center justify-center text-center">
      <h2 className="text-white text-5xl font-bold mb-6 mt-6">User Dashboard</h2>
      {user && <h3 className="text-3xl text-white mb-4">Welcome, {user}!</h3>}
      <div className="mb-6 text-white text-2xl">Your balance: <strong>${balance}</strong></div>
        <Grid display="flex" justifyContent="center" padding={{xs: 2}} container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid size={{md: 6, sm:8}}>
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_0_16px_0_rgba(0,0,0,0.5)] h-full rounded-2xl p-8">
            <div className='w-full flex justify-center'><h3 className='text-purple-600 text-2xl mb-8'>Send money</h3></div>
            <form onSubmit={validateTransfer} className="space-y-6 mb-4">
              <input
                type="text"
                placeholder="Recipient Phone"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                required
                className="w-full p-2l border-b-[2px] border-solid border-white rounded-2xl px-5 h-8 text-purple-600 outline-0"/>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setAmount(val);
                  }
                }}
                onBlur={() => {
                  if (amount === '') setAmount('0'); 
                }}
                required
                className="w-full p-2l border-b-[2px] border-solid border-white rounded-2xl px-5 h-8 text-purple-600 outline-0"/>
              <button
                type="submit"
                className="flex items-center justify-center h-9 w-36 rounded-2xl bg-purple-600 hover:bg-purple-500/80 text-white m-auto mt-5"
              >
                Send
              </button>
            </form>
            {showCheck && (
              <div className="fixed inset-0 rounded-2xl bg-black/40 backdrop-blur-2xl flex justify-center items-center">
                <div className="bg-white/80 rounded-2xl p-8 text-center">
                  <h2 className="text-lg font-semibold mb-2">Confirm Transfer</h2>
                  <p>Recipient: <strong>{recipientPhone}</strong></p>
                  <p>Amount: <strong>${amount}</strong></p>
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={confirmTransfer}
                      className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setShowCheck(false)}
                      className="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {alert && <CustomAlert description={alert.message} success={alert.success} />}
          </div>
        </Grid>
        <Grid size={{md: 6, sm:8, xs:12}}>
          <CurrencyConverter />
        </Grid>
      </Grid>
      </div>
      

      
  );
}
