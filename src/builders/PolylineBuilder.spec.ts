import PolylineBuilder from './PolylineBuilder';
import { expect } from "chai";
import "mocha";

describe("given a live polyline builder", () => {

    describe("when drawing to a new coordinate", () => {

        let builder = new PolylineBuilder(0, 0);
        builder.lineTo(1, 2);

        it("should store the new coordinate in its cache of coordinates", () => {
            expect(builder.getCurrentCoordinates().length).to.equal(4);
        });

        it("should store the accurate coordinate in its cache of coodinates", () => {
            expect(builder.getCurrentCoordinates()[3]).to.equal(2);
        });

    });

    describe("when building a polyline with three segments", () => {

        let builder = new PolylineBuilder(0, 0);
        builder.lineTo(1, 1);
        builder.lineTo(4, 0.5);
        builder.close();

        let path = builder.build();

        it("should generate a path with three segments", () => {
            expect(path.segments).to.equal(3);
        });

    });

});