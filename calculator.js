/**
 * Term Deposit Calculator
 */

class TermDepositCalculator {
    constructor() {
        /** principal deposit */
        this.principal = 0;
        /** interest rate (p.a.) */
        this.rate = 0;
        /** invetment term (years) */
        this.term = 0;
        /** interest frequency */
        this.frequency = "";
    }

    /**
     *
     * @returns {float} final balance
     */
    calculateFinalBalance() {
        let periods;
        let ratePerPeriod;

        if (this.frequency === "monthly") {
            periods = this.term * 12;
            ratePerPeriod = this.rate / 12;
        } else if (this.frequency === "quarterly") {
            periods = this.term * 4;
            ratePerPeriod = this.rate / 4;
        } else if (this.frequency === "annually") {
            periods = this.term;
            ratePerPeriod = this.rate;
        } else if (this.frequency === "at maturity") {
            return this.principal + (this.principal * this.rate * this.term);
        }

        let balance = this.principal;
        for (let i = 0; i < periods; i++) {
            balance = balance + (balance * ratePerPeriod);
        }

        return balance;
    }

    getUserInput() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Term Deposit Calculator");
        console.log("=======================");

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
