import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
	return {
		submitButton: {
			marginRight: theme.spacing ? theme.spacing(1) : '8px !important',
		},
	};
});

const GeneralModal = ({
	onDismiss = () => {},
	mainCallback = () => {},
	content = 'Add some text content, supports JSX',
	title = 'General Modal Title',
	showModal = false,
	submitText = 'Ok',
	cancelText = 'Cancel',
	noSubmit = false,
	noCancel = false,
	noButtons = false,
	disableSubmit = false,
}) => {
	const classes = useStyles();
	return (
		<Modal
			onDismiss={onDismiss}
			content={content}
			title={title}
			open={showModal}
			actions={
				!noButtons && (
					<span>
						{!noSubmit && (
							<Button
								onClick={mainCallback}
								variant="contained"
								color="primary"
								disabled={disableSubmit}
								className={classes.submitButton}
							>
								{submitText}
							</Button>
						)}
						{!noCancel && (
							<Button onClick={onDismiss} color="primary">
								{cancelText}
							</Button>
						)}
					</span>
				)
			}
		/>
	);
};

GeneralModal.propTypes = {
	onDismiss: PropTypes.func,
	mainCallback: PropTypes.func,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	title: PropTypes.string,
	showModal: PropTypes.bool.isRequired,
	submitText: PropTypes.string,
	cancelText: PropTypes.string,
	noSubmit: PropTypes.bool,
	noCancel: PropTypes.bool,
	noButtons: PropTypes.bool,
};

export default GeneralModal;
