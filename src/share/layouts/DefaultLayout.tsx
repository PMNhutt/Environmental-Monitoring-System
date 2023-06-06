import React from 'react';
import Nav from 'src/components/Nav/Nav';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      <div className="pt-[100px] font-poppins">{children}</div>
    </div>
  );
};

export default DefaultLayout;
