import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import AboutBox from './components/AboutBox';
import Default from './components/Default';
import ProjectsBox from './components/ProjectsBox';
import ContactBox from './components/ContactBox';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const [ clicks, setClicks ] = useState(0);
  const [mouseDown, setMouseDown] = useState(0);
  const [currentPage, setCurrentPage] = useState('/');
  const [ pointerX, setPointerX ] = useState(0);
  const [ pointerY, setPointerY ] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (currentPage != path){
      setClicks(0);
    };
    setCurrentPage(path);
  }, [location]);
  const logoClick = (e) => {
    setClicks(clicks+1);
  }
  const pointerDown = (e) =>{
    setMouseDown(1);
  }
  const pointerUp = (e) =>{
    setMouseDown(0);
  }
  const pointerMove = (e) =>{
    setPointerX((e.clientX/window.innerWidth)*2 - 1);
    setPointerY(-(e.clientY/window.innerHeight) * 2 + 1);
  }
  return (
    <>
      <div onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerMove={pointerMove} style={{touchAction:"none"}} className='relative w-full h-full'>
        <div className="absolute flex w-full h-full ">
            <div className="absolute flex w-full h-full flex-col items-center justify-around">
              <div className="flex w-full flex-col items-center">
                <Routes>
                  <Route path="/" element={<svg onPointerDown={logoClick} style={{ zIndex: 1, userSelect:"none" }} className="w-[40vmin] fill-[#ffffff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.92 135.85"><path d="M124.82,211.81c4.6,7.68,21,8.56,21.7,9.58.24.33-.86,1.74-1,2.11-1,2.06-4.87-.94-21.55,4.44,0,0-73.41,25.21-69.37,53.09,6.84,47.14,74.56,36.8,165.88,12.22,3.2-.87-16.62-5.92-19.68-4.61-19.54,8.34-67.72,27.28-119.56,12.85-14.64-4.07-21.08-17-19.65-21.19,5.75-17,64.87-55.47,109.94-53.71,2.1.08,6.16-8.08,3.67-6.67-9.57,5.38-39.43-5.48-44-16-1.17-2.67,6.34-5.42,8.12-6.28,56.14-27.09,69.75,16.15,74,4.51,0,0-11-16.48-32-21.24a64.12,64.12,0,0,0-45.46,8.45c-8.11,5.06-10.29,9.71-11.13,12.58C124,204,122.73,208.33,124.82,211.81Z" transform="translate(-54.44 -178.19)"/><path d="M306.84,206c.38.36,3.19,6.33,3,5.85-5.27-11.12-27.32-52.79-78.59-23.33-58.9,33.84-59.71,122.29,0,113s109.46-57.34,182.63-31-36.29-31.61-86-11.12c-195.72,80.5-121.84-48.75-92.57-57.53,87.74-26.33,68.44,62.16,77.22,15.92Z" transform="translate(-54.44 -178.19)"/></svg>} />
                  <Route path="/about" element={<svg onPointerDown={logoClick} style={{ zIndex: 1, userSelect:"none" }} className="w-[40vmin] fill-[#ffff00]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.92 135.85"><path d="M124.82,211.81c4.6,7.68,21,8.56,21.7,9.58.24.33-.86,1.74-1,2.11-1,2.06-4.87-.94-21.55,4.44,0,0-73.41,25.21-69.37,53.09,6.84,47.14,74.56,36.8,165.88,12.22,3.2-.87-16.62-5.92-19.68-4.61-19.54,8.34-67.72,27.28-119.56,12.85-14.64-4.07-21.08-17-19.65-21.19,5.75-17,64.87-55.47,109.94-53.71,2.1.08,6.16-8.08,3.67-6.67-9.57,5.38-39.43-5.48-44-16-1.17-2.67,6.34-5.42,8.12-6.28,56.14-27.09,69.75,16.15,74,4.51,0,0-11-16.48-32-21.24a64.12,64.12,0,0,0-45.46,8.45c-8.11,5.06-10.29,9.71-11.13,12.58C124,204,122.73,208.33,124.82,211.81Z" transform="translate(-54.44 -178.19)"/><path d="M306.84,206c.38.36,3.19,6.33,3,5.85-5.27-11.12-27.32-52.79-78.59-23.33-58.9,33.84-59.71,122.29,0,113s109.46-57.34,182.63-31-36.29-31.61-86-11.12c-195.72,80.5-121.84-48.75-92.57-57.53,87.74-26.33,68.44,62.16,77.22,15.92Z" transform="translate(-54.44 -178.19)"/></svg>} />
                  <Route path="/projects" element={<svg onPointerDown={logoClick} style={{ zIndex: 1, userSelect:"none" }} className="w-[40vmin] fill-[#d4af37]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.92 135.85"><path d="M124.82,211.81c4.6,7.68,21,8.56,21.7,9.58.24.33-.86,1.74-1,2.11-1,2.06-4.87-.94-21.55,4.44,0,0-73.41,25.21-69.37,53.09,6.84,47.14,74.56,36.8,165.88,12.22,3.2-.87-16.62-5.92-19.68-4.61-19.54,8.34-67.72,27.28-119.56,12.85-14.64-4.07-21.08-17-19.65-21.19,5.75-17,64.87-55.47,109.94-53.71,2.1.08,6.16-8.08,3.67-6.67-9.57,5.38-39.43-5.48-44-16-1.17-2.67,6.34-5.42,8.12-6.28,56.14-27.09,69.75,16.15,74,4.51,0,0-11-16.48-32-21.24a64.12,64.12,0,0,0-45.46,8.45c-8.11,5.06-10.29,9.71-11.13,12.58C124,204,122.73,208.33,124.82,211.81Z" transform="translate(-54.44 -178.19)"/><path d="M306.84,206c.38.36,3.19,6.33,3,5.85-5.27-11.12-27.32-52.79-78.59-23.33-58.9,33.84-59.71,122.29,0,113s109.46-57.34,182.63-31-36.29-31.61-86-11.12c-195.72,80.5-121.84-48.75-92.57-57.53,87.74-26.33,68.44,62.16,77.22,15.92Z" transform="translate(-54.44 -178.19)"/></svg>}/>
                  <Route path="/contact" element={<svg onPointerDown={logoClick} style={{ zIndex: 1, userSelect:"none" }} className="w-[40vmin] fill-[#ffe4b3]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.92 135.85"><path d="M124.82,211.81c4.6,7.68,21,8.56,21.7,9.58.24.33-.86,1.74-1,2.11-1,2.06-4.87-.94-21.55,4.44,0,0-73.41,25.21-69.37,53.09,6.84,47.14,74.56,36.8,165.88,12.22,3.2-.87-16.62-5.92-19.68-4.61-19.54,8.34-67.72,27.28-119.56,12.85-14.64-4.07-21.08-17-19.65-21.19,5.75-17,64.87-55.47,109.94-53.71,2.1.08,6.16-8.08,3.67-6.67-9.57,5.38-39.43-5.48-44-16-1.17-2.67,6.34-5.42,8.12-6.28,56.14-27.09,69.75,16.15,74,4.51,0,0-11-16.48-32-21.24a64.12,64.12,0,0,0-45.46,8.45c-8.11,5.06-10.29,9.71-11.13,12.58C124,204,122.73,208.33,124.82,211.81Z" transform="translate(-54.44 -178.19)"/><path d="M306.84,206c.38.36,3.19,6.33,3,5.85-5.27-11.12-27.32-52.79-78.59-23.33-58.9,33.84-59.71,122.29,0,113s109.46-57.34,182.63-31-36.29-31.61-86-11.12c-195.72,80.5-121.84-48.75-92.57-57.53,87.74-26.33,68.44,62.16,77.22,15.92Z" transform="translate(-54.44 -178.19)"/></svg>}/>
                </Routes>
                <Routes>
                  <Route path="/" element={<Navbar path={"home"}/>} />
                  <Route path="/about" element={<Navbar path={"about"}/>} />
                  <Route path="/projects" element={<Navbar path={"projects"}/>} />
                  <Route path="/contact" element={<Navbar path={"contact"}/>} />
                </Routes>
              </div>
              <Routes>
                <Route path="/" element={<div className="w-[90%] h-[72%] md:w-[75%] md:h-[60%]"/>}/> 
                <Route path="/about" element={<AboutBox/>} />
                <Route path="/projects" element={<ProjectsBox />} />
                <Route path="/contact" element={<ContactBox />} /> 
              </Routes>
            </div>
            <Routes>
              <Route path="/" element={<Home x={pointerX} y={pointerY} mousedown={mouseDown} clicks={clicks}/>} />
              <Route path="/about" element={<Default x={pointerX} y={pointerY} mousedown={mouseDown} clicks={clicks} className={'bg-about mx-auto flex w-full h-full flex-col flex-wrap items-center'} theme={"about"}/>} />
              <Route path="/projects" element={<Default x={pointerX} y={pointerY} mousedown={mouseDown} clicks={clicks} className={'bg-projects mx-auto flex w-full h-full flex-col flex-wrap items-center'} theme={"projects"}/>} />
              <Route path="/contact" element={<Default x={pointerX} y={pointerY} mousedown={mouseDown} clicks={clicks} className={'bg-contact mx-auto flex w-full h-full flex-col flex-wrap items-center'} theme={"contact"}/>} /> 
            </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
