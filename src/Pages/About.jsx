import React from 'react';
import styles from '../Styles/font.module.css';

function About() {
  return (
    <div>
      <div className={styles.buzz_wrapper}>
        <div className={styles.text}>
          <span>Chi sono</span>
        </div>
      </div>

      <div className={styles.buzz_wrapper}>
        <div className={styles.text}>
          <span>Valerio Petriachi</span>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <img src="http://tiny.cc/wztsvz" width={300} alt="" />
        <div>
          <div className={styles.typeContainer}>
            <div className={styles.typewriter}>
              <p>Se ti è piaciuto il mio lavoro, consulta il mio curriculum</p>
            </div>
          </div>
          <a href="https://drive.google.com/file/d/1R9TFFCILCeKZPayq3VZAz1JZZIDN5Ll5/view?usp=sharing">
            CURRICULUM VITAE
          </a>

          <div className={styles.typeContainer}>
            <div className={styles.typewriter}>
              <p>oppure puoi contattarmi anche su</p>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <a href="https://www.linkedin.com/in/valerio-petriachi-765541179/">
              <img src="https://www.shareicon.net/data/2015/05/24/43175_logo_512x512.png" alt="LinkedIn" className='iconAbout'/>
            </a>

            <a href="https://www.youtube.com/@bastascriverevalerio3655">
              <img src="https://iltamburoparlante.it/wp-content/uploads/2019/08/youtube-webtreatsblack-grunge-1-300x300.png" alt="YouTube" className='iconAbout'/>
            </a>

            <a href="https://www.instagram.com/bastascrivere_valerio/">
              <img src="https://www.onlygfx.com/wp-content/uploads/2022/04/instagram-logo-grunge-stamp-5.png" alt="Instagram" className='iconAbout'/>
            </a>

            <a href="https://www.facebook.com/valerio.petriachi.9">
              <img src="https://www.shareicon.net/data/512x512/2015/05/24/43154_logo_512x512.png" alt="Facebook" className='iconAbout'/>
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
