import React from 'react';

const LightThemeWrapper = ({ children }) => {
  return (
    <div
      className="light"
      style={{
        background: 'var(--color-background-1000)',
        color: 'var(--color-foreground-1000)',
      }}
    >
      {children}
    </div>
  );
};

export default LightThemeWrapper;
