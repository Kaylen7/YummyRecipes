'use client'
import { useState, useEffect } from 'react';
import styles from './topArrow.module.css'

export function TopArrow(){
  const [ isVisible, setIsVisible ] = useState(false);
  const [ prevScrollPos, setPrevScrollPos ] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScrollPos == 0) {
        setPrevScrollPos(0);
        setIsVisible(false);
      }
      if (currentScrollPos > 150) {
        setIsVisible(prevScrollPos < currentScrollPos || currentScrollPos > maxHeight / 2);
      }
      setPrevScrollPos(currentScrollPos);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

    return (
      <>
      {isVisible && <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 -2.75 24 24"
      className={styles.topArrow}
      onClick={scrollToTop}
    >
      {
        <path d="M15 2l7 7-7 7" />
      }
    </svg>}
      </>
    )
  }