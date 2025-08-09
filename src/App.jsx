import react, { useState, useEffect, useRef } from 'react'
import './App.css';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { FaInstagram } from 'react-icons/fa';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
function App() {
  const [count, setCount] = useState(0);

  const themes = [
    {
      bg: 'bg-purple-100',
      ptext: 'text-green-900',
      pline: 'text-yellow-700',
      title: 'text-blue-500',
      ntitle: 'text-red-700',
    },
    {
      bg: 'bg-red-100',
      ptext: 'text-purple-900',
      pline: 'text-blue-700',
      title: 'text-green-500',
      ntitle: 'text-yellow-800',
    },
    {
      bg: 'bg-yellow-100',
      ptext: 'text-blue-900',
      pline: 'text-red-700',
      title: 'text-purple-500',
      ntitle: 'text-green-700',
    },
    {
      bg: 'bg-green-100',
      ptext: 'text-red-900',
      pline: 'text-purple-700',
      title: 'text-yellow-500',
      ntitle: 'text-blue-700',
    },
    {
      bg: 'bg-blue-100',
      ptext: 'text-yellow-800',
      pline: 'text-green-700',
      title: 'text-red-500',
      ntitle: 'text-purple-900',
    },
  ];


  const [isEntered, setIsEntered] = useState(false);
  const [isInput, setIsInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const name = isInput.trim().toUpperCase();
      setDisplayName(isInput.charAt(0).toUpperCase() + isInput.slice(1).toLowerCase());
      const result = [];
      handleClick();
      for (const char of name) {
        if (/[A-Z]/.test(char)) {
          const lines = poemData[char];
          if (lines && lines.length > 0) {
            const line = lines[Math.floor(Math.random() * lines.length)];
            result.push({ letter: char, line });
          } else {
            result.push({ letter: char, line: "[No line available]" });
          }
        }
      }

      setPoemLines(result);
      setIsEntered(true);
      setIsIconClicked(true);
      setIsInput(name);
      setIsInput('');
      e.target.blur();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {
    try {
      if (themes.length === 0) throw new Error("Theme list is empty");
      const random = themes[Math.floor(Math.random() * themes.length)];
      setTheme(random);
    } catch (error) {
      console.error("Failed to set theme:", error);
    }
  }, []);


  const handleClick = () => {
    const random = themes[Math.floor(Math.random() * themes.length)];
    setTheme(random);
  };

  const [poemData, setPoemData] = useState({});
  const [poemLines, setPoemLines] = useState([]);

  useEffect(() => {
    fetch('/list.json')
      .then((res) => res.json())
      .then((data) => setPoemData(data))
      .catch((err) => console.error("eoor on json", err));
  }, []);


  const [displayName, setDisplayName] = useState('');
  const [isIconClickedd, setIsIconClicked] = useState(false);
  const ref = useRef();
  const handleDownload = () => {
    if (ref.current === null) return;
    toPng(ref.current, {
      filter: (node) => !node.classList?.contains('no-export'),
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'personalized-image.png'
        link.href = dataUrl;
        link.click();
      }
      ).catch((err) => {
        console.error("a problem ", err);
      });
  };
  return (
    <div className=''>
      <div className={`${theme.bg} p-3 h-screen w-screen overflow-auto `} ref={ref}>
        <motion.h2 className={`text-4xl font-bold ${theme.title}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >Personalized <br className='xl:hidden' />Poetry</motion.h2>
        <motion.img
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src='/logo.png' className='h-16 fixed top-4 right-4 object-contain cursor-pointer rounded-full border border-black' />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SparklesIcon onClick={handleClick} className='text-gray-900 h-7 align-text-top' /></motion.div>
        <div className='xl:flex xl:flex-wrap xl:gap-5 xl:pl-10 '>
          <div>
            {isEntered ? (
              <div className=''>
                <motion.div
                initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                <p
                  
                  className={`p-3 text-3xl font-bold xl:text-5xl ${theme.ntitle}`}>{displayName}</p>
                {poemLines.map((item, index) => (
                  <p key={index} className="pl-7 text-base xl:text-2xl relative mb-3">
                    <span className={`absolute left-0 top-0 font-bold ${theme.pline}`}>
                      {item.letter} →
                    </span>
                    <span className={` xl:pl-10 ml-2 ${theme.ptext}`}>
                      {item.line}
                    </span>
                  </p>
                  

                ))}</motion.div>
                <motion.button
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className='no-export fixed bottom-4 left-4 object-contain p-2 flex justify-center gap-2 text-white bg-slate-800 cursor-pointer rounded-full border border-black active:bg-blue-600  hover:text-black hover:bg-white' onClick={handleDownload}>download</motion.button>

              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-3 xl:text-5xl text-2xl xl:pt-40 font-bold text-gray-900">
                Welcome to this page. <span className={`${theme.pline}`}><br />Search for your name </span>
              </motion.p>

            )
            }
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed flex items-center justify-center  text-black p-7 xl:pt-40 xl:right-96">
            <input
              type="text"
              className="h-10 w-64 rounded-2xl bg-white p-2.5 text-center border no-export "
              placeholder="Enter the name"
              value={isInput}
              onChange={(e) => setIsInput(e.target.value)}

              onKeyDown={handleKeyDown}
              maxLength={15}
            />

          </motion.div>
        </div>
        <div className='flex justify-center'>
          {isEntered ? <p></p> :
            <div>
              <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className=' p-2  text-red-700 font-bold text-4xl text-center pt-32 m-5'>Personalized Merchandise</motion.p>

              <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className=' p-2 text-green-700 font-bold text-4xl m-5  pt-10 text-center'>Partner With <br className='xl:hidden' /> Us</motion.p><br />

            </div>
          }
        </div>
      </div>
      <motion.div
        className='absolute'
      >
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='fixed bottom-4 right-4 object-contain p-2 flex justify-center gap-2 bg-slate-800 cursor-pointer rounded-full border text-white border-black active:bg-blue-600  hover:text-black hover:bg-white' onClick={() => location = "https://www.instagram.com/personalized.poetry_/?igsh=MW85azI0cnVhbmZvNA%3D%3D#"}><FaInstagram className='h-6' /> Follow Us</motion.button>

      </motion.div>
    </div>

  )
}

export default App