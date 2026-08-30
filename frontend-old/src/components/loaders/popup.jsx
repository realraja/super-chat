import React, { useState, useEffect, useRef } from "react";
import { RingLoader } from "react-spinners";

const Popup = () => {
    const totalTime = 60; // in seconds
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);


    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    // Calculate stroke dashoffset for SVG circle
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;


    // setTimeout(() => {
    //     setIsPlaying(true);
    //     audioRef.current.play();
    // }, 2000);

    // Handle audio playback when component mounts
    useEffect(() => {
        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play();
                }
            } catch (error) {
                console.log("Autoplay was prevented. Music will start when user interacts.");
                // Fallback: set playing to false so user can start manually
                setIsPlaying(false);
            }
        };

        playAudio();

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-90">
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg text-center w-96">
                <h2 className="text-2xl font-semibold mb-2">🚀 We are starting server, please wait...</h2>
                <p className="text-gray-400 mb-4">Hang tight while we initialize the server.</p>


                <div className="flex items-center justify-center my-5">
                    <div className="relative w-40 h-40 flex justify-center items-center">
                        <svg width="160" height="160">
                            <circle
                                cx="80"
                                cy="80"
                                r={radius}
                                stroke="#333"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r={radius}
                                stroke="#10b981"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform="rotate(-86 80 80)"
                                style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                            <RingLoader color="#27c210" size={80} />
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} preload="auto" src="Let-Her-Go_320(PagalWorld).mp3" loop></audio>

                <button
                    onClick={toggleMusic}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                    {isPlaying ? "⏸ Pause Music" : "▶ Play Music"}
                </button>
            </div>
        </div>
    );
};

export default Popup;