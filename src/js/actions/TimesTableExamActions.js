var AppDispatcher = require('../dispatcher/AppDispatcher');
var TimesTableExamConstants = require('../constants/TimesTableExamConstants.js');

var TimesTableExamActions = {
	init_tasks: function(activeTimeTables){
		AppDispatcher.dispatch({
			eventName: TimesTableExamConstants.INIT_TASKS,
			activeTimeTables: activeTimeTables
		});
	},
	initFaultyTasks: function(faultyTasks){
		AppDispatcher.dispatch({
			eventName: TimesTableExamConstants.INIT_FAULTY_TASKS,
			faultyTasks: faultyTasks
		});
	},
	verifyAwnswer: function(awnswer){
		AppDispatcher.dispatch({
			eventName: TimesTableExamConstants.VERIFY_AWNSWER,
			awnswer: awnswer
		});
	}
};

module.exports = TimesTableExamActions;