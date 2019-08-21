import { UpdateSvgarDrawingContext, UpdateSvgarLayerContext } from './svgar/UpdateSvgarContexts';
import { Drawing, Layer } from "./../../index";
import Create from "../create/create";

interface UpdateContext {
    Svgar: {
        Drawing: (drawing: Drawing) => UpdateSvgarDrawingContext,
        Layer: (layer: Layer) => UpdateSvgarLayerContext,
    }
}

const Update : UpdateContext = {
    Svgar: {
        Drawing: UpdateSvgarDrawing,
        Layer: UpdateSvgarLayer,
    }
}

export default Update;

function UpdateSvgarDrawing(drawing: Drawing) : UpdateSvgarDrawingContext {
    return new UpdateSvgarDrawingContext(drawing);
}

function UpdateSvgarLayer(layer: Layer) : UpdateSvgarLayerContext {
    return new UpdateSvgarLayerContext(layer);
}

export class UpdatePredicate {

    public DrawingNames(drawing: Drawing, name: string) : void {
        var newNames = Create.Svgar.NameData.With(name);

        var newOriginalName = newNames["original-name"];
        if (newOriginalName != undefined) {
            drawing.Data["original-name"] = newOriginalName;
        }

        var newSanitizedName = newNames["sanitized-name"];
        if (newSanitizedName != undefined) {
            drawing.Data["sanitized-name"] = newSanitizedName;
        }
    }

}