import React from 'react';
import Nav from 'src/components/Nav/Nav';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="main">
        <div className="gradient" />
      </div>
      <Nav />
      <div className="font-poppins">{children}</div>
    </div>
  );
};

export default DefaultLayout;
