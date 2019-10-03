import * as uuid from 'uuid/v4';

export default class SvgarPath {

    private Id: string;
    private Tag: string;
    private Coordinates: number[];
    private Events: {
        [Event: string]: (arg: any) => void,
    }

    constructor(coordinates: number[]) {
        this.Id = uuid.default();
        this.Tag = "default";

        this.Coordinates = coordinates;

        this.Events = {};
    }

    public Attach(event: string, fct: (arg: any) => void): void {
        this.Events[event] = fct;
    }
}