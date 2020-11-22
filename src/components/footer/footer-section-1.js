import React from 'react';
import Fade from 'react-reveal/Fade';
import Link from 'src/components/common/link';
import { KS, LOGO } from 'src/components/common/images';
import { SOFTELO } from 'src/components/common/svg';
import { SPACING } from 'src/components/material-ui/icons';

function FooterSection1() {
  const today = new Date(), year = today.getFullYear();

  return (
    <footer className="footer-section-1">
      <div className="inner">
        <div className="copyright-and-more">
          <div className="copyright">
            <Fade bottom><small>&copy; {year} Trip Imagine, All Rights Reserved.</small></Fade>
          </div>

          <div className="poweredby">
            <Fade bottom><small>Powered By{SPACING}{SPACING}<a href="http://kevinshirley.com" target="_blank" rel="noopener noreferrer"><img src={SOFTELO} alt="Softelo" /></a></small></Fade>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection1;