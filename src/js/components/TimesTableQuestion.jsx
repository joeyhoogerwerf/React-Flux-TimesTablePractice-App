import React from 'react';

export default class TimesTableQuestion extends React.Component{
	render(){
		return(
			<span className="times-table-question">{this.props.calculation.firstNumber} x {this.props.calculation.secondNumber}</span>
		);
	}
}
TimesTableQuestion.propTypes = {
	calculation: React.PropTypes.object
};