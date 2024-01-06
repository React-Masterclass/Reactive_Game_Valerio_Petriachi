import { useNavigate } from 'react-router-dom';
//import { FaGoogle, FaDiscord } from 'react-icons/fa';
//import { CiLogin } from 'react-icons/ci';
import supabase from '../supabase/client';
import styles from '../Styles/font.module.css';
// import AppContext from "../contexts/AppContext";

function Login() {
  // const { signIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(loginForm));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        loginForm.reset();
        navigate('/settings');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithDiscord = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: 'http://localhost:5173/settings',
        },
      });
      console.log(data, error);
      // if (error) {
      //   alert(error.error_description || error.message)
      // } else {
      //   navigate('/settings')
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" style={{ filter: 'drop-shadow(white 0px 0mm 2mm) blur(1px)', }}>
      <div >
        <div id="LoginEmail" >
        <div className={styles.buzz_wrapper}>
            <div className={styles.text}>
                <span >Login</span>
            </div>
        </div>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">
              Email address
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tuamail@provider.com"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="almeno6caratteri"
              />
            </label>
            <button type="submit">
              Fai sign In
             
            </button>
          </form>
        </div>
        <div id="LoginOAuth" >
        <p className={styles.typewriter}>Puoi fare login con Social auth</p>
          <button type="button" className="secondary">
            Login con Google
            
          </button>
          <button
            type="button"
            className="contrast"
            onClick={handleLoginWithDiscord}
          >
            Login con Discord
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;