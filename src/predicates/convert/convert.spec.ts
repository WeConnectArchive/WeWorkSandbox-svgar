import Convert from './convert';
import Create from './../create/create';
import * as fs from 'fs';
import { expect } from 'chai';
import rhino3dm, { RhinoModule, File3dm } from 'rhino3dm';
import 'mocha';

describe('given a .3dm file to convert', () => {

    it('should set an x domain', (done) => {
        rhino3dm().then(r => {
            let buffer = fs.readFileSync("src\\data\\svgar.3dm");
            let arr = new Uint8Array(buffer);
            let file3dm = r.File3dm.fromByteArray(arr);

            let dwg = Convert.Rhino.Model(file3dm).To.Svgar.Drawing;
            expect(dwg.Data["x-domain-min"]).to.exist;
            done();
        });

    });

});