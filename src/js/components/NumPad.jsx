import React from 'react';
import NumPadKey from './NumPadKey.jsx';
import NumPadNumberKey from './NumPadNumberKey.jsx';

export default class NumPad extends React.Component{
	constructor(){
		super();
		this.state = {
			defaultValue: '...',
			value: ''
		}
		this._handleChange = (e) => {
			this.setState({value: e.target.value});
		}
		this._handleSubmit = () => {
			if(this.state.value.length > 0){
				this.props.onSubmit(parseInt(this.state.value));
				this.setState({value: ''});
			}
		}
		this._handleNumberClick = (v) => {
			console.log('nr clicked: ' + (typeof v));
			this.setState({text: (this.state.value += v)});
		}
		this._handleRemoveNumberClick = () => {
			console.log('remove nr');
			this.setState({value: this.state.value.slice(0, -1)});
		}
		this._NumPadNumberKeyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((e) => {
			return <NumPadNumberKey key={e} onClick={this._handleNumberClick} value={e.toString()} />
		});

		/* Swap buttons to get 'official' numpad look*/
		let tempNumPadKey = this._NumPadNumberKeyNumbers[9];
		this._NumPadNumberKeyNumbers[9] = <NumPadKey key={'x'} onClick={this._handleRemoveNumberClick} value={'X'} />;
		this._NumPadNumberKeyNumbers[10] = tempNumPadKey;
	}

	render(){
		return(
			<div className="numpad-container">
				{!this.state.value.length ? <p className="given-awnswer blink-animation">{this.state.defaultValue}</p> : <p className="given-awnswer">{this.state.value}</p>}
				<div className="numpad-keys-container">
					{this._NumPadNumberKeyNumbers}
					<NumPadKey onClick={this._handleSubmit} value={'V'} />
				</div>
			</div>
		);
	}
}
NumPadKey.propTypes = {
	onSubmit: React.PropTypes.func
};