import { Drawing } from "../../models/schema/drawing/Drawing";
import { CreatePredicate } from "../create/create";

export class UpdatePredicate {

    public DrawingNames(drawing: Drawing, name: string) : void {
        var Create = new CreatePredicate();
        var newNames = Create.NameData(name);

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