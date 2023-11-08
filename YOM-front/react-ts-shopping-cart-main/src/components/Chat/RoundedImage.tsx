import React from 'react';
import userImage from '../../assets/images/user-icon.svg'

interface RoundedImageProps {
  imagePath: string | null;
  height: number;
}


const RoundedImage: React.FC<RoundedImageProps> = ({ imagePath, height }) => {

  const componentStyle = {
    display: "flex",
    alignItems: "center",
    width: `${height}px`,
    height: `${height}px`,
    borderRadius: "50%"
  };

  if (!imagePath) {
    return (
      <img style={componentStyle}
        src={userImage}
      />
    );
  }

  return (
    <img style={componentStyle}
      src={imagePath}
    />
  );
};

export default RoundedImage;