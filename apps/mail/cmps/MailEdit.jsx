

export function MailEdit() {

    return <section className="mail-edit-container">
        <h1>New Message</h1>

        <div className="mail-edit-details">
            <div className="mail-to">
                <label htmlFor="mail-to">To</label>
                <input type="text" id="mail-to" />
            </div>
            <input className="mail-edit-subject" type="text" placeholder="Subject" />
        </div>
        <textarea className="mail-edit-body" name="" id=""
           placeholder="Body" cols="50" rows="10"></textarea>
        <button>Send</button>






    </section>


}