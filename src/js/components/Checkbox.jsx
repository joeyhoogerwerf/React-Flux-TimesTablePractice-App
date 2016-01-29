import React from 'react';

export default class Checkbox extends React.Component{
	constructor(){
		super();
		this._handleClick = (e) => {
			this.props.onClick(e);
		}
	}
	render(){
		let labelForString = "checkbox-" + this.props.value;
		return(
			<p>
				<label htmlFor={labelForString}>{this.props.label}
					<input type="checkbox" value={this.props.value} id={labelForString} name={this.props.name} checked={this.props.checked} onClick={this._handleClick} />
				</label>
			</p>
		);
	}
}
Checkbox.propTypes = {
	onClick: React.PropTypes.func
};