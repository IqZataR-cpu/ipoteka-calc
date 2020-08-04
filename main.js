const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creditTermRange = document.getElementById('credit-term-range');

const totalAmountOfCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecommendedIncome = document.getElementById('recommended-income');

const inputsRange = document.querySelectorAll('.input-range');

const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
};

const assignRangeValue = () => {
    totalCostRange.value = totalCost.value;
    anInitialFeeRange.value = anInitialFee.value;
    creditTermRange.value = creditTerm.value;
}

assignValue();

const banks = [
    {
        name: 'alfa',
        'percents': 8.7
    },
    {
        name: 'sberbank',
        'percents': 8.4
    },
    {
        name: 'pochta',
        'percents': 7.9
    },
    {
        name: 'tinkoff',
        'percents': 9.2
    },
];

let currentPercent = banks[0].percents;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    });
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPercent = currentBank.percents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
}

for (let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue()
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

for (let input of [anInitialFee, totalCost, creditTerm]) {
    input.addEventListener('change', () => {
        assignRangeValue()
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /*
        ЕП - Ежемесячный платеж
        РК - Размер кредита
        ПС - Процентная ставка
        КМ - Количество месяцев

        ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ;
     */
    let monthlyPayment;
    let loanAmount = totalCost - anInitialFee;
    let interestRate = currentPercent;
    let numberOfMonths = 12 * creditTerm;

    monthlyPayment = (loanAmount + (((loanAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;

    const monthlyPaymentRounded = Math.round(monthlyPayment);

    if (monthlyPaymentRounded < 0) {
        totalAmountOfCredit.innerHTML = `0`;
        totalMonthlyPayment.innerHTML = `0`;
        totalRecommendedIncome.innerHTML = `0`;
    } else {
        totalAmountOfCredit.innerHTML = `${loanAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentRounded} ₽`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentRounded + ((monthlyPaymentRounded / 100) * 45)} ₽`;
    }
}