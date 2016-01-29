var Dispatcher = require('../dispatcher/AppDispatcher.js')
var MicroEvent = require('microevent');
var _ = require('lodash');
var TimesTableExamConstants = require('../constants/TimesTableExamConstants.js');

var TimesTableExamStore = Object.assign({}, MicroEvent.prototype, {

	calculations: [],/* Holds all calculations used in this test */
	calculationsAnsweredWrong: [],/* Holds all calculations that are answered wrong */
	activeTimeTables: [],/* Holds all times tabled used in this test */
	awnsweredWrong: false,/* Flag when user answered a calculation wrong */
	isFinished: false,/* Flag when a test is finished */
	maxFirstNumber: 10,/* Limit for the first number between 1 and (max) */
	currentCalculationNumber: 0,/* Counts which calculation is active */

	getCurrentCalculation: function(){
		return this.calculations[this.currentCalculationNumber];
	},
	getCalculations: function(){
		return this.calculations;
	},
	getCalculationsAnsweredWrong: function(){
		return this.calculationsAnsweredWrong;
	},
	getIsFinished: function(){
		return this.isFinished;
	},
	generateUniqueCalculation: function(){
		let newCalculation;
		let newCalculationExists = true;
		while(newCalculationExists == true){
			newCalculation = {
				firstNumber: this.generateRandomNumber(1, this.maxFirstNumber),/* First number is random between 1 and 10 */
				secondNumber: this.activeTimeTables[this.generateRandomNumber(0, this.activeTimeTables.length)]/* Second number is a randomly selected time table */
			};
			newCalculationExists = _.some(this.calculations, function(c){/* Iterate through calculations, when new calculation is not found we have a match -> stops while loop */
				return _.isEqual(c, newCalculation);
			});
			console.log('calc (' + newCalculation.firstNumber + ' _ ' + newCalculation.secondNumber + ') exists: ' + newCalculationExists);
		}
		return newCalculation;
	},
	generateRandomNumber: function(min, max){
		return (Math.floor(Math.random() * max) + min);
	},
	verify: function(givenAwnswer){
		console.log('Verifying task: ' + (this.currentCalculationNumber + 1));
		let currentCalculation = this.calculations[this.currentCalculationNumber];
		let correctAwnser = (currentCalculation.firstNumber * currentCalculation.secondNumber);
		if(correctAwnser == givenAwnswer){
			console.log('correct!');
			// this.awnsweredWrong = false;
		}else{
			console.log('try again');
			// if(!this.awnsweredWrong){
				// this.awnsweredWrong = true;
				this.calculationsAnsweredWrong.push(currentCalculation);				
			// }
		}	
		this.currentCalculationNumber++;	
		if((this.currentCalculationNumber) == this.calculations.length){/* When all calculations are awnswered -> task is finished */
			TimesTableExamStore.isFinished = true;
		}	
	}
});

Dispatcher.register(function(payload){
	switch(payload.eventName){
		case TimesTableExamConstants.INIT_TASKS:
			console.log('init task with time tables: ' + payload.activeTimeTables);
			TimesTableExamStore.activeTimeTables.push(...payload.activeTimeTables);
			for(let i = (TimesTableExamStore.maxFirstNumber * payload.activeTimeTables.length); i > 0; i--){/* Create unique calculations for initial test  */
				TimesTableExamStore.calculations.push(TimesTableExamStore.generateUniqueCalculation());	
			}
			TimesTableExamStore.trigger('change');
			break;
		case TimesTableExamConstants.VERIFY_AWNSWER:
			TimesTableExamStore.verify(payload.awnswer);
			TimesTableExamStore.trigger('change');
			break;
		case TimesTableExamConstants.INIT_FAULTY_TASKS:
			TimesTableExamStore.calculationsAnsweredWrong = [];/* Empty array so it can be filled with any new faults made this test */
			TimesTableExamStore.calculations = [...payload.faultyTasks];
			TimesTableExamStore.isFinished = false;
			TimesTableExamStore.currentCalculationNumber = 0;
			TimesTableExamStore.trigger('change');
			break;
	}
	return true;
});

module.exports = TimesTableExamStore;