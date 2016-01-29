var Dispatcher = require('../dispatcher/AppDispatcher.js')
var MicroEvent = require('microevent');
import TimesTableSelectionConstants from '../constants/TimesTableSelectionConstants.js';

var TimesTableSelectionStore = Object.assign({}, MicroEvent.prototype, {
	examIsActive: false,/* Flag when exam is active */
	selectAllIsActive: false,/* Flag when user clicked 'All times tables' checkbox */
	timesTables: [
		{id: 1, checked: false},
		{id: 2, checked: false},
		{id: 3, checked: false},
		{id: 4, checked: false},
		{id: 5, checked: false},
		{id: 6, checked: false},
		{id: 7, checked: false},
		{id: 8, checked: false},
		{id: 9, checked: false},
		{id: 10, checked: false}
	],
	
	getExamIsActive: function(){
		return this.examIsActive;
	},
	getTimesTables: function(){
		return this.timesTables;
	},
	getActiveTimesTables: function(){
		let activeTimesTables = [];
		this.timesTables.forEach(function(tT){/* Return all active times tables */
			if(tT.checked == true){
				activeTimesTables.push(tT.id);	
			}
		});
		return activeTimesTables;
	}
});

Dispatcher.register(function(payload){
	switch(payload.eventName){
		case TimesTableSelectionConstants.HANDLE_SELECTION_CLICK:
			TimesTableSelectionStore.timesTables.forEach(function(tT){/* Mark clicked times table active */
				if(tT.id == payload.value){
					tT.checked = payload.checked;
				}
			});
			TimesTableSelectionStore.trigger('change');
			break;
		case TimesTableSelectionConstants.HANDLE_SELECT_ALL:
			if(!TimesTableSelectionStore.selectAllIsActive){/* Mark all times tables active*/
				TimesTableSelectionStore.selectAllIsActive = true;
				TimesTableSelectionStore.timesTables.forEach(function(tT){
					tT.checked = true;
				});
			}else{/* Mark all times tables inactive */
				TimesTableSelectionStore.selectAllIsActive = false;
				TimesTableSelectionStore.timesTables.forEach(function(tT){
					tT.checked = false;
				});
			}
			TimesTableSelectionStore.trigger('change');
			break;
		case TimesTableSelectionConstants.START_EXAM:
			let activeTimesTables = TimesTableSelectionStore.getActiveTimesTables();
			if(activeTimesTables.length > 0){
				TimesTableSelectionStore.examIsActive = true;
				TimesTableSelectionStore.trigger('change');
			}
			break;
	}
	return true;
});

module.exports = TimesTableSelectionStore;