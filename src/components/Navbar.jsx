import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {styles} from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { motion } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  };
  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${isScrolled ? "bg-primary" : "bg-transparent"}`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/" className='flex items-center gap-2' onClick={() => {setActive(""); window.scrollTo(0,0)}}> 
          <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} src={logo} alt="logo" className='w-9 h-9 object-contain'/>
          <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className='text-white text-[18px] font-bold cursor-pointer flex'> MED Akram &nbsp; <span className='sm:block hidden'>| Hlali</span></motion.p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((Link) => (
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} key={Link.id} className= {`${active=== Link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`} onClick={() => setActive(Link.title)}>
              <a href={`#${Link.id}`}>{Link.title}</a>
            </motion.li>
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
            <motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={() => setToggle(!toggle)}/>
            <motion.div initial="hidden" animate={toggle ? "visible" : "hidden"} variants={variants} transition={{duration: 0.8,delay: 0,ease: [0, 0.71, 0.2, 1.01]}} className={`${toggle ? 'flex': 'hidden'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
              <ul className='list-none flex justify-end items-start flex-col gap-4'>
                {navLinks.map((Link) => (
                  <li key={Link.id} className= {`${active=== Link.title ? "text-white" : "text-secondary"} font-poppins font-medium cursor-pointer text-[16px]`} onClick={() => {setToggle(!toggle) ;setActive(Link.title);}}>
                    <a href={`#${Link.id}`}>{Link.title}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar