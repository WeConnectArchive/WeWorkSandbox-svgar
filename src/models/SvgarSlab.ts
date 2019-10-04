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

    public newId(): void {
        this.id = uuid.default();
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getElevation(): number {
        return this.elevation;
    }

    public setElevation(elevation: number): void {
        this.elevation = elevation;
    }

    public getCurrentState(): string {
        return this.state;
    }

    public setCurrentState(state: string): void {
        this.state = state;
    }

    public getAllStates(): SvgarState[] {
        return this.states;
    }

    public setAllStates(states: SvgarState[]): void {
        this.states = states;
    }

    public addState(state: SvgarState): void {
        this.states.push(state);
    }

    public getAllStyles(): SvgarStyle[] {
        return this.styles;
    }

    public setAllStyles(styles: SvgarStyle[]): void {
        this.styles = styles;

        if (this.styles.find(x => x.name == "default") == undefined) {
            this.addStyle({
                name: "default",
                attributes: {
                    "fill": "none",
                    "stroke": "#000000",
                    "stroke-width": "1px"
                }
            })
        }
    }

    public addStyle(style: SvgarStyle): void {
        this.styles.push(style);
    }

    public getAnchor(): number[] {
        return this.anchor;
    }

    public setAnchor(x: number, y: number): void {
        this.anchor = [x, y];
    }

    public getAllGeometry(): SvgarPath[] {
        return this.geometry;
    }

    public setAllGeometry(geometry: SvgarPath[]): void {
        this.geometry = geometry;
    }

    public addPath(path: SvgarPath): void {
        this.geometry.push(path);
    }

    public clone(): SvgarSlab {
        let clone = new SvgarSlab(this.name);

        clone.newId();
        clone.setElevation(this.elevation);
        clone.setCurrentState(this.state);
        clone.setAllStates(this.states);
        clone.setAllStyles(this.styles);
        clone.setAnchor(this.anchor[0], this.anchor[1]);
        clone.setAllGeometry(this.geometry);

        return clone;
    }

    // Given a tag, return its style in the active state
    public mapTagToStyle(tag: string): string {
        return this.states.find(x => x.name == this.state)?.styles[tag] ?? "default";
    }

}