import { Link } from 'react-router-dom';

const colorMap = {
    "home": "#ffffff",
    "about": "#ffff00",
    "projects": "#d4af37",
    "contact": "#ffe4b3",
};

export const Navbar = ({ ...props }) =>{  
    const { path } = props;
    const navColor = colorMap[path];
    return(
        <>
            <div className="w-2/5 h-1/10 flex flex-row justify-around ">
                <Link to="/" style={{ zIndex: 1, color:navColor, userSelect: "none"}} className="font-pixelify no-underline text-[min(2vw,3vh)] text-[#ffffff]">Home</Link>
                <Link to="/about" style={{ zIndex: 1, color:navColor, userSelect: "none"}} className="font-pixelify no-underline text-[min(2vw,3vh)] text-[#ffffff]">About</Link>
                <Link to="/projects" style={{ zIndex: 1, color:navColor, userSelect: "none" }} className="font-pixelify no-underline text-[min(2vw,3vh)] text-[#ffffff]">Projects</Link>
                <Link to="/contact" style={{ zIndex: 1, color:navColor, userSelect: "none" }} className="font-pixelify no-underline text-[min(2vw,3vh)] text-[#ffffff]">Contact</Link>
            </div>
        </>
    );
};
export default Navbar;