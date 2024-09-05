import React, { useState } from 'react';

const CardImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // TODO: Implement the actual upload logic here
      console.log('Uploading file:', selectedFile.name);
      // You would typically send this file to your server or a cloud storage service
    }
  };

  return (
    <div>
      <h1>Upload Tarot Card Images</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default CardImageUpload;