import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { config, server } from '../../constants/config'
import toast from 'react-hot-toast'

export default function ConfirmUserDialog({
    confirmState,
    setConfirmState
}) {
    const cancelButtonRef = useRef(null)
    const navigate = useNavigate()
    // console.log(Object.keys(confirmState).length === 0)
// console.log(confirmState)

    const ChatFunction = async () => {
        if (confirmState.isFriend) {
            navigate("/chat/" + confirmState.chatId);
            setConfirmState({})
        } else {
            try {
                const { data } = await axios.post(
                    `${server}/chat/new/chat`,
                    { member: confirmState._id },
                    config
                );
                navigate("/chat/" + data.chat._id);
                toast.success(data.message);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setConfirmState({})
            }
        }


    }

    return (
        <Transition.Root show={Object.keys(confirmState).length !== 0} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setConfirmState({})}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                                <div className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={confirmState.avatar}
                                            alt={confirmState.name}
                                            className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 shadow-md"
                                        />
                                        <h3 className="mt-3 text-lg font-medium text-gray-900">{confirmState.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 text-center">
                                            Are you sure you want to proceed with this action?
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={() => {
                                            ChatFunction();
                                        }}
                                    >
                                        {confirmState?.isFriend ? 'Message' : 'Chat'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                        onClick={() => setConfirmState({})}
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
    )
}
