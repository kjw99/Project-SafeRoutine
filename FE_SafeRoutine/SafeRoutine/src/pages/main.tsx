import React from 'react'
import FirstBlock from '../components/main/firstBlock.tsx'
import SecondBlock from '../components/main/secondBlock.tsx'
import ThirdBlock from '../components/main/thirdBlock.tsx'

import styles from '../styles/Main.module.scss'

import useScrollFadeIn from '../hooks/useScrollFadeIn.tsx'


const main = () => {

    const scrollUpAnimation1 = useScrollFadeIn();
    const scrollUpAnimation2 = useScrollFadeIn();
    
    return (
        <body>
            <div className={styles.block_full}>

                <FirstBlock class={`${styles.block_default} ${styles.block_1st_full}`}/>
                <div {...scrollUpAnimation1}>
                <SecondBlock class={`${styles.block_default} ${styles.block_2nd_full}`}/>
                </div>
                <div {...scrollUpAnimation2}>
                <ThirdBlock class={`${styles.block_default} ${styles.block_3rd_full}`}/>
                </div>

            </div>
        </body>
    )
}

export default (main)