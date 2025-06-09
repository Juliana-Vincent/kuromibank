'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from "../../../components/AnimationPresence";
import CustomAlert from '../../../components/Alert/page';
import '../../../css/auth.css';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { defaultUsers } from '../../../lib/data/defaultUsers';
import { useAuth } from '../../../context/AuthContext/page';

interface User {
  uname?: string;
  phone: string;
  password: string;
  balance: number;
}

export function getAllUsers(): User[] {
  const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const merged = [...localUsers];

  defaultUsers.forEach(user => {
    if (!localUsers.some((u: { phone: string; }) => u.phone === user.phone)) {
      merged.push(user);
    }
  });

  return merged;
}

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ logName: '', logPhone: '', logPassword: '' });
  const [alert, setAlert] = useState<{ description: string; success?: boolean } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { logName, logPhone, logPassword } = form;
    const users = getAllUsers();
    const user = users.find(u => u.phone === logPhone);

    if (!user) {
      setAlert({ description: 'No user found with this phone number.', success: false });
      return;
    }

    if (user.password !== logPassword) {
      setAlert({description: 'Incorrect password.', success: false});
      return;
    }

    login(logName);
    localStorage.setItem('logPhone', user.phone);
    localStorage.setItem('balance', String(user.balance));
    setAlert(null);

    router.push('/userDashboard');
  };

  return (
    <PageWrapper>
      <div className="content flex items-center justify-center">
        <div className="box">
          <h2 className="text-4xl text-purple-600 font-bold text-center mt-4">Log in</h2>
          <form className='max-w-[400px] w-full' onSubmit={handleLogin}>
            <div className="input-box">
              <input
                type="text"
                name="logName"
                placeholder="Name"
                required
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <PersonIcon className='i'/>
            </div>
            <div className="input-box">
              <input
                type="tel"
                name="logPhone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <PhoneIcon className='i'/>
            </div>
            
            <div className="input-box">
              <input
                type={showPassword ? 'text' : 'password'}
                name="logPassword"
                placeholder="Password"
                required
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <LockIcon className="i cursor-pointer"
                onMouseEnter={() => setShowPassword(true)}
                onMouseLeave={() => setShowPassword(false)}/>
            </div>
            
            {alert && <CustomAlert description={alert.description} success={alert.success} />}
            <button type="submit" className='flex m-auto items-center justify-center h-9 w-36 rounded-2xl transition-colors duration-400 font-[500] text-white cursor-pointer bg-purple-600 hover:bg-purple-500/80'>
              Log in
            </button>
          </form>
          <div className="jump-to-login mt-6">
            <p className="text-sm">Don’t have an account?</p>
            <button className='flex items-center justify-center h-9 w-36 rounded-2xl transition-colors duration-400 font-[500] cursor-pointer bg-purple-600 hover:bg-purple-500/80'>
            <a href="/register">Create it here</a></button>
          </div>
        </div>
      </div>
    </PageWrapper>
    
  );
}
