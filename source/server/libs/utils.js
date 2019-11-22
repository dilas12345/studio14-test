'use strict';

const bankUtils = {
	/**
	 * Types of Bank Cards
	 * @type {Object}
	 */
	cardTypes: {
		VISA: 'visa',
		MAESTRO: 'maestro',
		MASTERCARD: 'mastercard',
		MIR: 'mir'
	},

	/**
	 * Checks card type
	 * @param {Number} val card number
	 * @returns {String} card type
	 */
	getCardType(val) {
		// Biny PS MIR 220000 - 220499
		const mirBin = /^220[0-4]\s?\d\d/;

		const firstNum = val[0];

		switch (firstNum) {
			case '2':
				if (mirBin.test(val)) {
					return bankUtils.cardTypes.MIR;
				}
				return '';

			case '4':
				return bankUtils.cardTypes.VISA;

			case '5':
				const secondNum = val[1] || '';
				if (secondNum === '0' || secondNum > '5') {
					return bankUtils.cardTypes.MAESTRO;
				}
				return bankUtils.cardTypes.MASTERCARD;

			case '6':
				return bankUtils.cardTypes.MAESTRO;

			default:
				return '';
		}
	},

	/**
	 * Formats the card number using the specified separator
	 *
	 * @param {String} cardNumber card number
	 * @param {String} delimeter = '\u00A0' splitter
	 * @returns {String} formatted card number
	 */
	formatCardNumber(cardNumber, delimeter = '\u00A0') {
		if (!cardNumber) {
			return '';
		}

		const formattedCardNumber = [];

		while (cardNumber && typeof cardNumber === 'string') {
			formattedCardNumber.push(cardNumber.substr(0, 4));
			// eslint-disable-next-line no-param-reassign
			cardNumber = cardNumber.substr(4);
			if (cardNumber) {
				formattedCardNumber.push(delimeter);
			}
		}

		return formattedCardNumber.join('');
	}
};

module.exports = bankUtils;
