export const ProjectsBox = ({ ...props }) =>{
  
    return(
        <>
            <div style={{zIndex:1}} className="w-[90%] h-[73%] border-2 border-[#ffff00] rounded-xl mt-[1%] flex justify-center flex-col items-center z-1 md:w-3/4 md:h-1/10">
                <div className="user-select-none w-[99%] h-[99%] bg-[#5c5c5cb3] rounded-xl flex justify-evenly items-center flex-col z-1 md:flex-row-reverse">
                    <img style={{ zIndex: 1, userSelect:"none" }} src="/under_construction.gif" className="w-[min(45cqw,45cqh)] z-1"/>
                    <img style={{ zIndex: 1, userSelect:"none" }} src="/gh.gif" className="w-[min(45cqw,45cqh)] z-1"/>
                </div>
            </div>
        </>
    );
};
export default ProjectsBox;