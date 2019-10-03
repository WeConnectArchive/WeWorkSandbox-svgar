import SvgarCube from './SvgarCube';
import SvgarSlab from './SvgarSlab';
import PolylineBuilder from './../builders/PolylineBuilder'
import { expect } from 'chai';
import 'mocha';

describe("given a svgar cube with one slab", () => {

    let svgar = new SvgarCube();
    let slab = new SvgarSlab('test');
    let square = new PolylineBuilder(5, 5)
        .lineTo(10, 5)
        .lineTo(10, 10)
        .lineTo(5, 10)
        .close()
        .build()
    square.setTag("square");

    slab.addPath(square)

    svgar.slabs.push(slab);

    svgar.frame([10, 10], 12, 12);

    describe("when compiling", () => {

        let svg = svgar.compile(100, 100);

        it("should store styles at the top of the svg markup", () => {
            console.log(svg);
        });

    });

});