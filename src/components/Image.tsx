import { PexelsImage } from "../types";

const Image: React.FC<{ image: PexelsImage }> = ({ image }) => {
  return (
      <img
        key={image.id} 
        data-id={image.id}
        src={image.src.medium}
        alt={image.photographer}
        style={{
          width: '100%',
          objectFit: 'contain',
        }}
      />
  );
};

export default Image