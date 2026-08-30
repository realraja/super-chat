import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmButton from "./ConfirmButton";
import CreateGroupDialog from "./CreateGroupDialog";
import axios from "axios";
import { config, server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slicer/auth";
import toast from "react-hot-toast";
import NotificationDialog from "./Notification";
import { resetNotification } from "../../redux/slicer/chat";

const MenuDialog = ({refetch}) => {
    const navigate = useNavigate();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [groupDialog, setGroupDialog] = useState(false);
    const [notificationDialog, setNotificationDialog] = useState(false);

    const dispatch = useDispatch()
    const {notificationCount} = useSelector(state => state.chat)

    const LogoutHandler = () =>{
        axios.get(`${server}/user/logout`,config).then(res => {dispatch(logout())
          toast.success(res.data.message)
        }).catch(err => toast.error(err?.response?.data?.message || 'Something went wrong!'))
    }
    const createGroup = (name,membersData) =>{
      console.log(name, membersData)
      const members = membersData.map(item => item._id);
      // console.log(members)
        axios.post(`${server}/chat/new`,{name,members},config).then(res => {
          // console.log(res)
          toast.success(res?.data?.message);
        }).catch(err => {toast.error(err?.response?.data?.message || 'Something went wrong!'); console.log(err)}).finally(() =>{refetch();});
    }
  return (<>
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-64 z-50 bg-purple-950 bg-opacity-85 text-white rounded-lg shadow-lg">
          <div className="p-4 z-50">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`cursor-pointer p-2 z-50 rounded flex items-center ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                    />
                  </svg>
                  Saved Messages
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                onClick={()=> setGroupDialog(true)}
                  className={`cursor-pointer p-2 rounded flex items-center ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                  New Group
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {setNotificationDialog(true); dispatch(resetNotification());}}
                  className={`cursor-pointer p-2 rounded flex items-center ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                    />
                  </svg>
                  <p>Notifications</p>
                  {notificationCount>0 && <p className="bg-red-500 rounded-full ml-auto px-1.5 text-sm">{notificationCount}</p>}
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => navigate("/profile")}
                  className={`cursor-pointer p-2 rounded flex items-center ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    onClick={() => navigate("/profile")}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Profile
                </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => navigate("/profile")}
                  className={`cursor-pointer p-2 rounded flex items-center ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Settings
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                onClick={()=> setConfirmDialog(true)}
                  className={`cursor-pointer p-2 rounded flex items-center ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  Log Out
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    <ConfirmButton comfirmState={confirmDialog} setComfirmState={setConfirmDialog} runFunction={LogoutHandler} buttonText="LogOut" />
   <CreateGroupDialog confirmState={groupDialog} setConfirmState={setGroupDialog} runFunction={createGroup} />
    <NotificationDialog confirmState={notificationDialog} setConfirmState={setNotificationDialog} /></>)
}

export default MenuDialog
