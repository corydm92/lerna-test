import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';

import { GeneralModal } from '../../packages/modals';

import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 1280,
			lg: 1920,
			xl: 2560,
		},
	},
	palette: {
		primary: {
			main: '#0489BD',
		},
		custom: {
			lithiaDarkBlue: '#004666',
			lithiaLightBlue: '#2194cb',
			lithiaLightGray: '#E9E9E9',
			lithiaMedGray: '#617580',
			lithiaDarkGray: '#313d44',
			lithiaMedYellow: '#f4b225',
		},
	},
});

export default {
	title: 'Example/Modals',
	component: GeneralModal,
};

const Template = (args) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<MuiThemeProvider theme={theme}>
			<button onClick={() => setShowModal(!showModal)}>Show Modal?</button>
			<GeneralModal
				{...args}
				showModal={showModal}
				onDismiss={() => setShowModal(!showModal)}
				mainCallback={() => alert('Submit!')}
			/>
		</MuiThemeProvider>
	);
};

export const GeneralModalExample = Template.bind({});

GeneralModalExample.args = {
	content: 'Add some text content, supports JSX',
	title: 'General Modal Title',
	submitText: 'Ok',
	cancelText: 'Cancel',
	noSubmit: false,
	noCancel: false,
	noButtons: false,
	disableSubmit: false,
};
