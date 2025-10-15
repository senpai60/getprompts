import React, { useEffect, useState } from "react";
import PromptsCard from "../components/cards/PromptsCard";
import api from "../api/axiosInstance";
import { useParams } from "react-router";

function DisplayPrompt() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyPin, setCopyPin] = useState({});
  const { pinId } = useParams();
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
          setPins(pinsArray.slice(100, 115));
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
    const fetchCopyPins = async () => {
      try {
        const response = await api.get(`/promptsApi/prompts/${pinId}`);
        setCopyPin(response.data); // store single prompt
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCopyPins();

    fetchPins();
  }, [pinId]);
  return (
    <div className="w-full min-h-screen flex justify-between">
      <div className="prompt-copy inline w-[60%] h-screen px-5 pt-20">
        <div className="prompt-copy-card w-full h-full flex gap-2  p-10">
          <div className="card-left w-80">
            <img
              src={`${copyPin.imageUrl}`}
              className="w-full object-cover object-center"
              alt=""
              srcset=""
            />
          </div>
          <div className="right">
            <h2 className="text-5xl">
                Prompt_
            </h2>
            <p className="w-120 mt-10">
                {copyPin.promptText}
            </p>

          </div>
        </div>
      </div>
      <div className="display-grid w-[40%] h-screen flex flex-wrap gap-3 px-5 pt-20">
        {pins.map((pin, i) => (
          <div key={pin._id} className="max-w-50">
            <PromptsCard key={i} pin={pin} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayPrompt;
