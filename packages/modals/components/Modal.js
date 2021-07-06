import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@material-ui/core';

const Modal = ({ title, content, actions, onDismiss, open }) => {
	return (
		<Dialog
			onClose={onDismiss}
			aria-labelledby="lithia-dialog-title"
			open={open}
		>
			<DialogTitle id="lithia-dialog-title">{title}</DialogTitle>
			<DialogContent dividers>{content}</DialogContent>
			{actions && <DialogActions>{actions}</DialogActions>}
		</Dialog>
	);
};

export default Modal;
