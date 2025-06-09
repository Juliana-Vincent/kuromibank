'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../../css/auth.css';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';

interface User {
  phone: string;
  password: string;
  balance: number;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = (e: React.FormEvent) => {
    e.preventDefault();

    const { phone, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some(u => u.phone === phone);

    if (exists) {
      alert("Phone already exists.");
      return;
    }

    users.push({ phone, password, balance: 0 });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registered successfully!");
    router.push('/login');
  };

  return (
    <div className="content h-full flex items-center justify-center">
      <div className="box">
        <h2 className="text-4xl text-purple-600 font-bold text-center mt-4">Create an account</h2>
        <form className='max-w-[400px] w-full' onSubmit={register}>
          <div className="input-box">
            <input
              type="text"
              name="name"
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
              name="phone"
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
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <LockIcon className="i cursor-pointer"
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}/>
          </div>
          
          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <LockIcon className="i cursor-pointer"
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}/>
          </div>
          
          <button type="submit" className="flex m-auto items-center justify-center h-9 w-36 rounded-2xl transition-colors text-white duration-400 font-[500] cursor-pointer bg-purple-600 hover:bg-purple-500/80">
            Register
          </button>
        </form>
        <div className="jump-to-login mt-6">
          <p className="text-sm">Already have an account?</p>
          <button className='flex items-center justify-center h-9 w-36 rounded-2xl transition-colors duration-400 font-[500] cursor-pointer bg-purple-600 hover:bg-purple-500/80 '>
            <a href="/login">Login here</a></button>
        </div>
      </div>
    </div>
  );
}
