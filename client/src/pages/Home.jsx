import React from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PinterestGrid from "../components/layout/PinterestGrid";
import api from "../api/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  // State to hold ALL fetched pins from the API
  const [pins, setPins] = useState([]);
  
  // State to control how many pins are currently visible
  const [visibleCount, setVisibleCount] = useState(12);

  // ✅ NEW: State to handle the loading UI
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setLoading(true); // Show loader before fetching
        const response = await api.get("/promptsApi/prompts");
        setPins(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false); // Hide loader after fetch is complete (or fails)
      }
    };

    fetchPins();
  }, []);

  // Function to show the next 12 pins
  const handleLoadMore = () => {
    setVisibleCount(24); // Set the visible count to the max limit
  };

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
      
      {/* ✅ NEW: Conditional rendering for the grid and loader */}
      {loading ? (
        <div className="text-center my-10">Loading Pins...</div>
      ) : (
        <>
          <PinterestGrid pins={pins.slice(0, visibleCount)} />

          {/* This section will only appear if there are more pins to show */}
          {visibleCount < 24 && pins.length > 12 && (
            <div className="w-full flex justify-center my-8">
              <PrimaryButton onClick={handleLoadMore}>
                Load Next 12
              </PrimaryButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;