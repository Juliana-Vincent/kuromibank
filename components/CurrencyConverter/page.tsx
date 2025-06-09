'use client';

import { useEffect, useState } from 'react';

const exchangeRates: Record<string, Record<string, number>> = {
  CZK: { USD: 0.045, EUR: 0.04, UAH: 1.89, GBP: 0.03, PLN: 0.17 },
  USD: { CZK: 21.96, EUR: 0.88, UAH: 41.67, GBP: 0.79, PLN: 3.74 },
  EUR: { CZK: 24.92, USD: 1.13, UAH: 47.28, GBP: 0.84, PLN: 4.24 },
  UAH: { CZK: 0.52, USD: 0.02, EUR: 0.02, GBP: 0.0178, PLN: 0.089 },
  GBP: { CZK: 29.56, USD: 1.346, EUR: 1.186, UAH: 56.09, PLN: 5.04 },
  PLN: { CZK: 5.865, USD: 0.267, EUR: 0.235, UAH: 11.12, GBP: 0.198 },
};

const currencies = [
  { code: 'CZK', label: '🇨🇿 CZK' },
  { code: 'UAH', label: '🇺🇦 UAH' },
  { code: 'EUR', label: '🇪🇺 EUR' },
  { code: 'USD', label: '🇺🇸 USD' },
  { code: 'GBP', label: '🇬🇧 GBP' },
  { code: 'PLN', label: '🇵🇱 PLN' },
];


const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('CZK');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState<string>('0');
  const [convertedAmount, setConvertedAmount] = useState<number | ''>('');

  useEffect(() => {
    if (!amount || fromCurrency === toCurrency) {
      setConvertedAmount(Number(amount));
      return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = Number((Number(amount) * rate).toFixed(2));
    setConvertedAmount(result);
  }, [amount, fromCurrency, toCurrency]);

  return (
      <div className="rounded-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_0_16px_0_rgba(0,0,0,0.5)] p-8 h-full flex flex-col justify-center items-center gap-4 text-white">
        <h3 className='text-purple-600 text-2xl'>Currency converter</h3>
        <select
          name="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="bg-transparent p-2 outline-0 w-full"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.label}
            </option>
          ))}
        </select>
        <input
          className="w-full p-2l border-b-[2px] border-solid border-white rounded-2xl px-5 h-8 text-purple-600 outline-0"
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
        />
        <select
          name="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="bg-transparent p-2 w-full outline-0"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.label}
            </option>
          ))}
        </select>
        <p className="text-xl font-semibold mt-4">
          {convertedAmount !== ''
            ? `${convertedAmount} ${toCurrency}`
            : 'Converted amount will appear here'}
        </p>
      </div>
  );
};

export default CurrencyConverter;
