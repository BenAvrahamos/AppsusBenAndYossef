const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {

    const [isToggle, setIsToggle] = useState(false)

    return <header className="app-header">
        <Link to="/" className='logo-link'>
            <img className="logo-img" src="assets\img\logoTitle.png" alt="" />
        </Link>

        <section className="main-nav">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </section>

        <div onClick={() => setIsToggle(isToggle => !isToggle)} className="compact-btn "><span className="fa-solid fa-border-all"></span></div>

        {isToggle && <div onClick={() => setIsToggle(isToggle => !isToggle)} className="backdrop"></div>}

        {isToggle && <section className="compact-nav">
            <nav>
                <ul>
                    <li  > <NavLink onClick={() => setIsToggle(isToggle => !isToggle)} to="/">Home</NavLink>
                        <NavLink onClick={() => setIsToggle(isToggle => !isToggle)} to="/about">About</NavLink></li>

                    <li > <NavLink onClick={() => setIsToggle(isToggle => !isToggle)} to="/mail">Mail</NavLink>
                        <NavLink onClick={() => setIsToggle(isToggle => !isToggle)} to="/note">Note</NavLink></li>
                </ul>
            </nav>

        </section>}


    </header>




}
