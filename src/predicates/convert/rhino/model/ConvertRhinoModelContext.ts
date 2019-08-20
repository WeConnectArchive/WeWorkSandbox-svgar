import { RhinoModule, File3dm } from 'rhino3dm';
import { ConvertRhinoModelToSvgarContext } from './toSvgar/ConvertRhinoModelToSvgarContext';

// interface RhinoModelTo {
//     Svgar: ConvertRhinoModelToSvgarContext,
// }

export class ConvertRhinoModelContext {

    private rhino: RhinoModule;
    public Model: File3dm;

    public To = {
        Svgar: this.ToSvgar(),
    }

    constructor(model: File3dm, instance: RhinoModule) {
        this.Model = model;
        this.rhino = instance;
        console.log("ConvertRhinoModelContext");
        console.log(model);
    }

    ToSvgar() : ConvertRhinoModelToSvgarContext {
        console.log("ToSvgar fct");
        console.log(this.Model);
        return new ConvertRhinoModelToSvgarContext(this.Model, this.rhino);
    }

}