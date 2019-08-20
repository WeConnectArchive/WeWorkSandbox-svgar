import Convert from './convert';
import Create from './../create/create';
import * as fs from 'fs';
import { expect } from 'chai';
import rhino3dm, { RhinoModule, File3dm } from 'rhino3dm';
import 'mocha';

describe('given a line to convert', () => {

    // it('should create a line', () => {
    //     let rhino = Create.Rhino.Instance;
    //     let line = new rhino.Line([0,0,0], [1,0,0]);
    //     expect(line.length).to.equal(1);       
    // });

    // it('should create a nurbscurve', () => {
    //     let rhino = Create.Rhino.Instance;
    //     let pts = new rhino.Point3dList(5);
    //     pts.add(0,0,0);
    //     pts.add(0.5,0.5,0.5);
    //     pts.add(0.5,0.5,0.5);
    //     pts.add(1,1,1);
    //     pts.add(1,1,1);
    //     pts.add(1,1,0.5);
    //     pts.add(1,1,0.5);
    //     pts.add(1,1,0);

    //     let ncurve = rhino.NurbsCurve.create(false, 3, pts);
    //     //console.log(JSON.stringify(ncurve));
    // });

    it('should read a rhino file', (done) => {
        rhino3dm().then(r => {
            let buffer = fs.readFileSync("src\\lib\\svgar.3dm");
            let arr = new Uint8Array(buffer);
            let file3dm = r.File3dm.fromByteArray(arr);

            let dwg = Convert.Rhino.Model(file3dm).To.Svgar.Drawing;
            expect(dwg.Data["original-name"]).to.equal("correct");
            done();
        });

    });

});