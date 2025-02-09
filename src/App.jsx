import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from './assets/monitor.svg'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Loader from './components/loader';
// import { ReactLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger);

function App() {
  
  
  
  useGSAP(()=>{
    gsap.from("#text h1",{
      scale:3.9,
      x:-15,
      y:-100,
      scrollTrigger:{
        start:0,
        end:200,
        trigger:"#text h1",
        pin:true,
        scrub:true
      }
    })

    gsap.from("#text p",{
      scale:3.9,
      scrollTrigger:{
        start:0,
        end:200,
        trigger:"#text p",
        pin:true,
        scrub:true
      }
    })

    gsap.from("#text #text-para",{
      x:-10,
      y:180,
      scrollTrigger:{
        start:0,
        end:200,
        trigger:"#text #text-para",
        pin:true,
        scrub:true
      }
    })

    gsap.from("#landingPage img",{
      scale:3.9,
      top:-20,
      left:5,
      scrollTrigger:{
        start:0,
        end:200,
        trigger:"#landingPage img",
        pin:true,
        scrub:true
      }
    })
  })
  

  // use useRef for multiple same elements

    // const [val,newVal] = useState(0);
    // useEffect(()=>{
    //   newVal(1000);
    // })
    // const boxRef = useRef();
    // useGSAP(()=>{
    //   gsap.to(boxRef.current,{
    //     x:val,
    //     duration:2,
    //     delay:1
    //   })
    // },[val])


    

  return (
    // <ReactLenis options={{ autoRaf: false, syncScroll: true, smoothTouch: true, lerp: 0.1 }} ref={lenisRef}>


      <main>
        {/* <div id="box" ref={boxRef} className='h-32 w-32 bg-amber-500 rounded-sm m-10'>

        </div> */}
        <Loader></Loader>

          <div id="landingPage" className='h-screen relative top-0 -z-1 left-0 w-screen grid-flow-dense'>
              <img className='h-screen w-full scale-100' src={image} alt="sahil adit" />
              <div id="text" className='fixed left-0'>
                <h1 className='text-5xl relative -top-20 -left-24'>Sahil Adit</h1>
                <p className='text-2xl relative -top-20 -left-24'>Full Stack</p>
                <div id="text-para" className='text-3xl -left-10 -top-32 relative rotate-3'><p className='p-24 border-2 border-amber-50 top-0 relative rounded-b-sm bg-sky-200'>Web Developer</p></div>
              </div>
          </div>
          <div className='h-full w-full relative top-full left-0 bg-red-200'>

          </div>
      </main>
      // </ReactLenis>
  )
}

export default App
