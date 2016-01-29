var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link } from 'react-router'
import TimesTableSelection from './components/TimesTableSelection.jsx';
import TimesTableExam from './components/TimesTableExam.jsx';
import TimesTableSelectionStore from './stores/TimesTableSelectionStore.js';

export default class App extends React.Component{
	constructor(){
		super();
		this.state = {
			examIsActive: false,
			activeTimesTables: []
		};
		this._handleChange = () => {
			this.setState({
				examIsActive: TimesTableSelectionStore.getExamIsActive(),
				activeTimesTables: TimesTableSelectionStore.getActiveTimesTables()
			});
		}
	}
	componentDidMount(){
		TimesTableSelectionStore.bind('change', this._handleChange);
	}
	render(){
		// return(
		// 	<div className="app">
		// 		{this.props.children}
		// 	</div>
		// );
		if(!this.state.examIsActive){
			return(
				<div className="app">
					<TimesTableSelection />
				</div>
			);
		}else{
			return(
				<div className="app">
					<TimesTableExam activeTimeTables={this.state.activeTimesTables} />
				</div>
			);
		}
	}
}

ReactDOM.render(
	<App />,
	// <Router>
	// 	<Route path="/" component={App}>
	// 		<Route path="times" activeTimesTables={[3, 8]} component={TimesTableExam} />
	// 	</Route>
	// </Router>,
	document.getElementById('content')
);//