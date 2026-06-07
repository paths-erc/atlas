import { useState, useEffect } from 'react';

/**
 * ScrollToTop — shows a fixed button after scrolling past `showUnder` px;
 * clicking it smoothly scrolls back to the top.
 * Drop-in replacement for the abandoned react-scroll-up package.
 */
export default function ScrollToTop({ showUnder = 160, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showUnder);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showUnder]);

  if (!visible) return null;

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ position: 'fixed', bottom: '2rem', right: '2rem', cursor: 'pointer', zIndex: 9999 }}
    >
      {children}
    </div>
  );
}
