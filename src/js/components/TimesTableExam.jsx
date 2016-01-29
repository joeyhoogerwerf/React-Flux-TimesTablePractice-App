import React from 'react';
import TimesTableQuestion from './TimesTableQuestion.jsx';
import TimesTableExamActions from '../actions/TimesTableExamActions.js';
import TimesTableExamStore from '../stores/TimesTableExamStore';
import NumPadContainer from './NumPadContainer.jsx';
import TimesTableExamResults from './TimesTableExamResults.jsx';

export default class TimesTableExam extends React.Component{
	constructor(){
		super();
		this.state = {
			calculation: {},
			calculations:[],
			isFinished: false
		}
		this._handleChange = () => {
			this.setState({
				calculation: TimesTableExamStore.getCurrentCalculation(),
				calculations: TimesTableExamStore.getCalculations(),
				calculationsAnsweredWrong: TimesTableExamStore.getCalculationsAnsweredWrong(),
				isFinished: TimesTableExamStore.getIsFinished()
			});
		}
	}
	componentDidMount(){
		TimesTableExamStore.bind('change', this._handleChange);
		TimesTableExamActions.init_tasks(this.props.activeTimeTables);
	}
	render(){
		if(!this.state.isFinished){
			console.log(this.state.calculations);
			return(
				<div className="times-table-exam-container">
					<div className="times-table-question-container">
						<h2>Los de volgende som op:
							<TimesTableQuestion calculation={this.state.calculation} />
						</h2>
					</div>
					<NumPadContainer />
				</div>
			);
		}else{
			return(
				<TimesTableExamResults calculations={this.state.calculationsAnsweredWrong} />
			);
		}
	}
}
TimesTableExam.propTypes = {
	activeTimeTables: React.PropTypes.array
};
