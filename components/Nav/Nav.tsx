'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import './styles.css'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext/page'
import { useMediaQuery } from '@uidotdev/usehooks'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function Nav(){
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isMobile = useMediaQuery('only screen and (max-width: 764px)');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Main' },
    { href: '/info', label: 'Info' },
    { href: '/contact', label: 'Contact' },
  ];
  
  return (
    <div
      className={`w-full z-50 fixed flex justify-center transition-colors ${
        !menuOpen && (scrolled || (isAuthPage && !isMobile))
          ? 'bg-[rgba(81,89,101,0.141)] backdrop-blur-md shadow-md'
          : 'backdrop-blur-0'}`}>
      <div className="container">
        <div className="py-8">
          <div className={isMobile ? 'flex justify-between' : "flex items-center"}>
            <div className="w-fit py-0 px-2 flex justify-center items-center">
              <a href="/" className="block">
                <Image
                  width={160}
                  height={50}
                  src="/img/sanrio-logo-white.svg"
                  alt="logo"
                />
              </a>
            </div>
            { isMobile ? 
            <><MenuIcon onClick={() => setMenuOpen(true)}  sx={{ fontSize: 50 }} fontSize="large" className='text-purple-400' /> 
            {menuOpen && (
              <div className="absolute min-h-250 inset-0 bg-black/50 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8">
              <CloseIcon sx={{ fontSize: 50 }} fontSize="large" 
                className="absolute top-8 right-12.5 text-purple-400"
                onClick={() => setMenuOpen(false)}
              />
          
              <nav className="main-menu">
                <ul className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <li
                      key={item.href}
                      className={pathname === item.href ? 'active' : 'mobile'}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
                </nav>

                {!user ? (
                  <> 
                    <a
                      href="/register"
                      className={['/', '/register', '/contact', '/info'].includes(pathname)
                      ? 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-purple-600 hover:bg-purple-500/80'
                      : 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-transparent hover:bg-purple-500/80'}>
                      Sign up
                    </a>
                    <a
                      href="/login"
                      className={pathname === '/login'
                      ? 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-purple-600 hover:bg-purple-500/80'
                      : 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-transparent hover:bg-purple-500/80'}>
                      Log in
                    </a>
                  </>
                ) : (
                  <button onClick={logout} className="aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-purple-600 ml-10 hover:bg-purple-500/80 text-white">
                    Logout
                  </button>
                )}
        </div>
                )
              }
              </>
            
            : 
              <div className="w-fit py-0 px-2 flex items-center justify-end flex-1">
                <nav className="main-menu">
                  <ul className="flex">
                    {navItems.map((item) => (
                      <li
                        key={item.href}
                        className={pathname === item.href ? 'active' : ''}>
                        <a href={item.href}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {!user ? (
                  <> 
                    <a
                      href="/register"
                      className={['/', '/register', '/contact', '/info'].includes(pathname)
                      ? 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-purple-600 hover:bg-purple-500/80'
                      : 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-transparent hover:bg-purple-500/80'}>
                      Sign up
                    </a>
                    <a
                      href="/login"
                      className={pathname === '/login'
                      ? 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-purple-600 hover:bg-purple-500/80'
                      : 'aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-transparent hover:bg-purple-500/80'}>
                      Log in
                    </a>
                  </>
                ) : (
                  <button onClick={logout} className="aNav flex items-center justify-center rounded-2xl transition-colors duration-400 uppercase cursor-pointer bg-purple-600 ml-10 hover:bg-purple-500/80 text-white">
                    Logout
                  </button>
                )}

              </div>
            }
                
              
            
          </div>
        </div>
      </div>
    </div>
  )
}