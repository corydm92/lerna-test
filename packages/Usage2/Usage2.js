import React from 'react';
import Button from '@cdm-lerna-test/button';
import Avatar from '@cdm-lerna-test/avatar';

const CustomUsage2 = ({ showButton = true, showAvatar = true, ...props }) => {
	return (
		<div>
			{showButton && <Button buttonText="Button for Usage2!" />}
			{showAvatar && <Avatar src="https://placedog.net/540/320" />}
		</div>
	);
};

export default CustomUsage2;
