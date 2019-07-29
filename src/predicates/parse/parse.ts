import { Drawing } from "../../models/schema/drawing/Drawing"

export class ParsePredicate {

    public DrawingFromJson(json: any) : Drawing {
        let name = json["data"]["original-name"];

        let dwg = new Drawing(name == undefined ? "" : name);

        return dwg;
    }

}