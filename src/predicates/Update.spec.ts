import Update from './Update';
import { expect } from 'chai';
import 'mocha';
import SvgarSlab from './../models/SvgarSlab';

describe("given a default svgar slab", () => {

    const slab = new SvgarSlab("test");
    slab.compile();

    describe("when updating its state", () => {

        Update().svgar.slab(slab).state.to("newstate");

        it("should flag its state as changed", () => {
            expect(slab.changedScope("state")).to.be.true;
        });

        it("should update the current state to the declared value", () => {
            expect(slab.getCurrentState()).to.equal("newstate");
        });

    });

});