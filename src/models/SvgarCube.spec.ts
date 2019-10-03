import SvgarCube from './SvgarCube';
import SvgarSlab from './SvgarSlab';
import { expect } from 'chai';
import 'mocha';

describe("given a svgar cube with one slab", () => {

    let svgar = new SvgarCube();
    svgar.slabs.push(new SvgarSlab('test'));

    describe("when compiling", () => {

        let svg = svgar.compile(100, 100);

        it("should store styles at the top of the svg markup", () => {
            console.log(svg);
        });

    });

});