import rhino3dm, { File3dm, RhinoModule } from 'rhino3dm';
import { Drawing } from '../../../../../models/schema/drawing/Drawing';
import Create from '../../../../../predicates/create/create';

export function ToSvgarDrawing(model: File3dm) : Drawing {
    let dwg: Drawing;
    
    // rhino3dm().then(r => {
    //     let pt = new r.Point3dList(0);
    //     pt.add(1,2,3);
    //     dwg = new Drawing("correct");
    // }, e => {
    //     console.log(e);
    //     dwg = new Drawing("incorrect");
    // });

    return new Drawing("correct");;
}