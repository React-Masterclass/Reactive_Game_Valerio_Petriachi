import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import supabase from '../supabase/client';

function CommentPage() {
  const game = useLoaderData();
  const [success, setSuccess] = useState(false);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const { title, content } = Object.fromEntries(new FormData(commentForm));
    if (
      typeof title === 'string' &&
      typeof content === 'string' &&
      title.trim().length !== 0 &&
      content.trim().length !== 0
    ) {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            game_id: game.id,
            game_name: game.name,
            comment_title: title,
            comment_content: content,
          },
        ])
        .select();
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        commentForm.reset();
        setSuccess(true);
        console.log(data);
      }
    }
  };

  return (
    <div>
      <article>
        <h3>
          Write a comment about <br />
          <span
            style={{
              color: '#0F7A9E',
            }}
          >
            {game.name}
          </span>{' '}
        </h3>
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" />
          </label>
          <label htmlFor="content">
            Comment text
            <textarea
              type="text"
              id="content"
              name="content"
              placeholder="Write a comment"
            />
          </label>
          <button type="submit">
            {success ? 'Review inviata con successo ✅' : 'Publish'}
          </button>
        </form>
      </article>
    </div>
  );
}

export default CommentPage;
