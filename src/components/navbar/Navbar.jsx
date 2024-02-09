import "./navbar.css";

export const Navbar = () => {

    const balance = 200;

  return (
    <nav className='nav-bar'>
        {/* Logo section */}
        <div className="logo-section">
            <p>Aviator</p>
        </div>

        {/* nav links */}
        <ul className="nav-links">
            <li>
                <a href="#home">Home</a>
            </li>
            <li>
                <a href="#about">About</a>
            </li>
            <li>
                <a href="#services">Services</a>
            </li>
            <li>
                <a href="#portfolio">Portfolio</a>
            </li>
            <li>
                <a href="#contact">Contact</a>
            </li>
        </ul>

        {/* Account details section */}
        <div className="account-actions-section">
            <p>Balance: {balance}</p>
            <button className="account-actions-btn">Sign In</button>
        </div>
    </nav>
  )
}
