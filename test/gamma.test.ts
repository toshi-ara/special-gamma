import { gamma } from "../dist/esm/index.js";


describe("gamma functions", () => {
    it("Check gamma function", () => {
        let digits = 14;
        //
        // results by loggamma function in Julia SpecialFunction package
        expect(gamma(20)).toBeCloseTo(121645100408832000, digits);
        expect(gamma(5.5)).toBeCloseTo(52.34277778455352, digits);
        expect(gamma(0.5)).toBeCloseTo(1.772453850905516, digits);
        expect(gamma(0.1)).toBeCloseTo(9.51350769866873, digits);
        expect(gamma(0)).toBeCloseTo(Infinity, digits);
        expect(gamma(-0)).toBeCloseTo(-Infinity, digits);
        expect(gamma(-0.5)).toBeCloseTo(-3.5449077018110318, digits);
    });
});

