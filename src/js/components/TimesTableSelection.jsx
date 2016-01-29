import React from 'react';
import Checkbox from './Checkbox.jsx';
import TimesTableSelectionActions from '../actions/TimesTableSelectionActions.js';
import TimesTableSelectionStore from '../stores/TimesTableSelectionStore.js';

export default class TimesTableSelection extends React.Component{
	constructor(){
		super();
		this.state = {
			timesTables: TimesTableSelectionStore.getTimesTables()
		};
		this._handleSelectionClick = (e) => {
			TimesTableSelectionActions.handle_selection_click(e.target.value, e.target.checked);
		}
		this._handleSelectAllCheckboxes = (e) => {
			TimesTableSelectionActions.handle_select_all();
		}
	}
	render(){
		let checkboxes = this.state.timesTables.map((tT) => {
			let tTId = tT.id.toString();
			return <Checkbox key={tTId} value={tTId} label={"Tafel van " + tTId} name={"single-times-table-checkbox"} checked={tT.checked} onClick={this._handleSelectionClick} />
		});
		return(
				<div className="times-tables-selection-container">
					<button className="grey-btn" onClick={TimesTableSelectionActions.start_exam}>Start de toets</button>
					<Checkbox value={"all"} label={"Alle tafels"} name={"select-all"} onClick={this._handleSelectAllCheckboxes} />
					{checkboxes}
				</div>
		);
	}
}