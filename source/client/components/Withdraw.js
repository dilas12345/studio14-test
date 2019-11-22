import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import axios from 'axios';

import { Card, Title, Button, Island, Input } from './';

const WithdrawTitle = styled(Title) `
	text-align: center;
`;

const WithdrawLayout = styled(Island) `
	width: 440px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const InputField = styled.div`
	margin: 20px 0;
	position: relative;
`;

const SumInput = styled(Input) `
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: '#000';
`;

const Currency = styled.span`
	font-size: 12px;
	position: absolute;
	right: 10;
	top: 8px;
`;

/**
 * Component class Withdraw
 */
class Withdraw extends Component {
	/**
	 * Constructor
	 * @param {Object} props component properties Withdraw
	 */
	constructor(props) {
		super(props);

		this.state = {
			selectedCard: props.inactiveCardsList[0],
			sum: 0
		};
	}

	/**
	 * Processing change in value in input
	 * @param {Event} event value change event input
	 */
	onChangeInputValue(event) {
		if (!event) {
			return;
		}

		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}

	/**
	 * Form submission
	 * @param {Event} event form submission event
	 */
	onSubmitForm(event) {
		if (event) {
			event.preventDefault();
		}

		const { selectedCard, sum } = this.state;
		const { activeCard } = this.props;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return;
		}

		const options = {
			method: 'post',
			url: `/cards/${activeCard.id}/transfer`,
			data: {
				target: selectedCard.id,
				sum
			}
		};

		axios(options).then(() => {
			this.props.onTransaction();
			this.setState({ sum: 0 });
		});
	}

	/**
	 * Component render function
	 * @returns {JSX}
	 */
	render() {
		const { inactiveCardsList } = this.props;

		return (
			<form onSubmit={event => this.onSubmitForm(event)}>
				<WithdrawLayout>
					<WithdrawTitle>Make a trip</WithdrawTitle>
					<Card type='select' data={inactiveCardsList} />
					<InputField>
						<SumInput
							name='sum'
							value={this.state.sum}
							onChange={event => this.onChangeInputValue(event)} />
						<Currency>BTC</Currency>
					</InputField>
					<Button type='submit'>Transaction</Button>
				</WithdrawLayout>
			</form>
		);
	}
}

Withdraw.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number
	}).isRequired,
	inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
	onTransaction: PropTypes.func.isRequired
};

export default Withdraw;
