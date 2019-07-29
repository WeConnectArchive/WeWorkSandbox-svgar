import { Layer } from "./Layer";
import { expect } from 'chai';
import 'mocha';
import { GeometryElement } from "../../geometry/GeometryElement";

describe('given a blank layer', () => {

    let layer = new Layer("Test Layer");

    describe('when constructed', () => {

        it('should default the normal to a unit z vector in asvg space', () => {
            expect(layer.Normal[2]).to.equal(-1);
        });

    });

    describe('when adding geometry', () => {

        let geo = new GeometryElement(new Array<number>())
        layer.AddGeometry(geo);

        it('should add new geometry to end of existing collection', () => {
            expect(layer.Geometry[layer.Geometry.length - 1]).to.equal(geo);
        });

    });

    describe('when adding tags', () => {

        layer.AddTag("test-tag").AddTags(["red", "blue", "wall"]).AddTag("test-tag");

        it('should not allow duplicate tags in array', () => {
            expect(layer.Tags.filter(x => x == "test-tag").length).to.equal(1);
        });

    });

    describe('when removing tags', () => {

        layer.AddTags(["one", "two", "three"]).RemoveTag("two").RemoveTags(["one", "three"]);

        it('should take item out of array', () => {
            expect(layer.RemoveTag("two").Tags).to.not.contain("two");
        });

        it('should do nothing if tag does not exist', () => {
            expect(layer.RemoveTag("two")).to.not.throw;
        })

        it('should take items out of array regardless of input order', () => {
            expect(layer.RemoveTags(["three", "one"]).Tags).to.not.contain("one").and.not.contain("three");
        });

    });

});