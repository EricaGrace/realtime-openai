import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = ({ socket }) => {
  const [text, setText] = useState('');

  const handleSendMessage = async () => {
    const isAccurate = await checkAccuracyWithOpenAI(text);

    if (isAccurate) {
      socket.emit('sendMessage', { text });
      setText('');
    } else {
      console.log("L'information semble inexacte. Veuillez vérifier et réessayer.");
    }
  };

  const checkAccuracyWithOpenAI = async (text) => {
    try {
      const response = await fetch('http://localhost:3000/chat/check-accuracy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();
      return result.isAccurate;
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      return false;
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Envoyer</button>
    </div>
  );
};

export default Chat;
