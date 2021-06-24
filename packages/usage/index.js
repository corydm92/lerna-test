import React from 'react';
import Button from '@cdm-lerna-test/button';
import Avatar from '@cdm-lerna-test/avatar';

const CustomUsage = ({ showButton = true, showAvatar = true, ...props }) => {
	return (
		<div>
			{showButton && <Button buttonText="Button for Usage!" />}
			{showAvatar && <Avatar src="https://placedog.net/540/320" />}
		</div>
	);
};

export default CustomUsage;
