import rhino3dm, { File3dm, RhinoModule } from 'rhino3dm';
import { Drawing } from '../../../../../models/schema/drawing/Drawing';

export function ToSvgarDrawing(model: File3dm) : Drawing {

    rhino3dm().then(r => {
        //rh = r;

        return new Drawing("correct");
    })

    return new Drawing("incorrect");
}