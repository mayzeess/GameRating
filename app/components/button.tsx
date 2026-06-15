import Link from "next/link"
import styles from "./style/button.module.css"

type buttonType = {
    href: string,
    text: string
}

const Button = ({href, text}: buttonType) => {
    return(
        <Link className={styles.button} href={href}>{text}</Link>
    )
}

export default Button