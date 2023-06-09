import React from 'react';
import SystemNav from 'src/components/SystemNav/SystemNav';

const SystemLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SystemNav />
      <div className="font-poppins mt-[72px]">{children}</div>
    </div>
  );
};

export default SystemLayout;
