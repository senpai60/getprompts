// src/components/PinterestGrid.jsx
import PromptsCard from '../cards/PromptsCard';

// You would typically fetch this data from an API
const samplePins = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/seed/project1/500/750',
    imageAlt: 'Abstract art with swirling colors',
    title: 'Amazing Abstract Artwork',
    authorAvatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    authorName: 'Cool Creator',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/seed/project2/500/600',
    imageAlt: 'Modern city skyline at dusk',
    title: 'City Lights at Night',
    authorAvatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    authorName: 'Urban Explorer',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/seed/project3/500/800',
    imageAlt: 'Lush green forest path',
    title: 'Forest Path Serenity',
    authorAvatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    authorName: 'Nature Photographer',
  },
  // ... Add more pin objects here
];


const PinterestGrid = ({pins}) => {
  return (
    // The main container with your dark background
    <div className="p-4 min-h-screen bg-zinc-950">
      {/* Responsive Masonry grid container */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4">
        {pins.map((pin,i) => (
          <PromptsCard
            key={i}
            imageUrl={pin}
            
          />
        ))}
      </div>
    </div>
  );
};

export default PinterestGrid;