import React from 'react';
import Input from '@material-ui/core/Input';

const CustomInput = ({ onChange = (value) => console.log(value) }) => {
	return (
		<span>
			<Input onChange={onChange}></Input>
		</span>
	);
};

export default CustomInput;
