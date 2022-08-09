import React from 'react'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="Footer">
        <div className="Footer-socials">
          <a href='#'>
            <FontAwesomeIcon icon={faTwitter}/>
          </a>
          <a href='#'>
            <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a href='#'>
            <FontAwesomeIcon icon={faLinkedin}/>
          </a>
        </div>
        <div className="Footer-terms">
            <br></br>
            <Link to='/'>Privacy Policy</Link>
            <Link to='/'>Terms of Service</Link>
            <small>©2022 G4G Games - All rights reserved.</small>
        </div>
    </div>
  )
}

export default Footer