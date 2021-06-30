import React from 'react';
import Input from '@material-ui/core/Input';

const CustomInput = ({ onChange = (e) => console.log(e.target.value) }) => {
	return (
		<div>
			<Input onChange={onChange} />
		</div>
	);
};

export default CustomInput;
