import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-company-box'>
                    <Link to='/' className='logo'><span>Aaro</span> gyam</Link>
                    <p>AaroGyam is dedicated to promoting health and wellness and to help individuals improve their overall health.We value our users' privacy and are committed to keeping their personal information secure.</p>

                    <div className='footer-social'>
                        <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                        <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
                    </div>
                </div>

                <div className='footer-link-box'>
                    <strong>Main Links</strong>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/search-doctor'>Appointments</Link></li>
                        <li><Link to='/signup'>Login</Link></li>
                        <li><Link to='/'>Insurance Information</Link></li>
                        <li><Link to='/'>Services</Link></li>
                    </ul>
                </div>

                <div className='footer-link-box'>
                    <strong>Legal and Privacy</strong>
                    <ul>
                        <li><Link to='/'>About Us</Link></li>
                        <li><Link to='/'>Contact Us</Link></li>
                        <li><Link to='/'>Privacy Policy</Link></li>
                        <li><Link to='/'>Terms and Conditions</Link></li>
                        <li><Link to='/'>Medical Disclaimer</Link></li>
                    </ul>
                </div>

                <div className='footer-link-box'>
                    <strong>Explore Our Website</strong>
                    <ul>
                        <li><Link to='/'>Testimonials</Link></li>
                        <li><Link to='/'>Careers</Link></li>
                        <li><Link to='/'>Research and Education</Link></li>
                        <li><Link to='/'>News and Events</Link></li>
                        <li><Link to='/'>Resources</Link></li>
                    </ul>
                </div>
            </div>

            <div className='footer-bottom'>
                <span>Made with ❤️ in India</span>
                <span>Copyright 2023 @AaroGyam</span>
            </div>

        </footer>
    )
}

export default Footer