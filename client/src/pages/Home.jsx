import React from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PinterestGrid from "../components/layout/PinterestGrid";
import api from "../api/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [pins, setPins] = useState([]);
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await api.get("/promptsApi/prompts");
        // Assuming response.data is an array of image URLs or prompt objects
        setPins(response.data);
        console.log(response.data);
        
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchPins(); // call the function
  }, []);
  return (
    <div className="w-full min-h-screen">
      <section className="hero w-full h-screen relative">
        <div className="text absolute w-full h-80 top-[50%] left-0 -translate-y-[50%] -transform-x-[50%] flex flex-col items-center">
          <h1 className="text-6xl font-medium text-zinc-400 capitalize w-[50%] text-center">
            From Image to Inspiration in Seconds
          </h1>
          <p className="w-[45%] text-center text-zinc-500 my-5">
            Transform your favorite images into creative prompts you can copy,
            save, and share — perfect for AI art, design, or brainstorming.
          </p>
          <PrimaryButton>Try Now!</PrimaryButton>
        </div>
      </section>
      
      <PinterestGrid pins={pins} />
    </div>
  );
}

export default Home;
