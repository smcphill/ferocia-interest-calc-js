const TermDepositCalculator = require('./calculator');
const assert = require('assert');

describe('TermDepositCalculator', function() {
    let calc;

    beforeEach(function() {
        calc = new TermDepositCalculator();
    });

    it('should exist', function() {
        assert.ok(calc);
    });

    it('should have initial values', function() {
        assert.strictEqual(calc.principal, 0);
        assert.strictEqual(calc.rate, 0);
        assert.strictEqual(calc.term, 0);
        assert.strictEqual(calc.frequency, "");
    });

    describe('calculateFinalBalance', function() {
        it('should calculate monthly interest', function() {
            calc.principal = 2000;
            calc.rate = 0.025;
            calc.term = 4;
            calc.frequency = "monthly";
            const result = calc.calculateFinalBalance();
            assert.strictEqual(result, 2210.111923452672);
        });

        it('should calculate quarterly interest', function() {
            calc.principal = 10000;
            calc.rate = 0.03;
            calc.term = 2;
            calc.frequency = "quarterly";
            const result = calc.calculateFinalBalance();
            assert.strictEqual(result, 10615.988478182753);
        });

        it('should calculate annual interest', function() {
            calc.principal = 2400;
            calc.rate = 0.04;
            calc.term = 10;
            calc.frequency = "annually";
            const result = calc.calculateFinalBalance();
            assert.strictEqual(result, 3552.5862838040257);
        });

        it('should calculate interest at maturity', function() {
            calc.principal = 1000;
            calc.rate = 0.05;
            calc.term = 3;
            calc.frequency = "at maturity";
            const result = calc.calculateFinalBalance();
            assert.strictEqual(result, 1150);
        });

        it('should handle simple calculation', function() {
            calc.principal = 100;
            calc.rate = 0.01;
            calc.term = 1;
            calc.frequency = "annually";
            const result = calc.calculateFinalBalance();
            assert.strictEqual(result, 101);
        });
    });
});
