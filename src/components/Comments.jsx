import { useContext, useEffect, useState } from 'react';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import useProfile from '../hooks/useProfile';
import AppContext from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

function Comments({ game }) {
  const [comments, setComments] = useState([]);
  const { profile } = useProfile();
  const { session } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('game_id', game.id);
      if (error) {
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  }, [game.id]); 

  const removeMessages = async (commentId) => {
    if (!session.user) {
      return;
    }
  
    const { error } = await supabase
      .from('comments')
      .delete()
      .in('id', [commentId])
      .eq('profile_id', session.user.id);

    if (error) {
      console.error('Error removing comment:', error.message);
      alert('Error removing comment');
    } else {
      console.log('Comment removed successfully');
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  return (
    <div style={{ paddingTop: '10px', filter: 'blur(0.7px) drop-shadow(0px 0px 10px white)' }}>
      <details>
        <summary style={{ textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
          {game.name} Reviews 🔽 ({comments && comments.length} recensioni degli utenti ReactiveGame)
        </summary>
        
        {comments &&
          comments.map((comment) => (
            <div key={comment.id}>
              <div>
                <article>
                  <p>{comment.comment_title}</p>
                  <p>{comment.comment_content}</p>
                  <div>
                    <p>
                      Publicato da: {comment.profile.username}
                    </p>
                    <p>
                      {formatMessageDate(comment.created_at)}
                    </p>
                  </div>

                  {profile && (
                    <div style={{ filter: 'blur(0.6px) drop-shadow(white 0px 0px 10px)' }}>
                      {comment.profile_id === session.user.id ? (
                        <button
                          type="button"
                          onClick={() => removeMessages(String(comment.id))}
                        >
                          Rimuovi il commento
                        </button>
                      ) : null}
                    </div>
                  )}

                </article>
              </div>
            </div>
          ))}
      </details>
    </div>
  );
}

export default Comments;
