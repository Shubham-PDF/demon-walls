import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
function App() {
  let [showContent , setShowContent] = useState(false);
  useGSAP(()=>{
    const tl = gsap.timeline()
    tl.to(".demon-mask-group",{
      scale: 10,
      duration: 5,
      ease: "Expo.easeInOut",
      transformOrigin:"50% 50%",
      opacity:0,
      //after the completion of the animation , we remove the front screen which shows the name of the demon slayer 
      // using the onUpdate
      onUpdate: function(){
        if(this.progress() >= .9){
          document.querySelector('.svg').remove();
          setShowContent(true);
          this.kill();// kill the current timeline 
        }
      }
    });
  });

  //now for the mouse effect / parallax effect 
  useGSAP(()=>{
    const main = document.querySelector('.main');

    main?.addEventListener("mousemove",(e)=>{
      const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
      const moveY = (e.clientY / window.innerHeight -0.5) *40;
      gsap.to(".text",{
        x: `${moveX*0.2}%`,
        y: `${moveY*0.2}%`
      })      
      gsap.to(".inosuke",{
        x: `${-moveX*0.2}%`,
        y: `${-moveY*0.2}%`
      })      
      gsap.to(".inosukeBG",{
        x: `${moveX * 0.1}%`,
        y: `${moveY *0.1}%`
      })      
    });
  },[showContent]);


  return (
    <>

      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg width ="100%" height= "100%">
          <defs>
            <mask id="demonMask">
              <rect width="80%" height="80%" fill="black" />
              <g className="demon-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="100"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  fontWeight="450"
                >
                  鬼滅の刃
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="src\assets\bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#demonMask)"
          />
        </svg>
      </div>
      {/* the loading part is complete now we work further with the parallax effect */}
      {showContent && 
        // whenever the show content is true it will begin working 
        <div className= "main w-full h-screen hide-scrollbar overflow-scroll">
          <div className="landing w-full h-screen">
            <div className="navbar absolute z-[10] top-0 left-0 w-full py-10 px-10">
              <h3 className="text-3xl text-white font-semibold">鬼滅の刃</h3>
            </div>
            <div className="relative imagesdiv h-screen w-full">
              {/* //background */}
              <img className= "inosukeBG absolute top-0 left-0 w-full h-full object-cover overflow-hidden scale-110" src="src\assets\bg.png " />
              <div className='text text-white left-1/3 top-1/4 z-[9] flex flex-col absolute '>
                <h1 className="text-7xl leading-none font-mono drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]">INOSUKE</h1>
                <h1 className="text-7xl leading-none ml-10 font-mono">HASHIBIRA</h1>
                <h1 className="text-2xl  ml-10 font-mono font-bold">(伊之助)</h1>
              </div>
              <img className= "inosuke z-[10] absolute bottom-0 left-1/2 -translate-x-1/2 w-fit h-full object-cover scale-85 overflow-hidden drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]" src="src\assets\inosuke.png " />
            </div>
            <div className="btmbar absolute -bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-13"></div>
          </div>
        </div>

      }
    </>
  )
}

export default App