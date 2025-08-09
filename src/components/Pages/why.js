import React from 'react'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
export const Why = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <React.Fragment>

      <section className="section-why--choose">
        <div className="container">
          <h2 className="section-common-heading">Why Choose CodeMasters</h2>
          <p className="section-common-subheading">
            Choose CodeMasters for a holistic, enriching learning experience that empowers you to achieve your goals.
          </p>
        </div>

        <div className="container grid grid-three--cols">
          <div className="choose-left--div text-align--right">
            <div className="why-choose--div">
              <p className="common-text--highlight">1</p>
              <h3 className="section-common--title">Expert Instructors</h3>
              <p>
                Learn from experienced teachers who are passionate about sharing
                knowledge and guiding you toward success in your learning journey.
              </p>
            </div>

            <div className="why-choose--div" data-aos="zoom-in-up" data-aos-delay="300">
              <p className="common-text--highlight">2</p>
              <h3 className="section-common--title">Interactive Lessons</h3>
              <p>
                Engage in hands-on learning experiences that make education fun
                and memorable. Interactive lessons encourage active participation
                and deeper understanding.
              </p>
            </div>

            <div className="why-choose--div" data-aos="zoom-in-up" data-aos-delay="600">
              <p className="common-text--highlight">3</p>
              <h3 className="section-common--title">Lifelong Learning Support</h3>
              <p>
                Our commitment to your education doesn't end with a certificate.
                Receive ongoing support and resources for continuous learning and
                growth.
              </p>
            </div>
          </div>

          <div className="choose-center--div" data-aos="zoom-in">
            <figure>
              <img src="https://res.cloudinary.com/clicknbuy/image/upload/v1732525677/mobile-apps-banner-right-removebg-preview_all3ai.png" alt="Mobile" loading="lazy"/>
            </figure>
          </div>

          <div className="choose-right--div text-align--left">
            <div className="why-choose--div">
              <p className="common-text--highlight">4</p>
              <h3 className="section-common--title">Pricing Model</h3>
              <p>
              Code Masters offers a transparent and accessible pricing model. Most courses on Code Masters are available for free or at very minimal cost, ensuring affordability for learners of all backgrounds.
              </p>
            </div>

            <div className="why-choose--div text-align--left" data-aos="zoom-in-up" data-aos-delay="300">
              <p className="common-text--highlight">5</p>
              <h3 className="section-common--title">Courses and Tutorials:</h3>
              <p>
              Code Masters offers a diverse range of courses and tutorials 
              covering various programming languages, frameworks, and technologies.
              </p>
            </div>

            <div className="why-choose--div text-align--left" data-aos="zoom-in-up" data-aos-delay="600">
              <p className="common-text--highlight">6</p>
              <h3 className="section-common--title">Structured Learning: </h3>
              <p>
              Offer comprehensive coding roadmaps that guide 
              learners through various coding languages, frameworks, and paradigms. 
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
