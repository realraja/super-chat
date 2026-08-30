import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalIdRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMediaBlobUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      intervalIdRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 100);
      }, 100);
    } catch (error) {
      console.error('Error accessing audio stream:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(intervalIdRef.current);
    setIsRecording(false);
  };


  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${ms < 100 ? ms < 10 ? '00' : '0' : ''}${ms}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-2xl mb-5">Audio Recorder</h1>
      <div className="flex flex-col items-center">
        <p className="mb-2">Status: {isRecording ? 'Recording' : 'Stopped'}</p>
        <p className="mb-2">Recording Time: {formatTime(recordingTime)}</p>
        <div className="mb-4">
          <button
            onClick={startRecording}
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            disabled={isRecording}
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            disabled={!isRecording}
          >
            Stop Recording
          </button>
        </div>
        {mediaBlobUrl && (
          <div className="mt-4">
            <audio src={mediaBlobUrl} controls className="w-full mb-4" />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
