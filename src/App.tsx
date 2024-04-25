import React from "react";
import "./App.css";
import Carousel from "./components/Carousel";
import usePexelsImages from "./hooks/usePexelesImages";
import Image from "./components/Image";

const App: React.FC = () => {
  const { images, loading, error } = usePexelsImages(process.env.PEXELS_API_KEY || '');
const times = 20000; // Number of times to duplicate

// Create an array of empty arrays filled up to 'times', then map each to the original array, and flatten it
const duplicatedArray = Array(times).fill([]).map(() => images).flat();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading images.</p>;

  return (
    <>
      <>Number of the images: {duplicatedArray.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</>
      <div className="responsive-container">
        <Carousel rowHeight={480}>
          {duplicatedArray.map((image) => (
            <div className="row" key={image.id}>
              <Image image={image}/>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default App;
