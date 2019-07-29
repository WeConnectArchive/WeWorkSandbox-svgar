import { Drawing } from "../../models/schema/drawing/Drawing";
import { DrawingValidator } from "./drawing/validator";

export class VerifyPredicate {

    public DrawingFidelity(drawing: Drawing) : FidelityReport {
        let Validate = new DrawingValidator(drawing);

        let suite = Validate
            .IsNamed();

        return suite.Report();
    }

}

export class FidelityReport {

    public status:boolean;
    public errorMessages:string[];
    public warnMessages:string[];
    public infoMessages:string[];

    constructor(status: boolean, error: string[], warn: string[], info: string[]) {
        this.status = status;
        this.errorMessages = error;
        this.warnMessages = warn;
        this.infoMessages = info;
    }

    public Error(message: string) : FidelityReport {
        this.errorMessages.push(message);
        return this;
    }

    public Warn(message: string) : FidelityReport {
        this.warnMessages.push(message);
        return this;
    }

    public Info(message:string) : FidelityReport {
        this.infoMessages.push(message);
        return this;
    }
}