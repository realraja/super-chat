import { useState, useEffect } from "react";
import sendMessageSound from '../../accets/mixkit-long-pop-2358.wav'; // Make sure this exists
import reciveMessageSound from '../../accets/Message-notification.mp3'; // Make sure this exists

export default UseChatSounds = () => {
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
