import moment from "moment";
import React, { useState } from "react";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";

const UserInfo = ({ showInfo, setShowInfo, id,chatData }) => {

  const {user} = useSelector(state => state.auth)
  const chaterData = chatData?.members.find((i)=> i?._id?.toString() !== user);





  // const images = [
  //   "https://i.pinimg.com/originals/74/62/97/746297d9c22c5262fc359dac640c23b4.gif",
  //   "https://pics.craiyon.com/2023-06-28/b0931868d81346b68f5964f0c393b2fe.webp",
  //   "https://wallpapercave.com/wp/wp12329072.jpg",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2GkPejKNDZwT-pdA9eHflGX-aoixsLYq6JA&s",
  //   "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  // ];

  // const [currentImageIndex, setCurrentImageIndex] = useState(chatData?.imgUrl.length -1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === chatData?.imgUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? chatData?.imgUrl.length - 1 : prevIndex - 1
    );
  };

  // console.log(moment('2023-10-05T17:18:01.959Z').fromNow())

  return (
    <div
      className={`max-sm:w-full sm:w-full md:w-1/4 flex flex-col bg-gray-800 max-h-[calc(100dvh)] text-white ${
        showInfo ? "" : "hidden"
      } ${id ? "" : "max-sm:hidden sm:hidden md:flex"}`}
    >
      {/* <ModalImage
  small={"https://i.pinimg.com/originals/74/62/97/746297d9c22c5262fc359dac640c23b4.gif"}
  large={"https://i.pinimg.com/originals/74/62/97/746297d9c22c5262fc359dac640c23b4.gif"}
  alt="Hello World!"
/> */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div onClick={() => setShowInfo(false)} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 max-sm:block sm:block md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 max-sm:hidden sm:hidden md:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex w-full justify-between items-center cursor-pointer">
          <h2 className="text-2xl font-bold">User Info</h2>
        </div>
      </div>
      <div className="h-full overflow-auto scrollEditclass">
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            {chatData?.groupChat && <h1 className="absolute mt-3 left-1/2 top-0 transform -translate-y-1/2 text-2xl">
              {currentImageIndex + 1}/{chatData?.imgUrl.length}
            </h1>}
            <ModalImage
              small={!chatData?.groupChat?chaterData?.avatar:chatData?.imgUrl[currentImageIndex]}
              large={!chatData?.groupChat?chaterData?.avatar:chatData?.imgUrl[currentImageIndex]} // Replace with your actual image URL
              alt="Preview Image"
              className="w-full h-96 object-cover"
            />
            {chatData?.groupChat && <>
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2  text-gray-600 hover:text-white  text-5xl h-full pr-5 pl-5 p-1"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-white text-5xl h-full pr-5 pl-5 p-1 "
            >
              &gt;
            </button>
            </>}
          </div>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <div className="flex w-[90%] rounded-xl hover:bg-gray-600 items-center p-2 m-auto gap-5 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <div>
              <h3 className="font-bold">{chatData?.groupChat?chatData?.name:chaterData?.name}</h3>
              <p className="text-sm text-gray-400">
                last seen {moment(chatData?.createdAt).fromNow()}
              </p>
            </div>
          </div>
          {chatData?.groupChat || <div className="flex w-[90%] rounded-xl hover:bg-gray-600 items-center p-2 m-auto gap-5 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <div>
              <h3 className="font-bold">@{chaterData?.username}</h3>
              <p className="text-sm text-gray-400">Username</p>
            </div>
          </div>}
          <div className="flex w-[90%] rounded-xl hover:bg-gray-600 items-center p-2 m-auto gap-5 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <div>
              <h3 className="font-bold">8005760975</h3>
              <p className="text-sm text-gray-400">Phone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
