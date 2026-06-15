import Link from "next/link"
import styles from "./style/InfoMain.module.css"

const InfoMain = () => {    

    return(
        <div className={styles.text}>
            <p>
                Данный сайт предназначен для оценки игр.<br/>
                Чтобы посмотреть пройденные игры автора нажмите сюда.
            </p>
            <Link href="/game" className="navLink">Game</Link>
        </div>
    )
}

export default InfoMain