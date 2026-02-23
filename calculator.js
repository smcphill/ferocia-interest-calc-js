/**
 * Term Deposit Calculator
 */

class TermDepositCalculator {
    constructor() {
        this.principal = 0;
        this.rate = 0;
        this.term = 0;
        this.frequency = "";
    }

    calculateFinalBalance() {
        let periods;
        let ratePerPeriod;

        return this.principal + (this.principal * this.rate * this.term);
    }

    getUserInput() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Enter start deposit amount: $", (principal) => {
            this.principal = parseFloat(principal);

            rl.question("Enter interest rate (e.g., 1.10 for 1.10%): ", (rate) => {
                this.rate = parseFloat(rate) / 100;

                rl.question("Enter investment term (years): ", (term) => {
                    this.term = parseInt(term);

                    rl.question("Interest paid (monthly/quarterly/annually/at maturity): ", (frequency) => {
                        this.frequency = frequency.toLowerCase();

                        console.log();
                        this.displayResult();
                        rl.close();
                    });
                });
            });
        });
    }

    displayResult() {
        const final = this.calculateFinalBalance();
        console.log(`Final balance: $${final}`);
    }

    run() {
        this.getUserInput();
    }
}

if (require.main === module) {
    const calc = new TermDepositCalculator();
    calc.run();
}

module.exports = TermDepositCalculator;
