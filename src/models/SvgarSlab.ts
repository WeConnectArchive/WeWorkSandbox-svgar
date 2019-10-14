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

interface SvgarSlabCache {
    style: string,
    geometry: string,
    clipPathStyle: string,
    clipPathGeometry: string,
    maskStyle: string,
    maskGeometry: string,
}

interface SvgarSlabChanged {
    style: boolean,
    state: boolean,
    geometry: boolean,
    clipPath: boolean,
    mask: boolean,
}

type SvgarSlabFlag = "style" | "state" | "geometry" | "clipPath" | "mask";

export default class SvgarSlab {

    // Current svgar data
    private name: string;
    private id: string;
    private elevation: number;

    private state: string;
    private states: SvgarState[];
    private localStyle: SvgarStyle | undefined;
    private styles: SvgarStyle[];

    private clip: SvgarSlab | undefined;
    private mask: SvgarSlab | undefined;

    private anchor: number[];
    private geometry: SvgarPath[];

    // Current svgar cache
    public cache: SvgarSlabCache = {
        style: "",
        geometry: "",
        clipPathStyle: "",
        clipPathGeometry: "",
        maskStyle: "",
        maskGeometry: "",
    }

    // Cache update flags
    private changed: SvgarSlabChanged = {
        style: true,
        state: true,
        geometry: true,
        clipPath: true,
        mask: true,
    }

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

    public compile(): void {
        // Compile current style information
        if(this.changed.style) {
            this.changed.style = false;

            let styles: string[] = [];

            if(this.localStyle != undefined) {
                let s = `#${this.name} > * {\n`;

                Object.keys(this.localStyle.attributes).forEach(att => {
                    s += `\t${att}: ${this.localStyle?.attributes[att]};\n`;
                });

                styles.push(s += '}\n');
            }

            this.styles.forEach(style => {
                let s = `#${this.name} > .${style.name} {\n`;

                Object.keys(style.attributes).forEach(att => {
                    s += `\t${att}: ${style.attributes[att]};\n`
                });

                styles.push(s += '}\n');
            });

            this.cache.style = styles.join('\n');
        }

        // Compile stateful geometric information
        if(this.changed.state || this.changed.geometry) {
            this.changed.state = false;
            this.changed.geometry = false;

            let paths: string[] = [];

            this.geometry.sort((a, b) => a.getElevation() - b.getElevation()).forEach(path => {
                path.compile(this.anchor[0], this.anchor[1]);
                paths.push(`<path vector-effect="non-scaling-stroke" id="${path.getId()}" class="${this.mapTagToStyle(path.getTag())}" ${path.cache.d} />`);
            });

            this.cache.geometry = paths.join("\n");
        }

        // Compile clip path information, if it exists
        if(this.changed.clipPath) {
            this.changed.clipPath = false;

            if(this.clip != undefined)
            {
                this.clip.compile();

                let clip: string[] = [
                    `<clipPath id="${this.clip?.getId()}" >`,
                    this.clip.cache.geometry,
                    `</clipPath>`]
                    ; 
                
                this.cache.clipPathGeometry = clip.join("\n");
                this.cache.clipPathStyle = this.clip.cache.style;
            }
        }

        // Compile mask information, if it exists
        if(this.changed.mask) {
            this.changed.mask = false;
        }
    }

    public flag(scope: SvgarSlabFlag): void {
        switch(scope) {
            case "style":
                this.changed.style = true;
                break;
            case "state":
                this.changed.state = true;
                break;
            case "geometry":
                this.changed.geometry = true;
                break;
            case "clipPath":
                this.changed.clipPath = true;
                break;
            case "mask":
                this.changed.mask = true;
                break;
        }
    }

    public changedScope(scope: SvgarSlabFlag): boolean {
        switch(scope) {
            case "style":
                return this.changed.style;
            case "state":
                return this.changed.state;
            case "geometry":
                return this.changed.geometry;
            case "clipPath":
                return this.changed.clipPath;
            case "mask":
                return this.changed.mask;
            default:
                return false;
        }
    }

    public changedAny(): boolean {
        return this.changed.style || this.changed.state || this.changed.geometry || this.changed.mask || this.changed.clipPath;
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

    public setLocalStyle(style: SvgarStyle): void {
        this.localStyle = style;
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

    public clipWith(slab: SvgarSlab): void {
        this.clip = slab;
    }

    public getClip(): SvgarSlab | undefined {
        return this.clip;
    }

    // Given a tag, return its style in the active state
    public mapTagToStyle(tag: string): string {
        return this.states.find(x => x.name == this.state)?.styles[tag] ?? "default";
    }

}