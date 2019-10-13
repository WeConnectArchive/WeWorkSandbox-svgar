import SvgarPath from './SvgarPath';
import { expect } from 'chai';
import 'mocha';

describe("given a new svgar path", () => {

    describe("when reading before compiling", () => {

        let path = new SvgarPath([0, 0, 0.5, 0, 0.5, 0, 1, 0]);

        it("should contain no path information", () => {
            expect(path.cache.d).to.equal("");
        });

        it("should have all fields flagged as changed", () => {
            expect(path.changedAny()).to.be.true;
        });

    });

    describe("when reading after compiling", () => {

        let path = new SvgarPath([0, 0, 0.5, 0, 0.5, 0, 1, 0]);
        path.compile();

        it("should have path information stored in cache", () => {
            expect(path.cache.d).to.not.equal("");
        });

        it("should have all fields flagged as unchanged", () => {
            expect(path.changedAny()).to.be.false;
        });

    });

});