import rhino3dm, { RhinoModule, File3dm } from 'rhino3dm';
import { ConvertRhinoModelContext } from './model/ConvertRhinoModelContext';

export class ConvertRhinoContext {

    private rhino!: RhinoModule;

    constructor() {
        rhino3dm().then(r => {
            this.rhino = r;
        });
    }

    Model(file: File3dm) : ConvertRhinoModelContext {
        console.log("ConvertRhinoContext");
        console.log(file.objects().count);
        return new ConvertRhinoModelContext(file, this.rhino);
    }

}