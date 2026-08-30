import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLazySearchUserQuery } from '../../redux/api/api';

export default function AddMemberDialog({ confirmState, setConfirmState, runFunction, buttonText = 'Done' }) {
  const cancelButtonRef = useRef(null);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [people, setPeople] = useState([]);


  const [searchUser] = useLazySearchUserQuery();

  useEffect(() => {    
    searchUser('').then(({data}) => {
      setPeople([...data?.users])
    }).catch((e)=> console.log(e));
  }, [searchUser]);


 
  const handleCheckboxChange = (person) => {
    setSelectedPeople((prevSelectedPeople) => {
      if (prevSelectedPeople.some(p => p._id === person._id)) {
        return prevSelectedPeople.filter((p) => p._id !== person._id);
      } else {
        return [...prevSelectedPeople, person];
      }
    });
  };

  return (
    <Transition.Root show={confirmState} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setConfirmState(false)}>
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
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:text-left w-full">
                      <Dialog.Title as="h3" className="flex justify-center mb-5 items-center text-lg font-medium leading-6 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                       Add Member 
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg shadow-sm focus:outline-none"
                        />
                      </div>
                      <div className="mt-4 px-5 max-h-80 overflow-y-auto scrollEditclass">
                        {people.map((person) => (
                          <div key={person._id} className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full mr-2" />
                              <span>{person.name}</span>
                            </div>
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-purple-500"
                              checked={selectedPeople.some(p => p._id === person._id)}
                              onChange={() => handleCheckboxChange(person)}
                            />
                          </div>
                        ))}
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
                      runFunction(selectedPeople);
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
  );
}
