import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const CropModal = ({ photo, onSave, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(photo, croppedAreaPixels);
    onSave(croppedImage);
  };

  return (
    <div className="fixed h-[calc(100dvh)] w-full  inset-0 flex flex-col items-center justify-center bg-red-700 bg-opacity-75 z-50">

        <Cropper
          image={photo}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />

      {/* <div className="bg-white p-4 rounded shadow-lg flex rela"> */}
        <div className="relative  -bottom-64 ">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default CropModal;
