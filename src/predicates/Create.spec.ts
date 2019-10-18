import Create from './Create';
import { expect } from 'chai';
import 'mocha';

describe("given a new create cube context", () => {

    let ctx = Create().svgar.cube("test");

    describe("when declaring its name at initialization", () => {

        let cube = ctx.then.build();

        it("should accurately set the cube's name to the declared value", () => {
            expect(cube.getName()).to.equal("test");
        });

    });

});