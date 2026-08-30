import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { config, socketServer } from "../constants/config";
import { useEffect } from "react";
import { UPDATE_USER_STATUS } from "../constants/events";


const socketContext = createContext();

export const GetSoket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {


    const socket = useMemo(() => io(socketServer, {
        reconnection: true,
        reconnectionAttempts: Infinity, // Try to reconnect 5 times
        reconnectionDelay: 1000, // Wait 1 second between attempts
        reconnectionDelayMax: 5000, // Maximum delay of 5 seconds,
        ...config
    }), []);

    // console.log('socket id:', socket.id);

    useEffect(() => {

        const handleVisibilityChange = () => {

            if (document.visibilityState === "visible") {

                // console.log("Tab is active → ONLINE");

                if (socket.connected) {
                    socket.emit(UPDATE_USER_STATUS, {
                        status: "online"
                    });
                }

            } else {

                // console.log("Tab is hidden → OFFLINE");

                if (socket.connected) {
                    socket.emit(UPDATE_USER_STATUS, {
                        status: "offline"
                    });
                }
            }
        };

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };

    }, [socket]);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}