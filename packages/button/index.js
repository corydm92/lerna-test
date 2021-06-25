import React from 'react';
import Button from '@material-ui/core/Button';

const CustomButton = ({
	className,
	buttonText,
	variant = 'contained',
	primary = true,
	callback = () => console.log('Click!'),
}) => {
	return (
		<Button
			onClick={callback}
			className={className}
			variant={variant}
			color={primary ? 'primary' : 'secondary'}
		>
			{buttonText}
		</Button>
	);
};

export default CustomButton;
