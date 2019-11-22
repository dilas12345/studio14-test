import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MobilePaymentContract from './MobilePaymentContract';
import MobilePaymentSuccess from './MobilePaymentSuccess';

/**
 * MobilePayment Component Class
 */
class MobilePayment extends Component {
	/**
	 * Constructor
	 * @param {Object} props component properties MobilePayment
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
	 * Component render
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const { activeCard } = this.props;

		if (this.state.stage === 'success') {
			return (
				<MobilePaymentSuccess
					activeCard={activeCard}
					transaction={this.state.transaction}
					repeatPayment={() => this.repeatPayment()} />
			);
		}

		return (
			<MobilePaymentContract
				activeCard={activeCard}
				onPaymentSuccess={transaction => this.onPaymentSuccess(transaction)} />
		);
	}
}

MobilePayment.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number,
		theme: PropTypes.object
	}).isRequired,
	onTransaction: PropTypes.func.isRequired
};

export default MobilePayment;
