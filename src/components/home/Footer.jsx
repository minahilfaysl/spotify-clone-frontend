import React from 'react';

import "../../styles/home/footer.scss";

const Footer = () => (
    <div className='footer'>
      <div className='footerContainer'>
        <div className='footerCol'>
          <p className='title'>Company</p>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>
          <p>Communities</p>
        </div>

        <div className='footerCol'>
          <p className='title'>For Artists</p>
          <p>Developers</p>
          <p>Advertising</p>
          <p>Investors</p>
          <p>Vendors</p>
          <p>Useful links</p>
        </div>

        <div className='footerCol'>
          <p className='title'>Support</p>
          <p>Free Mobile App</p>
        </div>
      </div>

      <div className='divider'></div>

      <div className='bottomText'>
        <p>Legal</p>
        <p>Privacy Center</p>
        <p>Privacy Policy</p>
        <p>Cookies</p>
        <p>About Ads</p>
        <p>Accessibility</p> 
      </div>

      <p className='bottomText'>© 2023 Spotify Clone</p>
    </div>
);

export default Footer;