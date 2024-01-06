import { useState, useEffect, useRef } from 'react';
import supabase from '../supabase/client';
//import style from '../styles/gamePage.module.css';
import formatMessageDate from '../utils/formatMessageDate';

function Messages({ game }) {
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, profile: profiles(username)')
      .eq('game_id', game.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setChat(data);
    }
  };

  useEffect(() => {
    getMessages();
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        () => getMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div  ref={chatRef}>
      {chat &&
        chat.map((message) => (
          <article key={message.id} >
            <p >{message.profile.username}</p>
            <div>
              <p >{message.content}</p>
              <p >
                {formatMessageDate(message.created_at)}
              </p>
            </div>
          </article>
        ))}
    </div>
  );
}

export default Messages;