import { useEffect, useState } from "react"
import toast from "react-hot-toast";


export const useAsyncMutation = (mutationHook) => {
    const [isLoading,setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutationHook();
    
    const executeMutation = async(toastMessage,...args) => {
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || 'Updating Data');

        try {
            const res = await mutate(...args);
            if(res.data){
              toast.success(res?.data?.message || 'updated data successfully!',{id:toastId});
              setData(res.data);
            //   console.log(res)
            }else{
              toast.error(res?.error?.data?.message,{id:toastId});
            //   console.log(res)
            }
          } catch (error) {
            toast.error('something went wrong',{id:toastId})
            console.log(error)
          }finally{
            setIsLoading(false);
          }
    };

    return [executeMutation,isLoading,data]

}

// export const useSocketEvents = (socket, handlers) => {
//   useEffect(() => {
//     if (!socket || !socket.connected) {
//       console.warn("Socket is not connected");
//       return;
//     }

//     // Attach event listeners
//     Object.entries(handlers).forEach(([event, handler]) => {
//       socket.on(event, handler);
//     });

//     // Cleanup on unmount or if dependencies change
//     return () => {
//       Object.entries(handlers).forEach(([event, handler]) => {
//         socket.off(event, handler);
//       });
//     };
//   }, [socket, handlers]);
// };


export const useSocketEvents = (socket,handlers) => {

  useEffect(()=>{
    // console.log('socket is running')
    Object.entries(handlers).forEach(([event,handler])=>{
      socket.on(event, handler)
    });
    
    return () => {
      // console.log('socket is running off')
      Object.entries(handlers).forEach(([event,handler])=>{ 
        socket.off(event, handler)
      });
    }
  },[socket,handlers])
};