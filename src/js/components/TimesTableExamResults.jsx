import React from 'react';
import StatusMessageActions from '../actions/TimesTableExamActions.js';

export default class TimesTableExamResults extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPracticeFaults = () => {
			StatusMessageActions.initFaultyTasks(this.props.calculations);
		}
	}
	render(){
		let faultyTasksDOMNodes = this.props.calculations.map(function(c){
			return(
				<li>{c.firstNumber} x {c.secondNumber} = {(c.firstNumber * c.secondNumber)}</li>
			);
		});
		let calculations = this.props.calculations;
		return(
			<div className="times-table-exam-results-container">
				<button className="grey-btn" onClick={this._handleClickPracticeFaults}>Oefen mijn fouten</button>
				<h2>Klaar met de oefening!</h2>
				<p>Je hebt <strong>{calculations.length}</strong> {calculations.length == 1 ? 'fout' : 'fouten'} gemaakt.</p>
				<ul className="faulty-questions">
					{faultyTasksDOMNodes}
				</ul>
			</div>
		);
	}
}
TimesTableExamResults.propTypes = {
	calculations: React.PropTypes.array
};