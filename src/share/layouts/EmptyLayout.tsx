import React from 'react';

const EmptyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="font-poppins">{children}</div>
    </div>
  );
};

export default EmptyLayout;
