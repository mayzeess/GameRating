import { Geist, Geist_Mono, Oswald } from "next/font/google";
import FormAddGame from "@/app/components/addgameform";

const geistOswald = Oswald({
  subsets: ["latin"],
});

export default function Game() {  
  return (
    <div>
        <FormAddGame />
    </div>
  );
}