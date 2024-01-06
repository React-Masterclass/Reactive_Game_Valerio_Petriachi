import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AppContext from '../contexts/AppContext';
import Avatar from '../components/Avatar';

export default function Settings() {
    const { session } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setfirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
  
    useEffect(() => {
      let ignore = false;
  
      async function getProfile() {
        try {
          setLoading(true);
  
          console.log('Session before check:', session);
  
          // Verifica se session è definito e contiene la proprietà user
          if (!session || !session.user) {
            console.error('Session or session.user is undefined');
            throw new Error('Session or session.user is undefined');
          }
  
          console.log('Session after check:', session);
          const { user } = session;
  
          console.log('User:', user);
  
          const { data, error } = await supabase
            .from('profiles')
            .select(`username, first_name, last_name, avatar_url`)
            .eq('id', user.id)
            .single();
  
          if (!ignore) {
            if (error) {
              console.warn(error);
            } else if (data) {
              setUsername(data.username);
              setfirstName(data.first_name);
              setLastName(data.last_name);
              setAvatarUrl(data.avatar_url);
            }
          }
  
          setLoading(false);
        } catch (error) {
          console.error(error.message);
          setLoading(false);
        }
      }
  
      getProfile();
  
      return () => {
        ignore = true;
      };
    }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={updateProfile}
      className={` form-widget`}
    >
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(event, url) => {
          updateProfile(event, url);
        }}
      />
      <div className="grid">
        <label htmlFor="first_name">
          First name
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First name"
            value={first_name || ''}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </label>
        <label htmlFor="last_name">
          Last name
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last name"
            value={last_name || ''}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email
          <input id="email" type="text" value={session.user.email} disabled />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button
          className="button block contrast outline"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </form>
  );
}
