

export const AboutBox = ({ ...props }) =>{
  
    return(
        <>
            <div style={{zIndex:1}} className="w-[90%] h-[73%] border-2 border-[#ffff00] rounded-xl mt-[1%] flex justify-center flex-col items-center z-1 md:w-3/4 md:h-1/10">
                <div className="user-select-none w-[99%] h-[99%] bg-[#5c5c5cb3] rounded-xl flex justify-evenly items-center flex-col z-1 md:flex-row-reverse">
                    <img style={{userSelect: "none"}} src="/masked.png" className="w-[min(45cqw,45cqh)] z-1"/>
                    <div className="w-[min(80cqw,80cqh)] h-[min(40cqw,40cwh)] flex flex-col justify-around items-center md:w-[min(50cqw,50cqh)] md:h-[80%]">
                        <h1 style={{userSelect: "none"}} className="text-[min(3cqw,3cqh)] font-pixelify text-[#ffff00] underline underline-offset-[1%] underline-thickness-[1%]">About Me</h1>
                        <p style={{userSelect: "none"}} className="font-pixelify text-[#ffff00] text-[min(1cqw,1cqh)] md:text-[min(1.2cqw,1.5cqh)]">Hello! My name is Ethan Cheung and welcome to my portfolio. Firstly, let me introduce myself as a Software Developer. I have experience building industry leading software in Cloud Infrastructure, MLOps, Cybersecurity & Privacy, Data Science, and AI & Machine Learning. Most recently, I am working as a Platform Engineer at Agility Robotics.</p>
                        <p style={{userSelect: "none"}} className="font-pixelify text-[#ffff00] text-[min(1cqw,1cqh)] md:text-[min(1.2cqw,1.5cqh)]">Now for the interesting part. You're probably wondering "What's up with the clouds?". Well that's simple, my Chinese name means Smiling Cloud. As you continue to explore my portfolio, I want to share an experience that represents myself and to share a mix of my passions. I'm excited about creating impactful software and like to make it fun along the way. On my freetime you'll catch me keeping up with the latest in AR/VR & Graphics technology, taking pictures, running with my Husky or practicing my juggling skills with the Diabolo. I'm excited to be sharing an experience through my portfolio showcasing my passion and creativity for building software.</p>
                        <p style={{userSelect: "none"}} className="font-pixelify text-[#ffff00] text-[min(1cqw,1cqh)] md:text-[min(1.2cqw,1.5cqh)]">Ethan Cheung</p>
                        <p style={{userSelect: "none"}} className="font-pixelify text-[#ffff00] text-[min(1cqw,1cqh)] md:text-[min(1.2cqw,1.5cqh)]">P.S. Press the logo to spawn some more clouds</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AboutBox;