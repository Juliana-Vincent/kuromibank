'use client';

import dynamic from 'next/dynamic';

// Dynamically load Nav with SSR disabled
const Nav = dynamic(() => import('../Nav/Nav'), { ssr: false });

export default function ClientNavWrapper() {
  return <Nav />;
}
