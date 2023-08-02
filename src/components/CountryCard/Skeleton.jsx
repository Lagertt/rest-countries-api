import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={400}
    viewBox="0 0 300 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="420" height="179" />
    <rect x="0" y="210" rx="0" ry="0" width="130" height="25" />
    <rect x="0" y="270" rx="0" ry="0" width="220" height="16" />
    <rect x="0" y="295" rx="0" ry="0" width="220" height="16" />
    <rect x="0" y="320" rx="0" ry="0" width="220" height="16" />
  </ContentLoader>
);

export default Skeleton;
