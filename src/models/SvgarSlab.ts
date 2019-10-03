import * as uuid from 'uuid/v4';
import SvgarPath from './SvgarPath';

interface SvgarState {
    name: string,
    styles: {
        [tag: string]: string,
    }
}

interface SvgarStyle {
    name: string,
    attributes: {
        [attribute: string]: string,
    }
}

export default class SvgarSlab {

    private name: string;
    private id: string;
    private elevation: number;

    private state: string;
    private states: SvgarState[];
    private styles: SvgarStyle[];

    private anchor: number[];
    private geometry: SvgarPath[];

    constructor(name: string) {
        this.name = name;
        this.id = uuid.default();
        this.elevation = 0;

        this.state = "default";
        this.states = [{
            name: 'default',
            styles: {

            }
        }]

        this.styles = [{
            name: 'default',
            attributes: {
                "fill": "none",
                "stroke": "#000000",
                "stroke-width": "1px"
            }
        }]

        this.anchor = [0, 0];
        this.geometry = [];
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getStyles(): SvgarStyle[] {
        return this.styles;
    }

}