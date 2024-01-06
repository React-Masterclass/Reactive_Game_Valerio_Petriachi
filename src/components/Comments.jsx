import { useEffect, useState } from 'react';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';

function Comments({ game }) {
  const [comments, setComments] = useState([]);
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
  }, []);

  return (
    <div>
      <h4>{game.name} Reviews</h4>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <div >
              <article>
                <p >{comment.comment_title}</p>
                <p>{comment.comment_content}</p>
                <div >
                  <p >
                    Published by: {comment.profile.username}
                  </p>
                  <p >
                    {formatMessageDate(comment.created_at)}
                  </p>
                </div>
              </article>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Comments;
