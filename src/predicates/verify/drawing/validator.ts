import { Drawing } from "../../../models/schema/drawing/Drawing"
import { FidelityReport } from "../verify";

export class DrawingValidator {

    private drawing:Drawing;

    public status:boolean;
    public errorMessages:Array<string>;
    public warnMessages:Array<string>;
    public infoMessages:Array<string>;

    constructor(drawing: Drawing) {
        this.drawing = drawing;
        this.status = true;
        this.errorMessages = new Array<string>();
        this.warnMessages = new Array<string>();
        this.infoMessages = new Array<string>();
    }

    public Report() : FidelityReport {
        return new FidelityReport(
            this.status,
            this.errorMessages,
            this.warnMessages,
            this.infoMessages
        )
    }
    
    public IsNamed() : DrawingValidator {
        let name = this.drawing.Data["original-name"];

        if (name == undefined || name == "") {
            this.status = false;
            this.errorMessages.push("Drawing is not named.")
        }
        else {
            this.infoMessages.push("Name is " + name);
        }
    
        return this;
    }
}