var AppDispatcher = require('../dispatcher/AppDispatcher');
import TimesTableSelectionConstants from '../constants/TimesTableSelectionConstants.js';

var TimesTableSelectionActions = {
	handle_selection_click: function(value, checked){
		console.log(value);
		AppDispatcher.dispatch({
			eventName: TimesTableSelectionConstants.HANDLE_SELECTION_CLICK,
			value: value,
			checked: checked
		});
	},
	handle_select_all: function(){
		AppDispatcher.dispatch({
			eventName: TimesTableSelectionConstants.HANDLE_SELECT_ALL
		});
	},
	start_exam: function(){
		AppDispatcher.dispatch({
			eventName: TimesTableSelectionConstants.START_EXAM
		});
	}
};

module.exports = TimesTableSelectionActions;