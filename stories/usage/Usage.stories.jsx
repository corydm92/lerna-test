import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';

import Usage from '../../packages/usage';

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
	title: 'Example/Usage',
	component: Usage,
};

const Template = (args) => {
	return (
		<MuiThemeProvider theme={theme}>
			<Usage />
		</MuiThemeProvider>
	);
};

export const Primary = Template.bind({});
