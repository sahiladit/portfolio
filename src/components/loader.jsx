// import React, { useEffect } from "react";
// import gsap from "gsap";
// import myImage from "../assets/myimage.jpeg"; // ✅ Correct way to import assets
// import meteor1 from "../assets/meteor3.png";
// import meteor2 from "../assets/meteor4.png";
// import "./loadercss.css";

// const Loader = () => {
//   useEffect(() => {
//     const tl = gsap.timeline();

//     tl.fromTo("#meteor1",
//         { x: "10vw", y: "-200vh", rotation: 0, scale: 1 },
//         { x: "0vw", y: "10vh", rotation: 720, scale: 1.2, duration: 1.5, ease: "power2.out" }
//       );
  
//       // 🚀 Second Meteor flies from bottom left & spins
//       tl.fromTo("#meteor2",
//         { x: "-100vw", y: "100vh", scale: 1 },  // Starts off-screen at the bottom left
//         { x: "0vw", y: "10vh", rotation: -720, scale: 1.2, duration: 1.5, ease: "power2.out" },
//         "-=1.2" // Starts slightly before Meteor 1 finishes
//       );
  
//       // 💥 Impact Shake Effect
//       tl.to("#target-image", { 
//         x: 10, y: -10, rotation: 3, duration: 0.1, repeat: 4, yoyo: true, ease: "power1.out" 
//       }, "-=0.5");
  
//       // 🎇 Explosion Effect (Image disappears)
//       tl.to("#target-image", { opacity: 0, scale: 1.8, duration: 0.5, ease: "power2.out" });
  
//       // ☁️ Smoke effect appears at impact
//       tl.to("#smoke", { opacity: 1, scale: 3, duration: 1, ease: "power2.out" }, "-=0.5");
  
//       // 📴 Loader fades out
//       tl.to("#loader", { opacity: 0, duration: 1, onComplete: () => {
//         document.getElementById("loader").style.display = "none";
//         document.documentElement.style.overflow = "auto";
//         document.body.style.overflow = "auto";
//       }});
  

//     return () => tl.kill();
//   }, []);

//   return (
//     <div id="loader" className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-amber-600">

//       {/* 🪨 First Meteor */}
//       <div id="meteor1" className="absolute w-24 h-24 rounded-full shadow-lg">
//   <img src={meteor1} className="h-full w-full object-contain" alt="Meteor 1" />
// </div>

// {/* 🪨 Second Meteor (Delayed) */}
// <div id="meteor2" className="absolute w-24 h-24 rounded-full shadow-lg">
//   <img src={meteor2} className="h-full w-full object-contain" alt="Meteor 2" />
// </div>


//       {/* ☁️ Smoke Effect */}
//       <div id="smoke" className="absolute w-20 h-20 bg-gray-500 opacity-0 rounded-full"></div>

//       {/* 🎯 Target Image */}
//       <img id="target-image" src={myImage} alt="Target" className="w-32 h-32 rounded-md" />
//     </div>
//   );
// };

// export default Loader;

import React, { useEffect } from 'react';
import gsap from 'gsap';
import './loadercss.css';
import { useGSAP } from '@gsap/react';

const Loader = () => {
    useGSAP(() => {
        const text = "Loading...";
        let tl = gsap.timeline({
            onComplete: () => {
                document.getElementById("loader").style.display = "none";
                document.documentElement.style.overflow = "auto";
                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
            }
        });

        // Typing animation
        text.split("").forEach((char, i) => {
            tl.to("#loading-text", { textContent: text.substring(0, i + 1), duration: 0.1 });
        });

        // Pause, then fade out the loader
        tl.to("#loader", { opacity: 0, duration: 1, ease: "power2.out" }, "+=1");
    }, []);

    useEffect(() => {
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = prevHtmlOverflow || "auto";
            document.body.style.overflow = prevBodyOverflow || "auto";
        };
    }, []);

    return (
        <div id="loader" className='h-screen w-screen bg-amber-600 fixed top-0 left-0 flex items-center justify-center'>
            <h1 id="loading-text" className="text-white text-4xl font-bold"></h1>
        </div>
    );
};

export default Loader;

