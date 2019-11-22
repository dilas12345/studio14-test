import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';

/**
 * Component class Prepaid
 */
class Prepaid extends Component {
	/**
	 * Constructor
	 * @param {Object} props component properties Prepaid
	 */
	constructor(props) {
		super(props);

		this.state = { stage: 'contract' };
	}

	/**
	 * Successful payment processing
	 * @param {Object} transaction transaction data
	 */
	onPaymentSuccess(transaction) {
		this.props.onTransaction();
		this.setState({
			stage: 'success',
			transaction
		});
	}

	/**
	 * Repeat payment
	 */
	repeatPayment() {
		this.setState({ stage: 'contract' });
	}

	/**
	 * Component Rendering Function
	 * @returns {JSX}
	 */
	render() {
		const { transaction } = this.state;
		const { activeCard, inactiveCardsList } = this.props;

		if (this.state.stage === 'success') {
			return (
				<PrepaidSuccess transaction={transaction} repeatPayment={() => this.repeatPayment()} />
			);
		}

		return (
			<PrepaidContract
				activeCard={activeCard}
				inactiveCardsList={inactiveCardsList}
				onPaymentSuccess={(transaction) => this.onPaymentSuccess(transaction)} />
		);
	}
}

Prepaid.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number
	}).isRequired,
	inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
	onTransaction: PropTypes.func.isRequired
};

export default Prepaid;
