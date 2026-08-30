import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalImage from "react-modal-image";
import MenuDialog from "../Dialogs/MenuDialog";
import { useDeletePendingMessagesMutation, useLazySearchUserQuery, useMyChatsQuery, useSendGroupJoinRequestMutation } from "../../redux/api/api";
import moment from "moment";
import axios from "axios";
import { config, server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader, ClipLoader, PulseLoader } from "react-spinners";
import { useAsyncMutation } from "../../hooks/hook";
import { removeNewMessageAleart,addNewMessageAleart } from "../../redux/slicer/chat";
import { getOrSaveLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

// const conversations = [
//   {
//     name: "Telegram",
//     lastMessage: "Login code: ****. Do not give this code to anyone.",
//     time: "01:19 PM",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Milkha 97834 51057",
//     lastMessage: "Milkha 97834 51057 joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Trilok",
//     lastMessage: "Trilok joined Telegram",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Saved Messages",
//     lastMessage: "RAKESH KUMAR4095833.pdf",
//     time: "Fri",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Aakash",
//     lastMessage: "Photo",
//     time: "Wed",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Gurbhej",
//     lastMessage: "O ta nai pta",
//     time: "Wed",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   {
//     name: "Papa Ji",
//     lastMessage: "1000062193.jpg",
//     time: "Tue",
//     imageUrl:
//       "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
//   },
//   // Add more conversations as needed
// ];

const Sidebar = ({ id }) => {
  // const [isSearch, setIsSearch] = useState(false);
  // const [chatList, setChatList] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { newMessageAlert, Typing ,onlineUsers,sidebarRefetchCount} = useSelector(state => state.chat);
  const dispatch = useDispatch();
  // console.log(newMessageAlert)
  // let msg = newMessageAlert.find((i)=> i.chatId === id);
  // console.log(msg);


  // console.log(searchList)

  const [searchUser] = useLazySearchUserQuery();
  const { isLoading, refetch, data, error } = useMyChatsQuery("");
  // const {isLoading,isError,error,refetch,data} = useMyChatsQuery('');
  // console.log(data ,user);
  // console.log(error)

  
  const setchatListData = () => {
    const sortedChats = data?.chat ? [...data?.chat]?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)):[]
    setChatList(sortedChats);
  }
  
  

  const handleOnClickChat = async (chatId) => {
    dispatch(removeNewMessageAleart({ chatId }));
  };

  useEffect(() => {
    refetch();
    console.log(sidebarRefetchCount)
  }, [sidebarRefetchCount]);
  useEffect(() => {
    getOrSaveLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert, get: false });
    setchatListData();
  }, [newMessageAlert]);

  useEffect(() => {
    if (searchText.length > 0) {
      setSearchLoading(true);
      const timeOutId = setTimeout(() => {
        searchUser(searchText)
          .then(({ data }) => {
            setSearchList([...data?.groups, ...data?.users]);
          })
          .catch((e) => console.log(e)).finally(() => {
            setSearchLoading(false);
          })
      }, 500);
      return () => clearTimeout(timeOutId);
    }
    setchatListData();
  }, [searchText, searchUser, data, refetch]);

// console.log(onlineUsers)

  return (
    <div
      className={`max-sm:w-full sm:w-full md:w-1/4 bg-gray-800 text-white h-[calc(100dvh)] ${id ? "max-sm:hidden sm:hidden md:block" : ""
        }`}
    >

      <div className="flex h-full flex-col">
        <div className="h-fit flex justify-between items-center gap-5 py-2 px-2 border-b border-gray-700">
          <MenuDialog refetch={refetch} />
          <input
            // onInput={() => setIsSearch(true)}
            // onBlur={()=> searchText || setIsSearch(false)}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="search"
            name="search"
            placeholder="Search"
            className="bg-gray-700 w-full h-10 px-4 rounded-full focus:outline-none text-white"
          />

          {/* <button onClick={() => refetch()}>Refresh</button> */}
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center my-5">
            {" "}
            <ClipLoader color="#2a90cf" size={70} speedMultiplier={1.5} />
          </div>
        ) : <div className="h-full overflow-auto scrollEditclass">
          {!searchText ? (
            <ul>
              {chatList?.map((conv, index) => {
                const msg = newMessageAlert.find((i) => i.chatId === conv?._id);
                const typing = Typing.find((i) => i.chatId === conv?._id);
                let otherMember = conv.members.find((m) => m._id !== user);
                let isOnline = onlineUsers[otherMember?._id];
                // console.log(isOnline);
                

                return (
                  <ChatListComponent
                  pendings={conv?.pendings}
                  dispatch={dispatch}
                    handleOnClickChat={handleOnClickChat}
                    notificationAlertCount={msg?.count || 0}
                    notificationAlertMessage={msg?.message || ''}
                    groupChat={conv?.groupChat}
                    chatId={id}
                    key={index}
                    avatar={conv?.imgUrl[0]}
                    name={conv?.name}
                    _id={conv?._id}
                    updatedAt={conv?.updatedAt}
                    navigate={navigate}
                    user={user}
                    typing={typing || { typing: false }}
                    isOnline={isOnline?true:false}
                  />
                )
              })}
            </ul>
          ) : searchLoading ? (
            <div className="flex items-center justify-center my-5">
              {" "}
              <BarLoader color="#2a90cf" size={70} speedMultiplier={1.5} />
            </div>
          ) : searchText.length < 3 ? (
            <h1>Write Atleast 3 Characters for search.</h1>
          ) : (
            <ul>
              {searchList.map((conv, index) =>
                conv.groupChat ? (
                  <SearchListGroupComponent
                    avatar={conv.imgUrl}
                    name={conv.name}
                    key={index}
                    navigate={navigate}
                    _id={conv._id}
                    isMember={conv?.members?.includes(user)}
                    setSearchText={setSearchText}
                    refetch={refetch}
                  />
                ) : (
                  <SearchListUserComponent
                    avatar={conv.avatar}
                    name={conv.name}
                    key={index}
                    navigate={navigate}
                    _id={conv._id}
                    username={conv.username}
                    isFriend={conv.isFriend}
                    setSearchText={setSearchText}
                    refetch={refetch}
                    isOnline={conv.isFriend?(onlineUsers[conv.friendId]?true:false):onlineUsers[conv._id]?true:false}
                  />
                )
              )}
            </ul>
          )}
        </div>}
      </div>

    </div>
  );
};

export default Sidebar;

const ChatListComponent = ({pendings,dispatch, avatar, _id, name, typing, groupChat, updatedAt, navigate, user, chatId, notificationAlertCount,notificationAlertMessage, handleOnClickChat,isOnline }) => {
  // console.log(notificationAlertCount)
  const [deletePendingMessages] = useDeletePendingMessagesMutation();
    useEffect(() => {
      const PendingMessagesMap = pendings.map(async(i)=>{
        if(i.member === user){
          dispatch(addNewMessageAleart({chatId:_id,count:i.count}))
          
    try {
      const res = await deletePendingMessages({ chatId:_id }).unwrap();
      // console.log(res);
    } catch (error) {
      console.error('Failed to delete pending messages:', error);
    }
        }
      })

      Promise.all(PendingMessagesMap);
    }, [dispatch])
  return (
    <li className={`mb-1 min-h-16 cursor-pointer hover:bg-gray-950 ${_id === chatId && 'bg-gray-950'} p-2 rounded flex items-center`} 
    onClick={() => { navigate("/chat/" + _id); handleOnClickChat(_id); }}>
      <div className="flex relative z-0">
      <img src={avatar} alt="avatar" className="min-w-10 h-10 rounded-full mr-4 object-cover" />
      {isOnline && !groupChat && <><span className="size-3 bg-green-400 absolute top-0 right-2 rounded-full" ></span>
        <span className="size-3 bg-green-400 absolute top-0 right-2 rounded-full animate-ping" ></span></>}
        
      </div>
      <div
        className="flex justify-between items-center w-full"
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">
            {name
              ?.split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
            {_id === user ? '(You)' : null}
          </h3>
          {_id !== chatId &&typing?.typing ? <p className="text-sm text-green-400 flex justify-center items-center">
            {groupChat && `${typing?.name} is`} typing<PulseLoader
            className="mt-1"
              color="#43e96b"
              margin={3}
              size={3}
            />
          </p>:<p className="text-sm text-gray-400 overflow-hidden flex items-center">{notificationAlertMessage}</p>}
          
        </div>
        <p className={`text-xs bg-rose-700 rounded-full ${notificationAlertCount <= 99 ? notificationAlertCount <= 9 ? notificationAlertCount <= 0 ? "hidden" : 'px-2.5 py-1.5' : 'px-2 py-1.5' : 'px-1 py-1.5'} text-center flex justify-center items-center`}>{notificationAlertCount}</p>
        {/* <p className="text-xs text-gray-400">{moment(updatedAt).fromNow()}</p> */}
      </div>
    </li>
  );
};

const SearchListGroupComponent = ({
  avatar,
  name,
  navigate,
  _id,
  isMember,
  setSearchText,
  refetch,
}) => {
  const [SendJoinRequest, isLoadingRequest, dataRequest] = useAsyncMutation(useSendGroupJoinRequestMutation);
  console.log(isLoadingRequest, dataRequest)
  const handleChat = async () => {
    await SendJoinRequest("sending Friend request", { chatId: _id });
    // toast.success("this function is not working!");
    // setSearchText("");
    refetch();
  };

  return (
    <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center">
      <ModalImage
        small={avatar}
        large={avatar}
        alt="Preview Image"
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />
      <div className="flex justify-between w-full">
        <div>
          <h3 className="text-lg font-semibold">
            {name
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </h3>
        </div>
        {/* <p className="text-xs text-gray-400">{moment(updatedAt).fromNow()}</p> */}
        {!isMember ? (
          <button
            onClick={handleChat}
            className="bg-green-500 rounded-lg px-4 py-1"
          >
            Request
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/chat/" + _id);
              setSearchText("");
              refetch();
            }}
            className="bg-purple-600 rounded-lg px-4 py-1"
          >
            Message
          </button>
        )}
      </div>
    </li>
  );
};
const SearchListUserComponent = ({
  avatar,
  name,
  navigate,
  _id,
  isFriend,
  username,
  setSearchText,
  refetch,
  isOnline
}) => {
  // console.log(isOnline)
  const handleChat = async () => {
    console.log(_id)
    try {
      const { data } = await axios.post(
        `${server}/chat/new/chat`,
        { member: _id },
        config
      );
      navigate("/chat/" + data.chat._id);
      toast.success(data.message);
      setSearchText("");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center">
      <div className="relative flex">
      <ModalImage
        small={avatar}
        large={avatar}
        alt="Preview Image"
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />

      {isOnline && <><span className="size-3 bg-green-400 absolute top-0 right-2 rounded-full" ></span>
        <span className="size-3 bg-green-400 absolute top-0 right-2 rounded-full animate-ping" ></span></>}
      
      </div>
      <div className="flex justify-between w-full">
        <div>
          <h3 className="text-lg font-semibold">
            {name
              ?.split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </h3>
          <p className="text-sm text-gray-400">@{username}</p>
        </div>
        {/* <p className="text-xs text-gray-400">{moment(updatedAt).fromNow()}</p> */}
        {!isFriend ? (
          <button
            onClick={handleChat}
            className="bg-green-500 rounded-lg px-4 py-1"
          >
            Add friend
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/chat/" + _id);
              setSearchText("");
              refetch();
            }}
            className="bg-purple-600 rounded-lg px-4 py-1"
          >
            Message
          </button>
        )}
      </div>
    </li>
  );
};

/*

import React, { useEffect, useRef, useState } from "react";
import ModalImage from "react-modal-image";
import { useNavigate } from "react-router-dom";

const conversations = [
  {
    name: "Telegram",
    lastMessage: "Login code: ****. Do not give this code to anyone.",
    time: "01:19 PM",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Milkha 97834 51057",
    lastMessage: "Milkha 97834 51057 joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Trilok",
    lastMessage: "Trilok joined Telegram",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Saved Messages",
    lastMessage: "RAKESH KUMAR4095833.pdf",
    time: "Fri",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Aakash",
    lastMessage: "Photo",
    time: "Wed",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Gurbhej",
    lastMessage: "O ta nai pta",
    time: "Wed",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  {
    name: "Papa Ji",
    lastMessage: "1000062193.jpg",
    time: "Tue",
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-411.jpg",
  },
  // Add more conversations as needed
];
const Sidebar = ({id}) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className={`max-sm:w-full sm:w-full md:w-1/4 bg-gray-800 text-white h-[calc(100dvh)] ${id?'max-sm:hidden sm:hidden md:block':''}`}>
      <div className="flex h-full flex-col" >
        <div  className="h-fit flex justify-between items-center gap-5 py-3 px-2 border-b border-gray-700">
          <svg  ref={dropdownRef}        
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer"
            onClick={()=> setIsOpen(!isOpen)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <input
            type="search"
            name="search"
            placeholder="Search"
            className="bg-gray-700 w-full h-10 px-4 rounded-full focus:outline-none text-white"
          />
        </div>
        {isOpen && (
        <div  className="absolute top-0 left-0 mt-12 ml-2 w-64 bg-purple-950 bg-opacity-85 text-white rounded-lg shadow-lg p-4 ">
          <ul>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
</svg>

              Saved Messages
            </li>
            <li onClick={()=> navigate('/profile')} className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

              New Group
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

              Notifications
            </li>
            
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

              Profile
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

              Settings
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5l14 14m-7 7a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              Animations
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16h6M12 9h.01" />
              </svg>
              Telegram Features
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m-6-4h6" />
              </svg>
              Report a Bug
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Switch to K Version
            </li>
            <li className=" cursor-pointer p-2 hover:bg-gray-700 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>

              Log Out
            </li>
          </ul>
          <div className="p-2 mt-4 text-gray-400">
            Chat Me Web 10.9.7
          </div>
        </div>
      )}
        <div className="h-full  overflow-auto scrollEditclass">
        <ul>
          {conversations.map((conv, index) => (
            <li            
              key={index}
              className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center"
            >
              {/* <img
                src={conv.imageUrl}
                alt={conv.name}
                className="w-10 h-10 rounded-full mr-4 object-cover"
              /> }
              <ModalImage
        small={conv.imageUrl}
        large={conv.imageUrl} // Replace with your actual image URL
        alt="Preview Image"
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />
              <div onClick={()=> navigate('/chat/'+conv.name)} className="flex justify-between w-full">
                <div>
                  <h3 className="text-lg font-semibold">{conv.name}</h3>
                  <p className="text-sm text-gray-400">{conv.lastMessage}</p>
                </div>
                <p className="text-xs text-gray-400">{conv.time}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

*/
