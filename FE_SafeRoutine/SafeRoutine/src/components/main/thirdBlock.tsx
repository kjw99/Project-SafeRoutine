import React from 'react'
import MAIN from '../../constants/constMain.ts'
import styles from '../../styles/Main.module.scss'

const block = (props : {class : string}) => { 

    return(

        <div className={props.class}>
            <div className={`${styles.block_title} ${styles.block_content_big} ${styles.second_text_right}`}>
                {MAIN.THIRD_TITLE}
            </div>
            <div className={styles.block_2nd_cards}>
                {MAIN.THIRD_EXAMPLE_IMG.map( (cardData) => (

                    <div className={styles.block_3rd_card}>
                        <div >
                            <img src={cardData.img}/>
                        </div>
                        <div className={`${styles.block_content_mid} ${styles.second_text}`}>
                            {cardData.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default block
