import PolylineBuilder from './PolylineBuilder';
import { expect } from "chai";
import "mocha";

describe("given a live polyline builder", () => {

    let builder = new PolylineBuilder(0, 0);

    describe("when drawing to a new coordinate", () => {

        builder.LineTo(1, 1);

        it("should store the new coordinate in its cache of coordinates", () => {
            expect(builder.GetCurrentCoordinates().length).to.equal(4);
        });

    });

});