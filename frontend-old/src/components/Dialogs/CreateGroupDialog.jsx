import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddMemberDialog from "./AddMemberDialog";

export default function CreateGroupDialog({
  confirmState,
  setConfirmState,
  runFunction,
  buttonText = "Create",
}) {
  const cancelButtonRef = useRef(null);
  const [addDialog, setAddDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);

  const addMember = (data) => {
    // console.log(data);
    setMembers([...data]);
  };

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
                          New Group
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg shadow-sm focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5">
                          <div className="flex justify-center items-center gap-2 w-full overflow-auto scrollEditclass">
                            {members[0] && (
                              <img
                                src={members[0].avatar}
                                alt={members[0].name}
                                className="w-10 h-10 rounded-full"
                              />
                            )}
                            {members[1] && (
                              <img
                                src={members[1].avatar}
                                alt={members[1].name}
                                className="w-10 h-10 rounded-full"
                              />
                            )}
                            {members[2] && (
                              <img
                                src={members[2].avatar}
                                alt={members[2].name}
                                className="w-10 h-10 rounded-full"
                              />
                            )}
                            {members[3] && (
                              <div
                                className={`w-10 h-10 bg-slate-500 text-center flex justify-center items-center ${
                                  members.length < 100 ? "text-xl" : ""
                                } rounded-full`}
                              >
                                +{members.length - 3}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            className="mt-2 inline-flex justify-center items-center gap-2 px-5 py-2 rounded-full bg-purple-500 p-2 text-white shadow-sm hover:bg-purple-600"
                            onClick={() => setAddDialog(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>

                            <h4 className="text-md font-bold">Members</h4>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-purple-500 px-4 py-2 text-white shadow-sm hover:bg-purple-600 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setConfirmState(false);
                        runFunction(groupName, members);
                      }}
                    >
                      {buttonText}
                    </button>
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
      <AddMemberDialog
        confirmState={addDialog}
        setConfirmState={setAddDialog}
        runFunction={addMember}
      />
    </>
  );
}
