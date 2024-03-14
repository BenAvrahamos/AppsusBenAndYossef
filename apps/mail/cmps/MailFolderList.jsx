export function MailFolderList() {

    return <section className="mail-folder-list-container">

        <button className="compose-btn">Compose</button>

        <section className="folder-options">

            <div className="">Inbox <span className="amount">35</span></div>
            <div>Starred <span className="amount">35</span></div>
            <div>Sent <span className="amount">35</span></div>
            <div>Draft <span className="amount">35</span></div>
            <div>Trash <span className="amount">35</span></div>

        </section>

    </section>


}