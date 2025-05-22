import './Contact.css'
import { ContactLogo } from './ContactLogo';

const Contact: React.FC = () => {
    return (
        <>
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <p>We'd love to hear from you!</p>
                </div>

                <div className="contact-form">
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>

                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <div className="Logos"><ContactLogo /></div>
        </>
    );
};

export default Contact;