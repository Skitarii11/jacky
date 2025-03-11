import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <img src={ assets.logo } alt="" />
        <hr />
        <div className="footer-content">
            
            <div className="footer-content-left">
                
                <h2>Холбоо барих</h2>
                <ul>
                    <li>About Us</li>
                </ul>
            </div>
            <div className="footer-content-center">
                <h2>Features</h2>
                <ul>
                    <li>Business Marketing</li>
                    <li>User Analytic</li>
                    <li>Live Chat</li>
                    <li>Unlimited Support</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Resources</h2>
                <ul>
                    <li>IOS & Android</li>
                    <li>Watch a Demo</li>
                    <li>Customers</li>
                    <li>API</li>
                </ul>
            </div>
        </div>
        <p className="footer-copyright">©Copyright 2024</p>
    </div>
  )
}

export default Footer