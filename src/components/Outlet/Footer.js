import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='foot'>
        <div className="section-contact--homepage" id="section-contact--homepage">
        <div className="container grid grid-two--cols">
          <div className="contact-content">
            <h2 className="contact-title">Let's revolutionize the way you study</h2>
            <p>Join our free bootcamps to know us better</p>
            <div className="btn">
              <Link to='/Courses'>
                start now <i className="fa-solid fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>
          <div className="contact-image">
            <img src="https://i.ibb.co/3W0wRHN/main.png" alt="a guy doing coding" />
          </div>
        </div>
      </div>

      <footer>
        <div className="container grid grid-four--cols">
          <div className="footer-1--div">
            <div className="logo-brand">
              <Link to='/courses' className="footer-subheading">CodeMasters</Link>
            </div>
            <p>Let's revolutionize the way you study with CodeMasters</p>

            <div className="social-footer--icons">
              <Link to='/courses'>
                <i className="fa-brands fa-discord"></i>
              </Link>
              <Link to='/courses'>
                <i className="fa-brands fa-youtube"></i>
              </Link>
              <Link to='/courses'>
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </div>
          </div>

          <div className="footer-2--div">
            <p className="footer-subheading">Courses</p>
            <ul>
              <li><Link to='/courses'> HTML </Link></li>
              <li><Link to='/courses'> CSS </Link></li>
              <li><Link to='/courses'> JavaScript</Link></li>
              <li><Link to='/courses'> React </Link></li>
              <li><Link to='/courses'> Java </Link></li>
            </ul>
          </div>

          <div className="footer-3--div">
            <p className="footer-subheading">Links</p>
            <ul>
              <li><Link to='/courses'> Home </Link></li>
              <li><Link to='/courses'> About </Link></li>
              <li><Link to='/courses'> Courses </Link></li>
              <li><Link to='/courses'> Quizzes </Link></li>
              <li><Link to='/courses'> Roadmaps </Link></li>
            </ul>
          </div>

          <div className="footer-4--div">
            <p className="footer-subheading">Quizzes</p>
            <ul>
              <li><Link to='/courses'> HTML </Link></li>
              <li><Link to='/courses'> CSS </Link></li>
              <li><Link to='/courses'> JS </Link></li>
              <li><Link to='/courses'> React </Link></li>
              <li><Link to='/courses'> Spring Boot </Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer