// src/components/PinterestCard.jsx

import { useNavigate } from "react-router";

const PromptsCard = ({ pin }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${pin._id}`);
  };
  return (
    <div className="group relative bg-zinc-900 rounded-lg overflow-hidden break-inside-avoid shadow-md hover:shadow-xl transition-shadow duration-300 mb-4">
      {/* Image and Hover Overlay */}
      <div onClick={handleClick} className="relative">
        <div className="shader absolute -top-[50%] transition-all group-hover:top-[0%] left-0 bg-gradient-to-b from-zinc-950 to-transparent h-30 w-full"></div>
        <img className="w-full object-cover" src={pin.imageUrl} />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-4 p-4 w-full justify-between absolute top-0">
            <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors">
              Save
            </button>
            <button className="bg-white/80 hover:bg-white text-zinc-900 w-8 h-8 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-bold text-base text-zinc-50 truncate">none</h3>
        <div className="flex items-center mt-2"></div>
      </div>
    </div>
  );
};

export default PromptsCard;
