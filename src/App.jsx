import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { FaInstagram, FaSearch } from 'react-icons/fa';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
import PartnerForm from './PartnerForm';
import ProductSearch from './ProductSearch';
import { trackPoemGeneration, trackDownload, trackPartnerClick, trackSocialClick } from './analytics';

function App() {
  const theme = {
    bg: 'bg-white',
    ptext: 'text-gray-800',
    pline: 'text-black',
    title: 'text-black',
    ntitle: 'text-black',
  };

  const products = [
    { id: 1, name: 'Tote Bag', image: '/bw_tote_sample.png' },
    { id: 2, name: 'Personalized T-Shirts', image: '/bw_tshirt_sample_1766195575263.png' },
    { id: 3, name: 'Mugs', image: '/bw_mug_sample_1766195589829.png' },
    { id: 4, name: 'Notebooks', image: '/bw_notebook_sample_1766195605616.png' },
    { id: 5, name: 'Gifts', image: '/bw_gift_sample_1766195618998.png' },
    { id: 6, name: 'Art Prints', image: '/bw_art_sample_1766195634004.png' },
  ];

  const [isEntered, setIsEntered] = useState(false);
  const [isInput, setIsInput] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [poemData, setPoemData] = useState({});
  const [poemLines, setPoemLines] = useState([]);
  const [showPartnerPage, setShowPartnerPage] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);


  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  useEffect(() => {
    // Check for logged in user
    const storedUser = localStorage.getItem('partnerUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    fetch('/list.json')
      .then((res) => res.json())
      .then((data) => setPoemData(data))
      .catch((err) => console.error("error on json", err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail) return;

    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      const user = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());

      if (user) {
        setCurrentUser(user);
        setShowLogin(false);
        setLoginEmail('');
        localStorage.setItem('partnerUser', JSON.stringify(user));
        alert(`Welcome back, ${user.businessName}!`);
      } else {
        alert('User not found. Please check your email or partner with us first.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setCurrentUser(null);
      localStorage.removeItem('partnerUser');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const name = isInput.trim().toUpperCase();
      if (!name) return;

      setDisplayName(isInput.charAt(0).toUpperCase() + isInput.slice(1).toLowerCase());

      // Generate Poem
      const result = [];
      for (const char of name) {
        if (/[A-Z]/.test(char)) {
          const charData = poemData[char];
          if (charData) {
            let lines = [];
            if (Array.isArray(charData)) {
              lines = charData;
            } else {
              const keys = Object.keys(charData);
              if (keys.length > 0) lines = charData[keys[0]];
            }

            if (lines && lines.length > 0) {
              const line = lines[Math.floor(Math.random() * lines.length)];
              result.push({ letter: char, line });
            } else {
              result.push({ letter: char, line: "[No line available]" });
            }
          } else {
            result.push({ letter: char, line: "[No line available]" });
          }
        }
      }

      setPoemLines(result);
      setIsEntered(true);
      setIsInput('');
      e.target.blur();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Track poem generation
      trackPoemGeneration(name);
    }
  };

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

        // Track download event
        trackDownload();
      })
      .catch((err) => {
        console.error("a problem ", err);
      });
  };

  if (showPartnerPage) {
    return <PartnerForm onBack={() => setShowPartnerPage(false)} />;
  }

  if (showSearchPage) {
    return <ProductSearch onBack={() => setShowSearchPage(false)} />;
  }

  return (
    <div className=''>
      <div className={`${theme.bg} p-4 h-screen w-screen overflow-auto flex flex-col`} ref={ref}>
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 sm:mb-8 relative">
          {/* Login/Logout Button */}
          <button
            onClick={() => currentUser ? handleLogout() : setShowLogin(true)}
            className="absolute top-0 right-20 text-xs font-bold underline hover:text-gray-600 no-export"
          >
            {currentUser ? 'Logout' : 'Partner Login'}
          </button>

          <div className="flex flex-col">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentUser ? currentUser.businessName : <>Personalized <br /> Poetry</>}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SparklesIcon className='text-black h-6 w-6 sm:h-8 sm:w-8 mt-2' />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-black flex items-center justify-center overflow-hidden bg-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              if (!currentUser) setShowLogin(true);
            }}
          >
            <img src={currentUser ? currentUser.logo : '/logo.png'} className='w-full h-full object-contain' />
          </motion.div>
        </div>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-export">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
              <h3 className="text-xl font-bold mb-4">Partner Login</h3>
              <p className="mb-4 text-sm text-gray-600">Enter your email to access your branded page.</p>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  <p className={`p-3 text-2xl sm:text-3xl xl:text-5xl font-bold ${theme.ntitle}`}>{displayName}</p>

                  {poemLines.map((item, index) => (
                    <p key={index} className="pl-7 text-base xl:text-2xl relative mb-3">
                      <span className={`absolute left-0 top-0 font-bold ${theme.pline}`}>
                        {item.letter} →
                      </span>
                      <span className={` xl:pl-10 ml-2 ${theme.ptext}`}>
                        {item.line}
                      </span>
                    </p>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className='no-export fixed bottom-4 sm:bottom-6 left-4 sm:left-6 px-4 py-2 sm:px-3 sm:py-3 bg-black text-white rounded-full font-medium flex items-center justify-center gap-2 shadow-lg z-50 min-w-[120px] sm:min-w-[140px] text-sm sm:text-base active:scale-95'
                  onClick={handleDownload}>
                  Download
                </motion.button>

              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 sm:mb-8"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-1">Welcome to this page.</h3>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-600">Search for your name</h3>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center w-full gap-4"
          >

            <div className="pb-24 sm:pb-32 w-full flex justify-center mt-1">
              <input
                type="text"
                className="h-11 sm:h-12 w-full max-w-xs rounded-full bg-white px-5 sm:px-6 text-center text-base sm:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 text-black no-export border border-gray-100"
                placeholder="Enter the name"
                value={isInput}
                onChange={(e) => setIsInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={15}
              />
            </div>
          </motion.div>
        </div>

        <div className='flex justify-center w-full'>
          {isEntered ? <p></p> :
            <div className="w-full">
              {/* Personalized Merchandise Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='w-full'
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 px-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black">Personalized Merchandise</h3>
                  <button
                    onClick={() => setShowSearchPage(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                    aria-label="Search products"
                  >
                    <FaSearch className="text-black w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-6 sm:pb-8 px-2 snap-x hide-scrollbar">
                  {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-28 sm:w-32 md:w-40 bg-white p-2 sm:p-3 rounded-xl shadow-md flex flex-col items-center snap-center">
                      <div className="w-full aspect-square bg-gray-200 rounded-lg mb-1.5 sm:mb-2 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60" />
                      </div>
                      <h3 className="font-bold text-[10px] sm:text-xs md:text-sm text-center leading-tight">{product.name}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Partner With Us Button */}
              <div className="flex justify-center mt-6 sm:mt-8 mb-20 sm:mb-24">
                <button
                  onClick={() => {
                    trackPartnerClick();
                    setShowPartnerPage(true);
                  }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-600 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  Partner With Us
                </button>
              </div>

            </div>
          }
        </div>
      </div>

      <motion.div className='absolute'>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className='fixed bottom-4 sm:bottom-6 right-4 sm:right-6 px-3 sm:px-1 py-2 sm:py-3 bg-black text-white rounded-full font-medium flex items-center justify-center gap-2 shadow-lg z-50 min-w-[120px] sm:min-w-[140px] text-sm sm:text-base active:scale-95'
          onClick={() => {
            trackSocialClick('instagram');
            window.open("https://www.instagram.com/personalized.poetry_/?igsh=MW85azI0cnVhbmZvNA%3D%3D#", "_blank");
          }}
        >
          <FaInstagram className='h-4 w-4 sm:h-5 sm:w-5' /> Follow Us
        </motion.button>
      </motion.div>
    </div>
  )
}


export default App