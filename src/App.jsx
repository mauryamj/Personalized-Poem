import react, { useState, useEffect } from 'react'
import './App.css';
import { SparklesIcon } from '@heroicons/react/24/solid';

function App() {
  const [count, setCount] = useState(0);

  const themes = [
    {
      bg: 'bg-yellow-100',
      ptext: 'text-yellow-800',
      pline: 'text-yellow-700',
      title: 'text-yellow-500',
    },
    {
      bg: 'bg-green-100',
      ptext: 'text-green-900',
      pline: 'text-green-700',
      title: 'text-green-500',
    },
    {
      bg: 'bg-red-100',
      ptext: 'text-red-900',
      pline: 'text-red-700',
      title: 'text-red-500',
    },
    {
      bg: 'bg-blue-100',
      ptext: 'text-blue-900',
      pline: 'text-blue-700',
      title: 'text-blue-500',
    },
    {
      bg: 'bg-purple-100',
      ptext: 'text-purple-900',
      pline: 'text-purple-700',
      title: 'text-purple-500',
    },
  ];

  const [isEntered, setIsEntered] = useState(false);
  const [isInput, setIsInput] = useState('');

  const handleKeyDown = (e) =>{
    if( e.key === 'Enter'){
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
 const[poemLines , setPoemLines] = useState([]);

useEffect (()=>{
  fetch('/list.json')
  .then((res) => res.json())
  .then((data) => setPoemData(data))
  .catch((err) => console.error("eoor on json",err));
},[]);


  const [displayName , setDisplayName] = useState('');
  const [isIconClickedd, setIsIconClicked] = useState(false);

  return (
    <div className={`${theme.bg} p-3 min-h-screen overflow: hidden;
`}>
      <h2 className={`text-4xl font-bold ${theme.title}`}>Personalized <br/>Poetry</h2>
      <img src='/logo.png' className='h-16 fixed top-4 right-4 object-contain cursor-pointer rounded-full border border-black' onClick={() => setIsIconClicked(false)}/>
      <SparklesIcon onClick={handleClick} className='text-gray-900 h-7 align-text-top'/>
      <div>
        {isEntered ? (
          <div>
          <p className={`p-3 text-3xl font-bold ${theme.ptext}`}>{displayName}</p>
          {poemLines.map((item,index)=> (
            <p key={index} className='text-gray-900 p-2'>
            <span className={`font-bold ${theme.pline}`}>{item.letter} → </span>
            {item.line}
          </p>

          ))}
          </div>
        ) : (
          <p className="p-3 text-2xl font-bold text-gray-900">
            Welcome to this page. <span className={`${theme.pline}`}>Search for your name </span>
          </p>
          
        )
        }
        </div>
        <div className="flex items-center justify-center text-black p-7">
          {isIconClickedd ? (<p></p>
        ) : (
          <input
            type="text"
            className="h-10 w-64 rounded-2xl bg-white p-2.5 text-center border"
            placeholder="Enter the name"
            value ={isInput}
            onChange = {(e) => setIsInput(e.target.value)}
            
            onKeyDown={handleKeyDown}
            maxLength={15}
          />
          
        )
        }
          
        </div>      
    </div>

  )
}

export default App