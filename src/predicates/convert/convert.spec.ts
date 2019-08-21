import Convert from './convert';
import Create from './../create/create';
import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import rhino3dm, { RhinoModule, File3dm } from 'rhino3dm';
import 'mocha';

describe('given a .3dm file to convert', () => {

    it('should set an x domain', (done) => {
        rhino3dm().then(r => {
            let buffer = fs.readFileSync(path.resolve(__dirname, "../../data/svgar.3dm"));
            let arr = new Uint8Array(buffer);
            let file3dm = r.File3dm.fromByteArray(arr);

            let dwg = Convert.Rhino.Model(file3dm).To.Svgar.Drawing;

            console.log(dwg.Layers.map(x => x.Data["sanitized-name"]));

            expect(dwg.Data["x-domain-min"]).to.exist;
            done();
        });
    }).timeout(10000);

});