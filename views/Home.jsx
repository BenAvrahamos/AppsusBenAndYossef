const { Link, NavLink } = ReactRouterDOM
export function Home() {
    return <section className="home">
        <h1>Welcome to Appsus!</h1>
        <h2>Pick your app</h2>
        <div className="img-home-container">
            <NavLink to="/note"><img src="assets/img/keep.png" alt="" /></NavLink>
            <NavLink to="/mail"><img src="assets/img/mail.jpg" alt="" /></NavLink>

        </div>

    </section>
}