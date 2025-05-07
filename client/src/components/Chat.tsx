import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

interface Message {
  room: string;
  author: string;
  message: string;
  time: string;
}

interface ChatProps {
  socket: any;
  username: string;
  room: string;
}

export function Chat({ socket, username, room }: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      setMessageList((list) => [...list, data]);
      if (data.author !== username) {
        setOtherUser(data.author);
      }
    };
    socket.on('receive_message', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, username]);

  return (
    <div className='w-72 h-96 bg-[#fff] border border-gray-800 relative flex flex-col rounded-t-[30px] rounded-b-[30px]'>
      <div className='h-11 bg-[#792CC7] text-white flex items-center justify-center cursor-pointer rounded-t-lg'>
        <p className='font-bold'>{otherUser || 'Chat'}</p>
      </div>
      <div className='flex-1 overflow-y-auto p-2'>
        <ScrollToBottom className='space-y-2'>
          {messageList.map((messageContent, key) => (
            <div
              key={key}
              className={`flex ${username === messageContent.author ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs p-2 text-white rounded-md break-words ${username === messageContent.author ? 'bg-[#3ED167] ml-4 mt-2' : 'bg-[#3e92d1] mr-4 mt-2'}`}>
                <div className='flex flex-col gap-2'>
                  <span className='text-xs font-semibold'>
                    {`• ${messageContent.author} - ${messageContent.time}`}
                  </span>
                  <p>{messageContent.message}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className='flex items-center border-t border-gray-800 p-2 bg-[#A16BD7] rounded-b-lg'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Type a message...'
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
          className='flex-1 border-none outline-none p-2 text-black bg-white rounded-lg'
        />
        <button onClick={sendMessage} className='ml-2 hover:text-green-500 text-white'>&#9658;</button>
      </div>
    </div>
  );
}