import React from 'react';
import Button from '@material-ui/core/Button';

const CustomButton = ({
	className,
	buttonText,
	variant = 'contained',
	...props
}) => {
	return (
		<Button
			onClick={() => console.log(buttonText)}
			className={className}
			variant={variant}
			{...props}
		>
			{buttonText}
		</Button>
	);
};

export default CustomButton;
