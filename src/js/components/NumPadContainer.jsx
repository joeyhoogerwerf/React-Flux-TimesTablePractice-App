import React from 'react';
import NumPad from './NumPad.jsx';
import TimesTableExamActions from '../actions/TimesTableExamActions.js';

export default class NumPadContainer extends React.Component{
	constructor(){
		super();
		this._handleSubmit = (v) => {
			TimesTableExamActions.verifyAwnswer(v);
		}
	}

	render(){
		return(
			<NumPad onSubmit={this._handleSubmit} />
		);
	}
}
NumPadContainer.propTypes = {
	NumPad: React.PropTypes.element
};