import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { GetSoket } from "../../socket/socket";
import { NEW_MESSAGE, START_OR_STOP_TYPING } from "../../constants/events";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import { useSocketEvents } from "../../hooks/hook";
import { useGetMessagesQuery, useSendAttachmentsMutation } from "../../redux/api/api";
import { PulseLoader, ScaleLoader } from "react-spinners";
import ChatsLoader from "../loaders/ChatsLoader";
import sendMessageSound from '../../accets/mixkit-long-pop-2358.wav'; // Make sure this exists
import reciveMessageSound from '../../accets/notification-2-269292.mp3'; // Make sure this exists
import ConfirmUserDialog from "../Dialogs/UserProfile";
import { config, server } from "../../constants/config";
import axios from "axios";
import { useMemo } from "react";

//==> create group 5:37
const ChatWindow = ({ paramId, chater, setShowInfo, showInfo, user }) => {
  const socket = GetSoket();

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [pendingShowMessages, setPendingShowMessages] = useState(0);
  const [showViewProfile, setShowViewProfile] = useState({});
  // const [isUserTyping, setIsUserTyping] = useState(false);

  const { Typing, onlineUsers } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const typingStatus = Typing.find(i => i.chatId === paramId);
  const isUserTyping = typingStatus?.typing || false;
  // console.log(isUserTyping);
  const isGroupChat = chater?.groupChat;
  const id = chater?._id;
  const members = chater?.members;
  const OtherMember = chater?.members.find(i => i._id !== user);
  const chaterData = chater?.members.find(
    (i) => i?._id?.toString() !== user
  );

  // console.log(chater)
  const oldMessagesChunk = useGetMessagesQuery({ chatId: paramId, page });
  const scrollRef = useRef(null); // Ref for the messages container
  // console.log(totalPages)
  // Auto-scroll to bottom on new messages


  // Append old messages when page changes
  // console.log(totalPages, oldMessagesChunk.data)

  useEffect(() => {
    return () => {
      // setChatData({});
      setMessages([]);
      setPage(1); // Reset the page to start fresh
      setTotalPages(1); // Reset total pages
    }
  }, [paramId]);

  useEffect(() => {
    if (oldMessagesChunk?.data?.message && oldMessagesChunk?.data?.page * 1 === page) {
      // console.log(oldMessagesChunk?.data)
      setTotalPages(oldMessagesChunk?.data?.totalPages);
      const container = scrollRef.current;

      // Remember scroll position before loading old messages
      const prevScrollHeight = container?.scrollHeight;

      setMessages((prev) => [
        ...oldMessagesChunk?.data?.message,
        ...prev,
      ]);
      setLoadingOldMessages(false);

      // Restore scroll position after old messages load
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - prevScrollHeight;
        }
      }, 0);
    }
  }, [oldMessagesChunk.data, page]);



  // console.log(totalPages,page,page <= totalPages,!loadingOldMessages,!loadingOldMessages && page <= totalPages*1)
  // Function to load more messages
  const loadMoreMessages = () => {
    // console.log(totalPages)
    if (!loadingOldMessages) {
      setLoadingOldMessages(true);
      setPage((prev) => prev + 1);
    }
  };

  // Detect scroll to top for loading more messages
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollRef.current;

      // Check if already loading or at the last page
      if (container && container.scrollTop === 0 && !loadingOldMessages && page < totalPages) {
        // toast.success('Loading more messages...');
        loadMoreMessages();
      }
    };

    const container = scrollRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, loadingOldMessages]); // Add dependencies

  // check bug
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const container = scrollRef.current;
  //     if (container && container.scrollTop === 0  && page <= totalPages) {
  //       toast.success('running');
  //       loadMoreMessages();
  //     }
  //   };

  //   const container = scrollRef.current;
  //   container?.addEventListener("scroll", handleScroll);

  //   return () => container?.removeEventListener("scroll", handleScroll);
  // }, []);
  const setBottomFunction = () => {
    // if (scrollRef.current) {
    //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // }
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    setPendingShowMessages(0)
  }

  useEffect(() => {
    let date = new Date();
    let messageDate = new Date(messages[messages.length - 1]?.createdAt);

    if (showScrollButton) {
      // console.log('object sender')
      if (messages[messages.length - 1]?.sender?._id !== user && (date.getTime() - messageDate.getTime()) < 6000) {
        return setPendingShowMessages(prev => prev + 1);
      } else if ((date.getTime() - messageDate.getTime()) > 6000) {
        return
      }
    }
    setBottomFunction();
  }, [messages, user]);
  useEffect(() => {
    if (showScrollButton) return;
    // if (scrollRef?.current?.scrollHeight - scrollRef?.current?.scrollTop > 600) return;

    setBottomFunction();
  }, [Typing]);



  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const bottomThreshold = 600; // Distance from the bottom to show the button
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > bottomThreshold);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    // Cleanup the event listener
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // const scrollToBottom = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTo({
  //       top: scrollRef.current.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   }
  // };









  const viewProfile = async(userData) => {

    try {
          const { data } = await axios.get(
            `${server}/chat/check-friend/${userData._id}`,
            config
          );
          console.log(data);
          setShowViewProfile({...userData, isFriend: data?.data?.isFriend,chatId: data?.data?.chatId}); 
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
  }






  return (<>
    <div className={` ${showInfo
        ? "max-sm:hidden sm:hidden md:flex md:w-1/2"
        : "max-sm:w-full sm:w-full md:w-3/4"
        } h-[calc(100dvh)] flex flex-col bg-gray-900 text-white relative ${paramId ? "" : "max-sm:hidden sm:hidden md:flex"
        }`}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-700 min-h-16 flex items-center gap-5">
        <Link
          className={`cursor-pointer max-sm:block sm:block md:hidden`}
          to={"/"}
        >
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <div
          onClick={() => setShowInfo(!showInfo)}
          className="flex w-full justify-between items-center cursor-pointer"
        >
          <div className="flex items-center">
            <img
              src={
                chater?.groupChat ? chater?.imgUrl[0] : chaterData?.avatar
              }
              alt={"conv.name"}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-2xl text-start font-bold">
                {chater?.groupChat ? chater?.name : chaterData?.name}
              </h2>
              {isUserTyping && showScrollButton || chater?.groupChat ? isUserTyping && <p className="text-sm text-green-400 flex items-center">{chater?.groupChat && `${typingStatus?.name} is `}typing<PulseLoader
                className="mt-1"
                color="#43e96b"
                margin={3}
                size={3}
              /></p> : onlineUsers[OtherMember._id] ? <p className="text-sm text-green-400 items-center">online</p> : <p>last seen {moment(OtherMember.lastSeen).fromNow()}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto scrollEditclass pb-20"
        style={{
          background: "url(https://gifdb.com/images/high/black-background-blue-meteor-shower-96b6ypkabnn7d0jm.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {loadingOldMessages && (
          <div className="text-center text-gray-400"><ScaleLoader
            color="#ffffff"
            height={25}
            margin={2}
            radius={1}
            speedMultiplier={3}
            width={2}
          /></div>
        )}

        {showScrollButton && (
          <div
            onClick={setBottomFunction}
            className="bg-gray-600 rounded-full p-2 fixed bottom-24 right-5 z-40 cursor-pointer"
          >
            {pendingShowMessages > 0 && <p className="absolute bg-purple-600 size-7 flex justify-center items-center text-center -left-3 rounded-full -top-3">{pendingShowMessages}</p>}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>

          </div>
        )}

        {oldMessagesChunk?.isLoading ? <ChatsLoader /> : messages.map((msg, index) => (
          <MessageComponent key={index} msg={msg} user={user} isGroupChat={isGroupChat} viewProfile={viewProfile} />
        ))}

        {isUserTyping && (
          <PulseLoader
            color="#a22dd0"
            margin={4}
            size={12}
          />
        )}
      </div>

      {/* Input Area */}
      <div>
        <TextMessageComponent
          chatId={id}
          members={members}
          socket={socket}
          setMessages={setMessages}
          user={user}
        />
      </div>
    </div>
    <ConfirmUserDialog
  confirmState={showViewProfile}
  setConfirmState={setShowViewProfile}
/>

    </>
  );
};

export default ChatWindow;

const MessageComponent = ({ msg, user, isGroupChat ,viewProfile}) => {
  // console.log(isGroupChat)
  return (
    <div
      className={`mb-6 flex flex-col relative ${msg.sender._id === user ? "items-end" : "items-start"
        }`}
    >
      <div className="flex gap-2">
        {msg.sender._id !== user && isGroupChat && (
          <img
          onClick={()=> viewProfile(msg?.sender)}
            src={msg?.sender?.avatar}
            alt={msg?.sender?.name}
            className="w-8 h-8 cursor-pointer rounded-full sticky top-0 shadow-md border border-gray-600 object-cover"
          />
        )}

        <div
          className={`gap-1 flex flex-col ${msg.sender._id === user ? "items-end" : "items-start"
            }`}
        >
          {/* Message bubble */}
          {(!msg.attachments || msg.attachments.length <= 0) ? (
            <div
              className={`py-2 px-4 max-sm:max-w-64 max-w-96 rounded-2xl shadow-md text-white ${msg.sender._id === user ? "bg-gray-800" : "bg-gray-700"
                }`}
            >
              {msg.sender._id !== user && isGroupChat && (
                <span className="text-xs font-semibold text-gray-300">
                  {msg?.sender?.name}
                </span>
              )}
              <p className="text-base break-words whitespace-pre-wrap leading-snug">
                {msg.content}
              </p>
            </div>
          ) : (
            <div className={`max-sm:max-w-64 max-w-96 flex flex-col ${msg.sender._id === user ? "items-end" : "items-start"
        }`}>
              {msg.sender._id !== user && isGroupChat && (
                <span className="text-sm font-semibold text-gray-300 mb-1">
                  {msg?.sender?.name}
                </span>
              )}
              {msg.attachments.map(({ url, _id }) => {
                const extension = url.split(".").pop().toLowerCase();

                if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
                  const smallUrl = url.replace("upload/", "upload/dpr_auto/h_350/");
                  return (
                    <div key={_id} className="mb-2">
                      <ModalImage
                        small={smallUrl}
                        large={url}
                        alt="Preview"
                        className="rounded-xl bg-gray-700/50 h-[250px] max-w-full object-contain shadow-md"
                      />
                    </div>
                  );
                } else if (["mp3", "wav", "webm", "ogg", "m4a"].includes(extension)) {
                  console.log(extension,url);
                  return (
                    <div key={_id} className="mb-2">
                        <audio controls className="inline-block h-16 my-2">
              <source src={url} type={`audio/${extension}`} />
              Your browser does not support the audio element.
            </audio>
                    </div>
                  );
                } else if (["mp4", "ogg"].includes(extension)) {
                  return (
                    <div key={_id} className="mb-2">
                      <video controls className="w-full h-[300px] rounded-md bg-black">
                        <source src={url} type={`video/${extension}`} />
                        Your browser does not support the video element.
                      </video>
                    </div>
                  );
                } else {
                  return (
                    <a
                      key={_id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center px-5 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 mb-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l8 8m0 0l8-8m-8 8V4"
                        />
                      </svg>
                      Download File
                    </a>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-xs text-gray-400 mt-1">
        {moment(msg.createdAt).fromNow()}
      </p>
    </div>


  )
}

const TextMessageComponent = ({ chatId, members, socket, setMessages, user }) => {

  const [message, setMessage] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlob, setMediaBlob] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isUploading, setIsUploading] = useState({ file: null, loading: false });
  const [iAmTyping, setIAmTyping] = useState(false);

  const dialogRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalIdRef = useRef(null);
  const streamRef = useRef(null);
  const typingTimeoutRef = useRef(null);


  const [sendAttachments] = useSendAttachmentsMutation();






  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      streamRef.current = stream; // Store the stream reference to stop it later

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        // const audioUrl = URL.createObjectURL(audioBlob);
        // audioSendHandle(audioBlob);
        setMediaBlob(audioBlob)

        // Stop all audio tracks to release the microphone
        streamRef.current.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      intervalIdRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 100);
      }, 100);
    } catch (error) {
      console.error("Error accessing audio stream:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(intervalIdRef.current);
    setIsRecording(false);

    // Stop the microphone (if not already stopped in `onstop`)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${ms < 100 ? ms < 10 ? '00' : '0' : ''}${ms}`;
  };



  const handleFileSelect = async (e, fileType) => {
    const files = e.target.files;
    if (files.length <= 0) return;
    if (files.length > 5) return toast.error(`Selected ${fileType}s are more than 5!`);

    // console.log(`Selected ${fileType}:`, files[0]); // Replace this with your upload logic
    setIsUploading({ file: fileType, loading: true });
    const toastId = toast.loading(`Sending ${fileType}`);
    const fileArray = Array.from(files);

    try {
      const myForm = new FormData();
      myForm.append('chatId', chatId);
      fileArray.forEach((file) => myForm.append('files', file));

      // console.log(myForm.getAll('files'));

      const res = await sendAttachments(myForm);

      // console.log(res);

      if (res.data) { toast.success(`${fileType} sent successfully!`, { id: toastId }); } else { toast.error(`${fileType} failed to send!`, { id: toastId }); }
    } catch (error) {
      console.log(error)
      toast.error(`${fileType} ${error}`, { id: toastId })
    } finally {
      setIsUploading({ file: null, loading: false });
    }

  };

  const audioSendHandle = async () => {

    setIsUploading({ file: 'audio', loading: true });
    const toastId = toast.loading("Sending Audio...");

    try {

      // Create a File object
      // const file = new File([mediaBlob], "audio.wav", { type: "audio/wav" });
      // console.log("Audio File:", file);

      // Prepare FormData
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      myForm.append("files", mediaBlob);
      // console.log("FormData Content:", Array.from(myForm.entries()));

      // Send the request
      const res = await sendAttachments(myForm);

      if (res.data) {
        toast.success("Audio sent successfully!", { id: toastId });
      } else {
        toast.error("Audio failed to send!", { id: toastId });
      }
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error(`Audio upload failed: ${error.message}`, { id: toastId });
    } finally {
      setIsUploading({ file: null, loading: false });
      setMediaBlob(null); // Clear the recorded audio
    }
  };


  // const handleCapture = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImageSrc(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleOnchangeMassage = (e) => {
    setMessage(e.target.value)
    if (!iAmTyping) {
      socket.emit(START_OR_STOP_TYPING, { members, chatId, typing: true })
      setIAmTyping(true);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIAmTyping(false);
      socket.emit(START_OR_STOP_TYPING, { members, chatId, typing: false })
    }, 2000);
  }


  const submitMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIAmTyping(false);

    socket.emit(START_OR_STOP_TYPING, { members, chatId, typing: false })
    console.log('submitting message',socket.id);
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    // console.log(message);
    setMessage('');
  }

  // const newMessageHandler = useCallback((data) => {
  //   // console.log(data);
  //   if (data.chatId !== chatId) return;
  //   setMessages((prev) => [...prev, data.message])
  // }, [chatId]);


  const { messageSendSound, messageRciveSound } = useChatSounds();

  const newMessageHandler = useCallback((data) => {
    // console.log(data);
    if (data.chatId !== chatId) return;

    setMessages((prev) => [...prev, data.message]);

    // 💬 Play only if audio is initialized
    const isSelf = data?.message?.sender?._id === user;

    const soundToPlay = isSelf ? messageSendSound : messageRciveSound;

    if (soundToPlay) {
      soundToPlay.currentTime = 0; // rewind for rapid use
      soundToPlay.play().catch((err) => {
        console.warn("Sound blocked:", err.message);
      });
    }
  }, [chatId, messageSendSound, messageRciveSound, user,setMessages]);


  // const eventHandlersArr = { [NEW_MESSAGE]: newMessageHandler };

  const eventHandlersArr = useMemo(() => ({
    [NEW_MESSAGE]: newMessageHandler
}), [newMessageHandler]);

  useSocketEvents(socket, eventHandlersArr);

  // useEffect(()=>{
  //   socket.on(NEW_MESSAGE,(data)=>{
  //     console.log(data);
  //     toast.success(data.message.content);
  //   })
  // },[socket])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowDialog(false);
      }
    };

    if (showDialog) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDialog]);

  return <div
    className="w-full absolute bottom-5 items-center flex justify-center"><form onSubmit={submitMessage}
      className="flex gap-3 self-center max-sm:w-full sm:w-[80%] md:w-full lg:w-[80%] px-3"
    >
      <div className="w-full relative items-center">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleFileSelect(e, "image")}
          className="hidden"
          id="cameraInput"
        />
        <label
          htmlFor="cameraInput"
        // className="flex justify-center items-center gap-3 text-purple-300 py-2 rounded-lg border-2 border-purple-600 cursor-pointer"
        >
          <img className=" absolute h-14 bottom-1 py-3.5 px-5 cursor-pointer" src="https://img.icons8.com/?size=100&id=ppQLTjKugkhf&format=png&color=000000" alt="camera icon" />

        </label>
        <input
          value={message}
          onChange={handleOnchangeMassage}
          type="text"
          placeholder="Message"
          className="flex-grow w-full p-4 pl-14 pr-16 text-lg bg-gray-800 text-white rounded-3xl focus:outline-none"
        />

        {isRecording ? <button
          type="button"
          className=" absolute right-0 bottom-1 py-3.5 px-5 cursor-pointer"
        >{formatTime(recordingTime)}</button> : <button
          type="button"
          className=" absolute right-0 bottom-1 py-3.5 px-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevents event propagation
            setShowDialog((prev) => !prev);
          }}
        >

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
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>

        </button>}


        {/* Dialog */}
        {showDialog && (
          <div
            ref={dialogRef}
            className="absolute bottom-16 right-0 bg-gray-900 text-white rounded-lg shadow-lg py-2 w-40 animate-slide-in"
          >
            <ul>
              <li className="px-4 flex items-center text-center py-2 hover:bg-gray-800 cursor-pointer relative">
                <img className="h-6 mr-2" src="https://img.icons8.com/?size=100&id=BhVGuADUbtw9&format=png&color=000000" alt="image--v1" />
                Image
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileSelect(e, "image")}
                />
              </li>
              <li className="px-4 flex py-2 hover:bg-gray-800 cursor-pointer relative">

                <img className="h-6 mr-2" src="https://img.icons8.com/?size=100&id=WB3oQAyWBbjX&format=png&color=000000" alt="image--v1" />
                Audio
                <input
                  type="file"
                  multiple
                  accept="audio/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileSelect(e, "audio")}
                />
              </li>
              <li className="px-4 flex py-2 hover:bg-gray-800 cursor-pointer relative">
                <img className="h-6 mr-2" src="https://img.icons8.com/?size=100&id=0v3vEtjOL57p&format=png&color=000000" alt="image--v1" />

                Video
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileSelect(e, "video")}
                />
              </li>
              <li className="px-4 flex py-2 hover:bg-gray-800 cursor-pointer relative">
                <img className="h-6 mr-2 " src="https://img.icons8.com/?size=100&id=b0vfoq4G1DH5&format=png&color=000000" alt="image--v1" />
                File
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileSelect(e, "file")}
                />
              </li>
            </ul>
          </div>
        )}
      </div>


      {/* {status === 'stopped' && setRecordingUrl(mediaBlobUrl)} */}
      {!message || isRecording ? (
        !isRecording ? (
          mediaBlob ? <><button
            onClick={() => setMediaBlob(null)}
            disabled={!mediaBlob}
            className={"p-2 px-4 bg-rose-600 rounded-full cursor-pointer"}
          >
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
            <button
              type="submit"
              onClick={() => { audioSendHandle(); }}
              disabled={!mediaBlob}
              className="p-2 px-4 bg-purple-600 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button></> : <button
              onClick={startRecording}
              disabled={isRecording}
              className="p-2 px-4 bg-purple-600 rounded-full cursor-pointer"
            >
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
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </button>
        ) : (
          <>
            <button
              type="submit"
              onClick={() => { stopRecording(); }}
              disabled={!isRecording}
              className="p-2 px-4 bg-purple-600 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fill-rule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clip-rule="evenodd" />
              </svg>


            </button>{" "}
          </>
        )
      ) : (<button
        type="submit"
        className="p-2 px-4 bg-green-600 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 -rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
      )}

    </form></div>
}



const useChatSounds = () => {
  const [messageSendSound, setSendSound] = useState(null);
  const [messageRciveSound, setReceiveSound] = useState(null);

  useEffect(() => {
    const init = () => {
      setSendSound(new Audio(sendMessageSound));
      setReceiveSound(new Audio(reciveMessageSound));
    };

    // Only initialize sounds on first user click
    window.addEventListener("click", init, { once: true });

    return () => {
      window.removeEventListener("click", init);
    };
  }, []);

  return { messageSendSound, messageRciveSound };
};














// import { useGetChatDetailsQuery } from "../../redux/api/api";

// const Messages = [
//   {
//     sender: "Telegram",
//     content:
//       "Just for you, we have developed an unrealistically cool application...",
//     time: "08:53 PM",
//     type: "text",
//   },
//   {
//     sender: "You",
//     content:
//       "Just for you, we have developed an unrealistically for you, we have developed an unrealistically for you, we have developed an unrealistically cool developed an unrealistically cool application...",
//     time: "08:53 PM",
//     type: "text",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "Just for you, we have developed an unrealistically cool application...",
//     time: "08:53 PM",
//     type: "text",
//   },
//   {
//     sender: "You",
//     content: "1000062192.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1717480397/native_todoApp_task/auiqwdoshb8vqvmro9bc.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content: "kya huaa",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/raw/upload/v1719539368/native_todoApp_task/bcbblputoz0uwheczcqa.html",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/raw/upload/v1719539286/native_todoApp_task/hdqe3k99aqvosxfztvla.txt",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1717260770/native_todoApp_task/s3c1ko4pfkqqsnfaxeic.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/video/upload/v1717231214/sfcfphznqzmob6xsmop8.mp3",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "Telegram",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/video/upload/v1719539141/smnwbqepusb71eflbgex.mp4",
//     time: "03:20 PM",
//     type: "image",
//   },
//   {
//     sender: "You",
//     content:
//       "https://res.cloudinary.com/dwc3gwskl/image/upload/v1716375508/native_todoApp/ypxtu24iiq6yameluqfz.jpg",
//     time: "03:20 PM",
//     type: "image",
//   },
//   // Add more messages as needed
// ];


