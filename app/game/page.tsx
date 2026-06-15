import GameCard from "../components/gamecard";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { prisma } from "@/app/lib/prisma";

const geistOswald = Oswald({
  subsets: ["latin"],
});

export default async function Game() {  

  const games = await prisma.game.findMany();

  return (
    <div>
        <GameCard games={games}/>
    </div>
  );
}