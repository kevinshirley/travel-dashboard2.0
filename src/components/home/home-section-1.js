import React from 'react';
import Fade from 'react-reveal/Fade';
import MiniCard from 'src/components/common/mini-card';

function HomeSection1() {
  return (
    <section className="home-section-1">
      <div className="inner">
        <Fade bottom>
          <MiniCard subtitle='Sold Trips' content={371} url='/reports' />
        </Fade>
        <Fade bottom>
          <MiniCard subtitle='Monthly Earnings' content={'14k'} url='/reports' />
        </Fade>
        <Fade bottom>
          <MiniCard subtitle='Total Profiles' content={494} url='/reports' />
        </Fade>
        <Fade bottom>
          <MiniCard subtitle='Sold Trips' content={371} url='/reports' />
        </Fade>
      </div>
    </section>
  );
}

export default HomeSection1;
