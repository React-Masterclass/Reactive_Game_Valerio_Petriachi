import styles from '../Styles/font.module.css';

function About(){

    return (
        <div>
            <div className={styles.buzz_wrapper}>
                <div className={styles.text}>
                <span >Chi sono</span>
                </div>
            </div>

            <div className={styles.buzz_wrapper}>
                <div className={styles.text}>
                <span >Valerio Petriachi</span>
                </div>
            </div>

            <div style={{display: 'flex'}}>
                <img src="http://tiny.cc/wztsvz" width={300} alt="" />
                <div>
                    
                <div className={styles.typeContainer}>
                    <div className={styles.typewriter}>
                        <p>Se ti è piaciuto il mio lavoro, consulta il mio curriculum</p>
                    </div>
                </div>
                    <a href="https://drive.google.com/file/d/1R9TFFCILCeKZPayq3VZAz1JZZIDN5Ll5/view?usp=sharing">CURRICULUM VITAE </a>

                <div className={styles.typeContainer}>
                    <div className={styles.typewriter}>
                        <p>oppure puoi conttarmi anche su</p>
                    </div>
                </div>


                </div>
            </div>
            

        </div>
    )
    
}
    
export default About;