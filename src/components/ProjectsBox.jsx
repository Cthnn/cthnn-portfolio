import { useState } from 'react';
const images = [
    "/portfolio.png",
    "/car.png",
    "/fs.png",
    "/redistrictor.png",
]
const projects = [
    "Cthnn Portfolio",
    "NVIDIA Self-Driving Car",
    "Flight Simulator",
    "Colts Redistrictor",
]
const desc = [
    "Welcome to my portfolio!! I am so excited for you to explore my portfolio and learn more about me and my work as a developer. You might be wondering \"what's up with all the clouds\" though. I added interactive clouds because my middle name means smiling cloud in Chinese. This was developed with React Three Fiber.",
    "A project I led during my undergraduate research. The goal was to build a low-budget self driving car with an NVIDIA Jetson Nano and a lightweight steering angel prediction model. This project implemented a CNN architecture from an NVIDIA research paper using Pytorch and OpenCV.",
    "This program is a flight simulator allowing users to traverse a 3D environment using keyboard controls. I built this as an exploration into graphics development using OpenGL and GLSL which I later expanded into a simulator to gather training data.",
    "A React web application with a Java Spring Boot backend for adjusting state district boundaries to minimize the effects of gerrymandering. GeoJSON boundaries were redrawn using Shapely's Python library on an HPC.",
]
const gh_link = [
    "https://github.com/Cthnn/cthnn-portfolio",
    "https://github.com/Cthnn/VIP-Autonomous-Car",
    "https://github.com/Cthnn/Flight-Simulation",
    "https://github.com/Cthnn/CSE-416-Colts",


]
export const ProjectsBox = ({ ...props }) =>{
    const [ cardNum, setCardNum ] = useState(0);

    const goRight = (e) =>{
        if(cardNum < projects.length-1){
            setCardNum(cardNum+1);  
        }
    }
    const goLeft = (e) =>{
        if(cardNum > 0){
            setCardNum(cardNum-1);
        }
    }
    const goToProjectPage = (e) =>{
        window.location.href = gh_link[cardNum];
    };
    return(
        <>
            <div style={{zIndex:1}} className="w-[90%] h-[60%] border-2 border-[#d4af37] rounded-xl mt-[1%] flex justify-center flex-col items-center z-1 md:w-3/4 md:h-1/10">
                <div className="user-select-none w-[99%] h-[99%] bg-[#5c5c5cb3] rounded-xl flex justify-evenly flex-row-reverse items-center z-1 md:justify-center">
                    {cardNum == projects.length-1 ? <div className="w-[min(5cqw,5cqh)] h-[min(5cqw,5cqh)]"></div> : <svg onPointerDown={goRight} style={{ zIndex: 1, transform:'scaleX(-1)' }} className="w-[min(5cqw,5cqh)] h-[min(5cqw,5cqh)] fill-[#d4af37]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.92 135.85"><path d="M124.82,211.81c4.6,7.68,21,8.56,21.7,9.58.24.33-.86,1.74-1,2.11-1,2.06-4.87-.94-21.55,4.44,0,0-73.41,25.21-69.37,53.09,6.84,47.14,74.56,36.8,165.88,12.22,3.2-.87-16.62-5.92-19.68-4.61-19.54,8.34-67.72,27.28-119.56,12.85-14.64-4.07-21.08-17-19.65-21.19,5.75-17,64.87-55.47,109.94-53.71,2.1.08,6.16-8.08,3.67-6.67-9.57,5.38-39.43-5.48-44-16-1.17-2.67,6.34-5.42,8.12-6.28,56.14-27.09,69.75,16.15,74,4.51,0,0-11-16.48-32-21.24a64.12,64.12,0,0,0-45.46,8.45c-8.11,5.06-10.29,9.71-11.13,12.58C124,204,122.73,208.33,124.82,211.81Z" transform="translate(-54.44 -178.19)"/><path d="M306.84,206c.38.36,3.19,6.33,3,5.85-5.27-11.12-27.32-52.79-78.59-23.33-58.9,33.84-59.71,122.29,0,113s109.46-57.34,182.63-31-36.29-31.61-86-11.12c-195.72,80.5-121.84-48.75-92.57-57.53,87.74-26.33,68.44,62.16,77.22,15.92Z" transform="translate(-54.44 -178.19)"/></svg>}
                    <div className="user-select-none w-[min(50cqw,105cqh)] h-[99%] flex justify-center items-center flex-col z-1 md:justify-around md:flex-row-reverse">
                        <img onPointerDown={goToProjectPage} style={{ zIndex: 1, userSelect:"none" }} className="w-[min(25cqw,25cqh)] z-1" src={images[cardNum]}/>
                        <div className="w-full h-[min(30cqw,30cqh)] flex flex-col justify-center items-center md:w-[48%] md:h-[90%]">
                            <h1 onPointerDown={goToProjectPage} style={{userSelect: "none"}} className="w-full text-center text-[6vmin] font-pixelify text-[#d4af37] underline underline-offset-[1%] underline-thickness-[1%]">{projects[cardNum]}</h1>
                            <p style={{overflowY:"auto", userSelect: "none"}} className="w-full text-center font-pixelify text-[#d4af37] text-[3vmin] md:text-[2vmin]">{desc[cardNum]}</p>
                        </div>
                    </div>
                    {cardNum == 0 ? <div className="w-[min(5cqw,5cqh)] h-[min(5cqw,5cqh)]"></div> : <svg onPointerDown={goLeft} style={{ zIndex: 1 }} className="w-[min(5cqw,5cqh)] h-[min(5cqw,5cqh)] fill-[#d4af37]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.92 135.85"><path d="M124.82,211.81c4.6,7.68,21,8.56,21.7,9.58.24.33-.86,1.74-1,2.11-1,2.06-4.87-.94-21.55,4.44,0,0-73.41,25.21-69.37,53.09,6.84,47.14,74.56,36.8,165.88,12.22,3.2-.87-16.62-5.92-19.68-4.61-19.54,8.34-67.72,27.28-119.56,12.85-14.64-4.07-21.08-17-19.65-21.19,5.75-17,64.87-55.47,109.94-53.71,2.1.08,6.16-8.08,3.67-6.67-9.57,5.38-39.43-5.48-44-16-1.17-2.67,6.34-5.42,8.12-6.28,56.14-27.09,69.75,16.15,74,4.51,0,0-11-16.48-32-21.24a64.12,64.12,0,0,0-45.46,8.45c-8.11,5.06-10.29,9.71-11.13,12.58C124,204,122.73,208.33,124.82,211.81Z" transform="translate(-54.44 -178.19)"/><path d="M306.84,206c.38.36,3.19,6.33,3,5.85-5.27-11.12-27.32-52.79-78.59-23.33-58.9,33.84-59.71,122.29,0,113s109.46-57.34,182.63-31-36.29-31.61-86-11.12c-195.72,80.5-121.84-48.75-92.57-57.53,87.74-26.33,68.44,62.16,77.22,15.92Z" transform="translate(-54.44 -178.19)"/></svg>}
                </div>
            </div>
        </>
    );
};
export default ProjectsBox;