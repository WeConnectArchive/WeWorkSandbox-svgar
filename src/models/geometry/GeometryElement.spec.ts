import { GeometryElement } from "./GeometryElement";
import { expect } from "chai";
import "mocha";

describe("Given a geometry element that represents a single line", () => {

    let geometry = new GeometryElement([
        0, 0, 0.5, 0.5, 0.5, 0.5, 1, 1
    ]);

    describe("When testing for contiguity", () => {

        let result = geometry.IsContiguous();

        it("Should return true", () => {
            expect(result).to.equal(true);
        });

    });

    describe("When testing for closedness", () => {

        let result = geometry.IsClosed();

        it("Should return false", () => {
            expect(result).to.equal(false);
        });

    });

});

describe("Given a geometry element that represents two disjoint lines", () => {

    let geometry = new GeometryElement([
        0, 0, 0.5, 0, 0.5, 0, 1, 0,
        0, 1, 0.5, 1, 0.5, 1, 1, 1
    ]);

    describe("When testing for contiguity", () => {

        let result = geometry.IsContiguous();

        it("Should return false", () => {
            expect(result).to.equal(false);
        });

    });

    describe("When testing for closedness", () => {

        let result = geometry.IsClosed();

        it("Should return false", () => {
            expect(result).to.equal(false);
        });

    });

});

describe("Given a geometry element that represents two disjoin lines but ends where it begins", () => {

    let geometry = new GeometryElement([
        0, 0, 0.5, 0, 0.5, 0, 1, 0,
        0, 1, 0, 0.5, 0, 0.5, 0, 0
    ]);

    describe("When testing for contiguity", () => {

        let result = geometry.IsContiguous();

        it("Should return false", () => {
            expect(result).to.equal(false);
        });

    });

    describe("When testing for closedness", () => {

        let result = geometry.IsContiguous();

        it("Should return false", () => {
            expect(result).to.equal(false);
        });

    });

});

describe("Given a geometry element that represents a two-segment polyline", () => {
    
    let geometry = new GeometryElement([
        0, 0, 0.5, 0, 0.5, 0, 1, 0,
        1, 0, 1, 0.5, 1, 0.5, 1, 1
    ]);

    describe("When testing for contiguity", () => {

        let result = geometry.IsContiguous();

        it("Should return true", () => {
            expect(result).to.equal(true);
        });

    });

    describe("When testing for closedness", () => {

        let result = geometry.IsClosed();

        it("Should return false", () => {
            expect(result).to.equal(false);
        });

    });

});

describe("Given a geometry element that represents a right triangle", () => {

    let geometry = new GeometryElement([
        0, 0, 0.5, 0, 0.5, 0, 1, 0,
        1, 0, 1, 0.5, 1, 0.5, 1, 1,
        1, 1, 0.5, 0.5, 0.5, 0.5, 0, 0
    ]);

    describe("When testing for contiguity", () => {
        
        let result = geometry.IsContiguous();

        it("Should return true", () => {
            expect(result).to.equal(true);
        });

    });

    describe("When testing for closedness", () => {

        let result = geometry.IsClosed();

        it("Should return true", () => {
            expect(result).to.equal(true);
        });

    });

});