import Convert from './convert';
import * as fs from 'fs';
import { expect } from 'chai';
import rhino3dm, { RhinoModule } from 'rhino3dm';
import 'mocha';

describe('given a line to convert', () => {
   
    let rhino:RhinoModule;

    before((done) => {
        rhino3dm().then((r) => {
            console.log("setting");
            rhino = r;
            done();
        });
    })

    it('should create a line', () => {
        let line = new rhino.Line([0,0,0], [1,0,0]);
        expect(line.length).to.equal(1);       
    });

    it('should create a nurbscurve', () => {
        let pts = new rhino.Point3dList();
        pts.add(0,0,0);
        pts.add(0.5,0.5,0.5);
        pts.add(0.5,0.5,0.5);
        pts.add(1,1,1);
        pts.add(1,1,1);
        pts.add(1,1,0.5);
        pts.add(1,1,0.5);
        pts.add(1,1,0);

        let ncurve = rhino.NurbsCurve.create(false, 3, pts);
        //console.log(JSON.stringify(ncurve));
    });

    it('should read a rhino file', () => {
        let buffer = fs.readFileSync("src\\lib\\svgar.3dm");
        let arr = new Uint8Array(buffer);
        let file3dm = rhino.File3dm.fromByteArray(arr);

        let obj = file3dm.objects();
        let layers = file3dm.layers();

        // console.log("objects");
        // console.log(obj.get(0));
        // for(var i=0; i<obj.count; i++) {
        //     let geometry = obj.get(i).geometry()
        //     console.log(geometry.objectType)
        // }

        // console.log("layers")
        // for(var i = 0; i < layers.count(); i++) {
        //     console.log(layers.get(i).id);
        // }
    })

});