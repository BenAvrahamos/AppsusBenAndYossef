const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./apps/mail/cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"
import { UserMsg } from "./apps/mail/cmps/UserMsg.jsx"


export function App() {
    return <Router>

        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
        <UserMsg />
    </Router>
}
