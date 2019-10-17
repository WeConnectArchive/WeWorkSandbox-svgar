import CurveBuilder from './CurveBuilder';
import { expect } from 'chai';
import 'mocha';

describe("given a new curve builder", () => {

    describe("when building with only the starting point", () => {

        let cb = new CurveBuilder(0, 0);

        it("should return an empty path", () => {
            expect(cb.build().segments).to.equal(0);
        });

    });

});

describe("given a curve builder with one anchor and two points", () => {

    describe("when building", () => {

        let cb = new CurveBuilder(0, 0).via(1, 4).through(2.5, 2);

        it("should return a path with one segment", () => {
            expect(cb.build().segments).to.equal(1);
        });

    });

});