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
            <div className="w-4/5 flex flex-row justify-around ">
                <Link to="/" style={{ zIndex: 1, color:navColor, userSelect: "none"}} className="font-pixelify no-underline text-[5vmin] text-[#ffffff]">Home</Link>
                <Link to="/about" style={{ zIndex: 1, color:navColor, userSelect: "none"}} className="font-pixelify no-underline text-[5vmin] text-[#ffffff]">About</Link>
                <Link to="/projects" style={{ zIndex: 1, color:navColor, userSelect: "none" }} className="font-pixelify no-underline text-[5vmin] text-[#ffffff]">Projects</Link>
                <Link to="/contact" style={{ zIndex: 1, color:navColor, userSelect: "none" }} className="font-pixelify no-underline text-[5vmin] text-[#ffffff]">Contact</Link>
            </div>
        </>
    );
};
export default Navbar;