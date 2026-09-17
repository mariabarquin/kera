function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-left">
                    <a href="#products">PRODUCTS</a>
                    <a href="#about">ABOUT KERA</a>
                </div>

                <a href="/" className="logo">
                KERA
                </a>

                <div className="nav-right">
                    <a href="#profile">PROFILE</a>
                    <a href="#cart">CART</a>
                </div>
            </nav>
        </header>
    );
}

export default Header;