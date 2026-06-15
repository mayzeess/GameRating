import Link from "next/link"

const Header = () => {
    return(
        <header>
            <nav>
                <Link href="/" className="navLink">Home</Link>
                <Link href="/about" className="navLink">About</Link>
                <Link href="/game" className="navLink">Game</Link>
            </nav>
        </header>
    )
}

export default Header