import React from 'react';
// import Nav from 'src/components/Nav/Nav';

const SystemLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Nav /> */}
      <div className="font-poppins">{children}</div>
    </div>
  );
};

export default SystemLayout;
