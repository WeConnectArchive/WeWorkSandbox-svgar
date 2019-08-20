import { File3dm } from 'rhino3dm';
import { Drawing } from "../../models/schema/drawing/Drawing";
import { ConvertRhinoContext } from './rhino/ConvertRhinoContext';

export default {
    Rhino: {
        Model: RhinoModel 
    }
}

function Rhino() : ConvertRhinoContext {
    return new ConvertRhinoContext();
}

interface RhinoModelTo {
    To: {
        Svgar: {
            Drawing: Drawing
        }
    }
}

function RhinoModel(model: File3dm) : RhinoModelTo {
    return {
        To: {
            Svgar: {
                Drawing: ToSvgarDrawing(model)
            }
        }
    }
}

function ToSvgarDrawing(model: File3dm) : Drawing {
    return new Drawing(model.applicationName);
}





