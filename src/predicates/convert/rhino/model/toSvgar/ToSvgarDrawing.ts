import { File3dm, RhinoModule } from 'rhino3dm';
import { Drawing } from './../../../../../models/schema/drawing/Drawing';

export function ToSvgarDrawing(model: File3dm, rhinoInstance: RhinoModule) : Drawing {
    let rh = rhinoInstance;

    console.log("ToSvgarDrawing fct");
    console.log(model);

    return new Drawing(model.applicationName);
}