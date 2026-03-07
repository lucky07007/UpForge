// components/HomeClient.tsx
'use client';

import { useEffect } from 'react';

export default function HomeClient() {
  useEffect(() => {
    // Add any client-side interactions here
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
