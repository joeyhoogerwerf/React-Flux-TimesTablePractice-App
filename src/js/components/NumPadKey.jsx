import React from 'react';

export default class NumPadKey extends React.Component{
	constructor(){
		super();
		this._handleClick = () => {
			this.props.onClick();
		}
	}
	render(){
		return(
			<button onClick={this._handleClick}>{this.props.value}</button>
		);
	}
}
NumPadKey.propTypes = {
	onClick: React.PropTypes.func,
	value: React.PropTypes.string
};