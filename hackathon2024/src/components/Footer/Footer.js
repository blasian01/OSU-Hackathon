import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false); // State to control Thank You modal visibility
  const [isAlreadySubscribedModalOpen, setIsAlreadySubscribedModalOpen] = useState(false); // State for already subscribed modal
  const modalContentRef = useRef(null);
  const [email, setEmail] = useState('');

  const toggleModal = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  const closeThankYouModal = () => setIsThankYouModalOpen(false); // Function to close Thank You modal
  const closeAlreadySubscribedModal = () => setIsAlreadySubscribedModalOpen(false); // Function to close the already subscribed modal


  const addToNewsLetter = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/newsletterlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email })
    })
    .then(response => {
      if (response.ok) {
        setEmail('');
        setIsThankYouModalOpen(true);
      } else if (response.status === 400) {
        setIsAlreadySubscribedModalOpen(true); // Show the already subscribed modal on 400 status
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <footer className={styles['ffy-footer-section']}>
      <div className={styles['ffy-container']}>

        <div className={styles['ffy-footer-content']}>
          <div className="row">
            <div className="col-lg-4 mb-50">
              <div className={styles['ffy-footer-widget']}>
                <div className={styles['ffy-footer-text']}>
                  <p>Transforming Text, Beyond Imagination</p>
                </div>
                <div className={styles['ffy-footer-social-icon']}>
                  <span>Follow us</span>
                  <a href="https://www.instagram.com/fortaify/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram ffy-instagram-bg"></i></a>
                  <a href="https://x.com/AIFortaify?s=20" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter ffy-twitter-bg"></i></a>
                  <a href="https://www.tiktok.com/@fortaify?_t=8ioM8NEGS4V&_r=1" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok ffy-tiktok-bg"></i></a>
                  <a href="https://discord.gg/XjwsgZynKQ" target="_blank" rel="noopener noreferrer"><i className="fab fa-discord ffy-discord-bg"></i></a>
                </div>
              </div>
            </div>

            <div className={styles['ffy-footer-links']}>
              <div className={styles['ffy-footer-widget']}>
                <div className={styles['ffy-footer-widget-heading']}>
                  <h3>Useful Links</h3>
                </div>
                <ul className={styles['ffy-ul']}>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><a href="#!" onClick={() => setIsModalOpen(true)}>Contact</a></li>
                  <li><NavLink to="/news">News Letter</NavLink></li>
                  <li><NavLink to="/GlyphReviews">Glyph Reviews</NavLink></li>
                  <li><NavLink to="/VisionaryReviews">Visionary Reviews</NavLink></li>
                  <li><NavLink to="/AudioVerseReviews">AudioVerse Reviews</NavLink></li>
                </ul>
              </div>
            </div>

            <div className={styles['subscribe-box']}>
              <div className={styles['ffy-footer-widget']}>
                <div className={styles['ffy-footer-widget-heading']}>
                  <h3>Subscribe</h3>
                </div>
                <div className={styles['ffy-footer-text']}>
                  <p>Don’t miss to subscribe to our news feeds, kindly fill in your email below.</p>
                </div>

                <div className={styles['ffy-subscribe-form']}>
                  <form onSubmit={addToNewsLetter}>
                    <div className={styles['signup-inputbox']}>
                      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                      <label htmlFor="email">Email Address</label>
                    </div>
                    <button type="submit"><i className="fab fa-telegram-plane"></i></button>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div className={styles['ffy-copyright-area']}>
          <div className={styles['ffy-container']}>
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center">
                <div className={styles['ffy-copyright-text']}>
                  <p>Copyright &copy; 2024, All Right Reserved</p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className={styles['ffy-footer-menu']}>
                  <ul>
                    <li><NavLink to="/Terms">Terms</NavLink></li>
                    <li><NavLink to="/Privacy">Privacy</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
