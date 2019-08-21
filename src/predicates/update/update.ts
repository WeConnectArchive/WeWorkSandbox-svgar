import { UpdateSvgarDrawingContext } from './svgar/UpdateSvgarDrawingContext';
import { Drawing } from "../../models/schema/drawing/Drawing";
import Create from "../create/create";

interface UpdateContext {
    Svgar: {
        Drawing: (drawing: Drawing) => UpdateSvgarDrawingContext,
    }
}

const Update : UpdateContext = {
    Svgar: {
        Drawing: UpdateSvgarDrawing,
    }
}

export default Update;

function UpdateSvgarDrawing(drawing: Drawing) : UpdateSvgarDrawingContext {
    return new UpdateSvgarDrawingContext(drawing);
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