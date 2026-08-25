import './NavBar.css'
export default function NavBar() {
    return (
        <nav>
            <span>Seja Bem Vindo</span>
            <ul>
                <li><a href="/">inicio</a></li>
                <li><a href="/carro">carro</a></li>
                <li><a href="/concessionaria">concessionaria</a></li>
            </ul>
        </nav>
    );
}