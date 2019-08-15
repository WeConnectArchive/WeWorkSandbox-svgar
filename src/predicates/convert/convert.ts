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

class ConvertRhinoModelContext {

    public Model: File3dm;

    constructor(model: File3dm) {
        this.Model = model;
    }

    public ToSvgar() : Drawing {
        return new Drawing(this.Model.applicationName);
    }

}