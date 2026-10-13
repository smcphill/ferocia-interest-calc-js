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

    it('should calculate monthly interest', function() {
        calc.principal = 2000;
        calc.rate = 0.025;
        calc.term = 4;
        calc.frequency = "monthly";
        const result = calc.calculateFinalBalance();
        assert.strictEqual(result, 2210);
    });

    it('should calculate quarterly interest', function() {
        calc.principal = 1000;
        calc.rate = 0.05;
        calc.term = 1;
        calc.frequency = "quarterly";
        const result = calc.calculateFinalBalance();
        assert.ok(result > 1000);
    });

    it('should calculate annual interest', function() {
        calc.principal = 1000;
        calc.rate = 0.05;
        calc.term = 1;
        calc.frequency = "annually";
        const result = calc.calculateFinalBalance();
        assert.strictEqual(result, 1050);
    });

    it('should calculate interest at maturity', function() {
        calc.principal = 1000;
        calc.rate = 0.05;
        calc.term = 1;
        calc.frequency = "at maturity";
        const result = calc.calculateFinalBalance();
        assert.strictEqual(result, 1050);
    });

    it('should handle simple calculation', function() {
        calc.principal = 100;
        calc.rate = 0.01;
        calc.term = 1;
        calc.frequency = "annually";
        const result = calc.calculateFinalBalance();
        assert.ok(result > 100);
    });
});
