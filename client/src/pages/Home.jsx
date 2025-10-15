import React from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PinterestGrid from "../components/layout/PinterestGrid";
import api from "../api/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [pins, setPins] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setLoading(true);
        const response = await api.get("/promptsApi/prompts");

        // ✅ FIX: Ensure you are accessing the array from the response.
        // The property might be 'data', 'prompts', or something else.
        // Use console.log(response.data) to check the actual structure.
        const pinsArray =
          response.data.prompts || response.data.data || response.data;

        // ✅ FIX: Add a check to ensure the data is an array before setting state.
        if (Array.isArray(pinsArray)) {
          setPins(pinsArray);
        } else {
          console.error("Fetched data is not an array:", pinsArray);
          setPins([]); // Set to empty array to prevent crashes
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPins();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Use functional update for safety
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

      {loading ? (
        <div className="text-center my-10">Loading Pins...</div>
      ) : (
        <>
          <PinterestGrid pins={pins.slice(0, visibleCount)} />

          {visibleCount < pins.length && (
            <div className="w-full flex justify-center pb-4">
              <PrimaryButton onClick={handleLoadMore}>Load More</PrimaryButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
