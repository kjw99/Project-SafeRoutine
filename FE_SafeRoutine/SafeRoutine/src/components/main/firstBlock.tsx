// import '../../styles/main.css'
import React from 'react'
import MAIN from '../../constants/constMain.ts'
import styles from '../../styles/Main.module.scss'

const block = (props : {class : string}) => { 

    return(

        <div className={props.class}>
            <div className={styles.block_title}>
                <img src={MAIN.TITLE}/>
                <p className={styles.block_content_big}>
                    {MAIN.MAIN_CONTENT}
                </p> 
            </div>
            <div className={styles.sample_block}>
                <img src={MAIN.MAIN_IMG} sizes='small'/>
            </div>
        </div>

    )
}
export default block