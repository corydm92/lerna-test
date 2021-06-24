import React from 'react';
import Button from '@material-ui/core/Button';

const CustomButton = ({ className, buttonText, ...props }) => {
	return (
		<Button
			onClick={() => console.log(buttonText)}
			className={className}
			variant="contained"
			{...props}
		>
			{buttonText}
		</Button>
	);
};

export default CustomButton;
