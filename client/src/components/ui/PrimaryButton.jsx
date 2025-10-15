import React from 'react';

// ✅ FIX: Destructure the onClick prop and any other props using the ...rest operator.
function PrimaryButton({ children, onClick, ...rest }) {
  return (
    // ✅ FIX: Pass the onClick handler and any other props to the div.
    <div
      className='px-4 py-2 bg-zinc-200 text-zinc-900 rounded cursor-pointer transition-all hover:bg-zinc-600 hover:text-zinc-200 hover:shadow-lg shadow-zinc-100/50'
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
}

export default PrimaryButton;