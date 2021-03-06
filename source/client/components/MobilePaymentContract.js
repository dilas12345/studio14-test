import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { PaymentService } from '../services';
import { Island, Title, Button, Input } from './';

const MobilePaymentLayout = styled(Island) `
	width: 440px;
	background: #108051;
`;

const MobilePaymentTitle = styled(Title) `
	color: #fff;
`;

const InputField = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
	padding-left: 150px;
`;

const Label = styled.div`
	font-size: 15px;
	color: #fff;
	position: absolute;
	left: 0;
`;

const Currency = styled.span`
	font-size: 13px;
	color: #fff;
	margin-left: 12px;
`;

const Commission = styled.div`
	color: rgba(255, 255, 255, 0.6);
	font-size: 13px;
	text-align: right;
	margin: 35px 0 20px;
`;

const Underline = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const PaymentButton = styled(Button) `
	float: right;
`;

const InputPhoneNumber = styled(Input) `
	width: 225px;
`;

const InputSum = styled(Input) `
	width: 160px;
`;

const InputCommision = styled(Input) `
	cursor: no-drop;
	width: 160px;
	border: dotted 1.5px rgba(0, 0, 0, 0.2);
	background-color: initial;
`;

/**
 * Component MobilePaymentContract
 */
class MobilePaymentContract extends Component {
	/**
	 * Constructor
	 * @param {Object} props component properties MobilePaymentContract
	 */
	constructor(props) {
		super(props);

		this.state = {
			phoneNumber: '+7(952)-37-93-37-2',
			sum: 0,
			commission: 3
		};

		this._paymentService = new PaymentService();
	}

	/**
	 * Get price including commission
	 * @returns {Number}
	 */
	getSumWithCommission() {
		const { sum, commission } = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return 0;
		}

		return Number(sum) + Number(commission);
	}

	/**
	 * Form submission
	 * @param {Event} event form submission event
	 */
	onSubmitForm(event) {
		if (event) {
			event.preventDefault();
		}

		const { sum, phoneNumber, commission } = this.state;
		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum === 0) {
			return;
		}

		const activeCard = this.props.activeCard;
		this._paymentService.payMobile(activeCard.id, sum, phoneNumber)
			.then(createdTransaction => {
				this.props.onPaymentSuccess({ sum, phoneNumber, commission });
			});
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
	 * Component render
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const { commission } = this.state;

		return (
			<MobilePaymentLayout>
				<form onSubmit={event => this.onSubmitForm(event)}>
					<MobilePaymentTitle>Top up phone</MobilePaymentTitle>
					<InputField>
						<Label>Phone</Label>
						<InputPhoneNumber
							name='phoneNumber'
							value={this.state.phoneNumber}
							readOnly='true' />
					</InputField>
					<InputField>
						<Label>Amount</Label>
						<InputSum
							name='sum'
							value={this.state.sum}
							onChange={event => this.onChangeInputValue(event)} />
						<Currency>BTC</Currency>
					</InputField>
					<InputField>
						<Label>Write off</Label>
						<InputCommision value={this.getSumWithCommission()} />
						<Currency>BTC</Currency>
					</InputField>
					<Commission>The size of the commission is {commission} BTC</Commission>
					<Underline />
					<PaymentButton bgColor='#fff' textColor='#108051'>Pay</PaymentButton>
				</form>
			</MobilePaymentLayout>
		);
	}
}

MobilePaymentContract.propTypes = {
	activeCard: PropTypes.shape({
		id: PropTypes.number
	}).isRequired,
	onPaymentSuccess: PropTypes.func.isRequired
};

export default MobilePaymentContract;
