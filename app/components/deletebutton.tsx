'use client'
import styles from "./style/GamesPage.module.css"

type DeleteButton = {
    gameId: number
}

const DeleteButton = ({gameId}: DeleteButton) => {

    const handleDelete = async () => {
        const confirmed = confirm("Удалить игру?");
        if (!confirmed) return;
        await fetch(`/api/game/${gameId}`, {
            method: "DELETE"
        })

        window.location.href = "/game"
    }

    return(
        <button type="button" className={`${styles.buttoninfo} ${styles.deleteButton}`} onClick={handleDelete}>
            Удалить
        </button>
    )
}

export default DeleteButton