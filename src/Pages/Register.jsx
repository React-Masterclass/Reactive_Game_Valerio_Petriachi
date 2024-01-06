import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabase/client';
import styles from '../Styles/font.module.css';

const schemaValidation = Yup.object({
  username: Yup.string()
    .min(6, 'Deve contenere almeno 6 caratteri 😡')
    .required('Required'),
  email: Yup.string()
    .email('Inserisci una email valida 🥵')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Deve contenere almeno 4 caratteri 😡')
    .required('password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

function Register() {

  const navigate = useNavigate();

  const handleRegisterFormik = async (values) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
          },
        },
      });
      if (error) {
        alert(error.error_description || error.message);
      } else {
        navigate('/settings');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div >
        <div id="Register" >

        <div className={styles.buzz_wrapper}>
            <div className={styles.text}>
                <span >Registra come nuovo account</span>
            </div>
        </div>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirm_password: '',
            }}
            validationSchema={schemaValidation}
            onSubmit={(values) => {
              handleRegisterFormik(values);
            }}
          >
            {({ errors, touched }) => (
              <Form style={{ filter: 'drop-shadow(white 0px 0mm 2mm) blur(1px)', }}>
                <label htmlFor="username">
                  Username
                  <Field
                    name="username"
                    type="text"
                    placeholder="test_account"
                  />
                </label>
                {errors.username && touched.username ? (
                  <p >{errors.username}</p>
                ) : null}
                <label htmlFor="email">
                  Email address
                  <Field
                    name="email"
                    type="email"
                    placeholder="test@gmail.com"
                  />
                </label>
                {errors.email && touched.email ? (
                  <p >{errors.email}</p>
                ) : null}
                <label htmlFor="password">
                  Password
                  <Field
                    name="password"
                    type="password"
                    placeholder="supersecret"
                  />
                </label>
                {errors.password && touched.password ? (
                  <p >{errors.password}</p>
                ) : null}
                <label htmlFor="confirm_password">
                  Confirm Password
                  <Field
                    name="confirm_password"
                    type="password"
                    placeholder="supersecret"
                  />
                </label>
                {errors.confirm_password && touched.confirm_password ? (
                  <p >
                    {errors.confirm_password}
                  </p>
                ) : null}
                <button type="submit">
                  Fai Sign Up
                  
                </button>
              </Form>
            )}
          </Formik>

          

          
          <p>
            Ho gia un account, vai a <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;