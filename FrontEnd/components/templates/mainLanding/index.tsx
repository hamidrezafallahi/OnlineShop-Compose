import React from 'react';

import Image from 'next/image';

// import VideoPlayer from '@/components/molecules/videoPlayer';
import mainLanding from '@/public/images/landingPage/backGrandMainLanding.jpg';
import Rectangle from '@/public/images/landingPage/Rectangle.png';

function MainLanding() {
  return (
    <div className="relative w-full sm:h-min-[220dvh]">
      <Image
        src={Rectangle}
        alt="Rectangle"
        className="top-[-4%] sm:top-[-7%] lg:top-[-10%] z-10 absolute inset-0 w-full"
      />
      <Image
        src={mainLanding}
        alt="mainLanding"
        fill
        layout="fill"
        priority
        className="object-fill sm:object-cover"
      />
      {/* <VideoPlayer /> */}
    </div>
  );
}

export default MainLanding;
