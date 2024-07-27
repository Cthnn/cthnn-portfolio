

export const ContactBox = ({ ...props }) =>{
  
    return(
        <>
            <div style={{zIndex:1}} className="user-select-none w-[60%] h-[70%] bg-[#a0a0a0a6] rounded-xl flex justify-evenly items-center flex-col z-1">
                <form className="w-[80%] h-[80%] flex flex-col justify-evenly z-1">
                        <h2 style={{userSelect: "none"}} className='font-pixelify color-[#000000] text-[130%]'>Send Me A Message</h2>
                        <input type="text" placeholder="Name" required={true} className="w-full h-[10%] border-0 outline-none bg-[#ffc36dab] font-pixelify text-[100%] rounded-[10px] pl-[20px] placeholder-[#868686]"/>
                        <input type="text" placeholder="Email" required={true} className="w-full h-[10%] border-0 outline-none bg-[#ffc36dab] font-pixelify text-[100%] rounded-[10px] pl-[20px] placeholder-[#868686]"/>
                        <textarea rows={6} placeholder="Your Message" required={true} className="w-full h-[30%] border-0 outline-none bg-[#ffc36dab] font-pixelify text-[100%] rounded-[10px] pl-[20px] placeholder-[#868686] resize-none"/>
                        <div className='w-full h-[10%] flex flex-row justify-center'>
                            <button style={{ userSelect:"none" }} type="submit" className='bg-[#f7c15db4] text=[#000000] font-pixelify border-0 outline-non cursor-pointer w-[30%] rounded-[30px]'>Send</button>
                        </div>
                </form>
            </div>
        </>
    );
};
export default ContactBox;