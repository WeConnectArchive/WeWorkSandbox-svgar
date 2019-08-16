import { PolylineBuilder } from "../../models/geometry/builders/PolylineBuilder"
import { GeometryElement } from "../../models/geometry/GeometryElement";
import { File3dm } from 'rhino3dm';
import { Drawing } from "../../models/schema/drawing/Drawing";

export default {
    Rhino: Rhino(),
}

function Rhino() : ConvertRhinoContext {
    return new ConvertRhinoContext();
}

class ConvertRhinoContext {

    public Model(file: File3dm) : ConvertRhinoModelContext {
        return new ConvertRhinoModelContext(file);
    }

}

interface RhinoModelTo {
    Svgar: ConvertRhinoModelToSvgarContext,
}

class ConvertRhinoModelContext {

    public Model!: File3dm;

    public To:RhinoModelTo = {
        Svgar: new ConvertRhinoModelToSvgarContext(this.Model),
    }

    constructor(model: File3dm) {
        this.Model = model;
    }

}

interface DrawingOptions {
    Name: string;
}

class ConvertRhinoModelToSvgarContext {

    private Model: File3dm;

    constructor(model: File3dm) {
        this.Model = model;
    }

    public Drawing(options?: DrawingOptions) : Drawing {
        return new Drawing(this.Model.applicationName);
    }
    
}