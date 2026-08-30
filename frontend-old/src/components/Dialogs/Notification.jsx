import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAcceptRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/slicer/chat";
import { PropagateLoader } from "react-spinners";

// const requests = [
//     {
//       id: 1,
//       image: "https://via.placeholder.com/150",
//       name: "John Doe",
//       username: "johndoe",
//       onAccept: (id) => console.log(`Accepted request from user ID: ${id}`),
//       onReject: (id) => console.log(`Rejected request from user ID: ${id}`),
//     },
//     {
//       id: 2,
//       image: "https://via.placeholder.com/150",
//       name: "Jane Smith",
//       username: "janesmith",
//       onAccept: (id) => console.log(`Accepted request from user ID: ${id}`),
//       onReject: (id) => console.log(`Rejected request from user ID: ${id}`),
//     },
//   ];
export default function NotificationDialog({
  confirmState,
  setConfirmState,
}) {
  const dispatch = useDispatch()
  const cancelButtonRef = useRef(null);

  const { isLoading, data, error, isError, refetch } = useGetNotificationsQuery();

  //   console.log(data.request);
  useEffect(() => {
    refetch();
  }, [confirmState]);
  useEffect(() => {
    // console.log(data)
    dispatch(setNotification(data?.request?.length || 0));
  }, [data, dispatch]);



  return (
    <>
      <Transition.Root show={confirmState} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setConfirmState(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                  <div className="bg-gray-800 px-4 pb-4 pt-5">
                    <div className="flex justify-center items-center">
                      <div className="text-center sm:text-left w-full flex flex-col justify-center items-center gap-5">
                        <Dialog.Title
                          as="h3"
                          className="flex items-center text-lg font-medium leading-6 text-purple-400"
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
                          Group Join Requests
                        </Dialog.Title>
                        <div className="h-72 overflow-auto scrollEditclass">
                          {isLoading ? <div className="flex items-center justify-center my-5">
                            {" "}
                            <PropagateLoader color="#2a90cf" size={70} speedMultiplier={1.5} />
                          </div> : <JoinGroupNotification requests={data?.request} refetch={refetch} />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse">

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 sm:mt-0 sm:w-auto"
                      onClick={() => setConfirmState(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}


const JoinGroupNotification = ({ requests, refetch }) => {

  const [acceptRequest] = useAcceptRequestMutation();

  const requestAccept = async ({ requestId, accept }) => {
    try {
      const res = await acceptRequest({ requestId, accept });

      if (res?.data?.success) {
        console.log('use socket');
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.error?.data?.message);
        console.log(res)
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error);
    } finally {
      refetch();
    }
  }
  return (
    <div >
      <div className="space-y-4 w-full">
        {requests.map((user, index) => (
          <div
            key={index}
            className="flex items-center w-96 justify-between  p-3 rounded-md  hover:bg-gray-700"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user?.sender?.avatar}
                alt={user?.sender?.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-800"
              />
              <div className="flex-1">
                <p className="text-sm font-medium ">{user?.sender?.name}</p>
                <p className="text-xs text-gray-400">@{user?.receiver?.name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => requestAccept({ requestId: user?._id, accept: true })}
                className="text-sm px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => requestAccept({ requestId: user?._id, accept: false })}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


