import InfoGame from "@/app/components/infogame"
import { prisma } from "@/app/lib/prisma"

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function Game({params} : Props) {

    const { id } = await params
    const game = await prisma.game.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!game) {
        return <h1>Игра не найдена</h1>
    }

    return <InfoGame game={game} />
}