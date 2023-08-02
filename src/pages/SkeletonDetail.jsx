import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonDetail = (props) => (
  <ContentLoader
    speed={2}
    width={1370}
    height={376}
    viewBox="0 0 1370 376"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="571" height="300" />
    <rect x="600" y="23" rx="0" ry="0" width="742" height="31" />
    <rect x="600" y="85" rx="0" ry="0" width="742" height="97" />
    <rect x="600" y="223" rx="0" ry="0" width="742" height="50" />
  </ContentLoader>
);

export default SkeletonDetail;
