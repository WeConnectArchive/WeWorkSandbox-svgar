import SvgarCube from './SvgarCube';
import SvgarSlab from './SvgarSlab';
import PolylineBuilder from './../builders/PolylineBuilder'
import CircleBuilder from './../builders/CircleBuilder';
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
        .build();
    square.setElevation(2);
    square.setTag("square");

    let fill = new PolylineBuilder(4, 4)
        .lineTo(9, 4)
        .lineTo(9, 9)
        .lineTo(4, 9)
        .close()
        .build();
    fill.setElevation(1);
    fill.setTag("fill");

    let circle = new CircleBuilder(14, 14, 1).build();
    circle.setTag("circle");

    slab.setAllStyles([
        {
            name: "outline",
            attributes: {
                "fill": "none",
                "stroke": "#000000",
                "stroke-width": "2.5px"
            }
        },
        {
            name: "filled",
            attributes: {
                "fill": "gainsboro",
                "stroke": "#000000",
                "stroke-width": "0px"
            }
        },
        {
            name: "filled:hover",
            attributes: {
                "cursor": "pointer",
                "fill": "grey",
            }
        }
    ]);

    slab.setAllStates([
        {
            name: "default",
            styles: {
                "square": "outline",
                "fill": "filled"
            }
        }
    ]);

    slab.addPath(square)
    slab.addPath(fill)
    slab.addPath(circle);

    svgar.slabs.push(slab);

    svgar.frame([10, 10], 12, 12);

    describe("when compiling", () => {

        let svg = svgar.compile(100, 100);

        it("should store styles at the top of the svg markup", () => {
            console.log(svg);
        });

    });

});