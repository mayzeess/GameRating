import Link from "next/link"
import Image from "next/image";
import styles from "./style/GamesPage.module.css"
import DeleteButton from "./deletebutton"

type Game = {
    id: number,
    image: string,
    name: string,
    rating: number,
    description: string
}

type PostGame = {
  game: Game;
}

const InfoGame = ({game}: PostGame) => {
    return(
        <div>
            <h1>{game.name}</h1>
            <div className={styles.imageContainerinfo}>
                <Image src={game.image} alt={game.name} fill sizes="2000px" style={{objectFit: "cover", objectPosition: "center"} }/>
            </div>
            <div className={styles.gamecardinfo}>
                    <div className={styles.info}>
                        <h2>{game.name}</h2>
                        <p>Рейтинг: {game.rating}/10</p>
                        <p>Комментарий: {game.description}</p>
                        <div className={styles.buttons}>
                            <Link href="/game" className={styles.buttoninfo}>Назад</Link>
                            <Link href={`/game/${game.id}/edit`} className={`${styles.buttoninfo} ${styles.editButton}`}>Редактировать</Link>
                            <DeleteButton gameId={game.id}/>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default InfoGame