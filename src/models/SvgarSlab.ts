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

    private geometry: SvgarPath[];

    // Cached compile results
    private style: string = "";
    private paths: string = "";

    // Recompilation flags
    public refresh: boolean = true;
    private refreshStyle: boolean = true;
    private refreshState: boolean = true;
    private refreshPaths: boolean = true;

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

        this.geometry = [];
    }

    public compile(): string {
        const g = `<g id="${this.name}" >`;

        if (this.refreshStyle) {
            let styles: string[] = ["<style>"];

            this.refresh = true;
            this.refreshStyle = false;

            this.styles.forEach(style => {
                let s = `#${this.name} > .${style.name} {\n`;

                Object.keys(style.attributes).forEach(att => {
                    s += `\t${att}: ${style.attributes[att]};\n`
                });

                styles.push(s += '}\n');
            });

            styles.push("</style>")

            this.style = (styles.join('\n'));
        }

        let paths: string[] = [];

        this.geometry.forEach(path => {
            if(path.refresh || this.refreshState) {
                path.refresh = false;
                this.refreshPaths = true;

                // Compile path
                this.geometry.sort((a, b) => a.getElevation() - b.getElevation()).forEach(geo => {
                    let g = `<path class="${this.mapTagToStyle(geo.getTag())}" id="${geo.getId()}" d="`

                    const coordinates = geo.getCoordinates();

                    let c:number[] = [];
                    
                    for (let i = 0; i < coordinates.length; i += 8) {

                        for (let j = 0; j < 8; j++) {
                            //let isY: boolean = j % 2 == 1;
                            //let size: number = isY ? height : width;
                            c.push(coordinates[i + j])
                        }

                        if (i == 0) {
                            g += `M ${c[i]} ${-c[i + 1]} `
                        }

                        g += `C ${c[i + 2]} ${-c[i + 3]} ${c[i + 4]} ${-c[i + 5]} ${c[i + 6]} ${-c[i + 7]}`
                    }

                    if (geo.isClosed()) {
                        g += " Z";
                    }

                    g += `" />`;

                    paths.push(g)
                    
                });
            }
        })

        if (this.refreshPaths) {
            this.refresh = true;
            this.refreshState = false;
            this.refreshPaths = false;

            this.paths = paths.join("\n");
        }

        return [g, this.style, this.paths, "</g>"].join("\n");
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
        clone.setAllGeometry(this.geometry);

        return clone;
    }

    // Given a tag, return its style in the active state
    public mapTagToStyle(tag: string): string {
        return this.states.find(x => x.name == this.state)?.styles[tag] ?? "default";
    }

}