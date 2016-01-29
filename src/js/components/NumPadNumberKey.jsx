import React from 'react';
import NumPadKey from './NumPadKey.jsx';

export default class NumPadNumberKey extends React.Component{
	constructor(){
		super();
		this._handleClick = () => {
			this.props.onClick(this.props.value);
		}
	}
	render(){
		return(
			<NumPadKey onClick={this._handleClick} value={this.props.value} />
		);
	}
}
NumPadNumberKey.propTypes = {
	NumPadKey: React.PropTypes.element,
	onClick: React.PropTypes.func,
	value: React.PropTypes.string
};