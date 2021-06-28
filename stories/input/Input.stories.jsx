import React from 'react';

import Input from '../../packages/input';

export default {
	title: 'Example/Input',
	component: Input,
};

// We create a “template” of how args map to rendering
const Template = () => {
	return <Input />;
};

// Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {};
