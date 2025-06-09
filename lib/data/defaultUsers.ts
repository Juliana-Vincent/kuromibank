export interface User {
  uname: string;
  phone: string;
  password: string;
  balance: number;
}

export const defaultUsers: User[] = [
  { uname: "John", phone: "12345", password: "1234", balance: 1000 },
  { uname: "Ana", phone: "2345", password: "abcd", balance: 1600 },
  { uname: "Mina", phone: "345", password: "qwerty", balance: 800 }
];
