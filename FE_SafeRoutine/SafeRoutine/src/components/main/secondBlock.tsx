// import '../../styles/main.css'
import React from 'react'
import MAIN from '../../constants/constMain.ts'
import styles from '../../styles/Main.module.scss'
const block = (props : {class : string}) => { 

    return(

        <div className={props.class}>
            <div className={`${styles.block_title} ${styles.block_content_big} ${styles.second_text_left}`}>
                {MAIN.SECOND_TITLE}
            </div>
            <div className={styles.block_2nd_cards}>
                {MAIN.SECOND_EXAMPLE_IMG.map( (cardData) => (

                    <div className={styles.block_2nd_card}>
                        <div className={`${styles[cardData.css_1st]} ${styles.second_text}`}>
                            {cardData.name}
                        </div>
                        <div >
                            <img src={cardData.img}/>
                        </div>
                        <div className={`${styles[cardData.css_2nd]} ${styles.second_text}`}>
                            {cardData.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles.block_content_mid} ${styles.second_text}`}>
                {MAIN.SECOND_CONTENT}
            </div>
        </div>

    )
}
export default block
