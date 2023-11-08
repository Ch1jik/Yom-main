import React, { ChangeEvent } from 'react';

interface CustomFileUploadProps {
  onChange: (files: FileList | null) => void;
  onFileDelete: () => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ onChange, onFileDelete }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onChange(event.target.files);
    }
  };

  return (
    <div className="custom-file-upload">
      <label htmlFor="file-upload" className='lable-photo'>
        <img src="logo.png" alt="Logo" className="logo" />
        <span>Choose a file</span>
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={onFileDelete}>Delete</button>
      <button>Change</button>
    </div>
  );
};

export default CustomFileUpload;
