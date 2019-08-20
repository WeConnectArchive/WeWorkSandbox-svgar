import { RhinoModule, File3dm } from 'rhino3dm';
import { Drawing } from './../../../../../models/schema/drawing/Drawing';
import { ToSvgarDrawing } from './ToSvgarDrawing';

export class ConvertRhinoModelToSvgarContext {

    private rhino: RhinoModule;
    private Model: File3dm;

    constructor(model: File3dm, rhinoInstance: RhinoModule) {
        this.Model = model;
        this.rhino = rhinoInstance;
        console.log("ConvertRhinoModelToSvgarContext");
        console.log(model);
    }

    public Drawing() : Drawing {
        return ToSvgarDrawing(this.Model, this.rhino);
    }
    
}