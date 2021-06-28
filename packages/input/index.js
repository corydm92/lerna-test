import React from 'react';

function Input({ className, ...props }) {
	return <input className={['avatar', className].join(' ')} {...props} />;
}

export default Input;
