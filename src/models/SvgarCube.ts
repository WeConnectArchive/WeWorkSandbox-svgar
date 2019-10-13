import SvgarSlab from './SvgarSlab';
import Locate from './../predicates/Locate';

type SvgarScope = "root" | "style" | "defs" | "global" | "local";

interface SvgarCubeCache {
    root: string,
    styles: string,
    clipPaths: string,
    masks: string,
    global: string,
    local: string,
}

interface SvgarCubeChanged {
    root: boolean,
    styles: boolean,
    clipPaths: boolean,
    masks: boolean,
    global: boolean,
    local: boolean
}

export default class SvgarCube {

    // Current svgar data
    public slabs: SvgarSlab[];
    public scope: {
        minimum: number[],
        maximum: number[],
    };

    // Current svgar cache
    private cache: SvgarCubeCache = {
        root: "",
        styles: "",
        clipPaths: "",
        masks: "",
        global: "",
        local: ""
    }

    // Cache update flags
    private changed: SvgarCubeChanged = {
        root: true,
        styles: true,
        clipPaths: true,
        masks: true,
        global: true,
        local: true
    }

    // Depreciated
    private root: string = "";
    private style: string = "";
    private clips: string = "";
    private global: string = "";
    private local: string = "";

    private refreshRoot: boolean = true;
    private refreshStyle: boolean = true;
    private refreshDefs: boolean = true;
    private refreshGlobal: boolean = true;
    private refreshLocal: boolean = true;

    constructor() {
        this.slabs = [];
        this.scope = {
            minimum: [0, 0],
            maximum: [1, 1],
        }
    }

    // Write out current state of svgar data as svg markup
    public compile(width: number, height: number): string {
        
        // Compile root scope
        if (this.refreshRoot) {
            this.refreshRoot = false;
            this.root = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${this.scope.minimum[0]} ${-this.scope.maximum[1]} ${this.scope.maximum[0] - this.scope.minimum[0]} ${this.scope.maximum[1] - this.scope.minimum[1]}" width="${width}" height="${height}">\n`
        }

        // Initialize arrays for style and geometry
        let style: string[] = ["\n<style>\n"];
        let clips: string[] = [];
        let geometry: string[] = [];

        // Compile slabs
        this.slabs.sort((a, b) => a.getElevation() - b.getElevation()).forEach(slab => {

            // Compile style scope
            if (this.refreshStyle) {
                let styleCache: string[] = [];

                slab.getAllStyles().forEach(style => {
                    let s = `#${slab.getName()} > .${style.name} {\n`;
    
                    Object.keys(style.attributes).forEach(att => {
                        s += `\t${att}: ${style.attributes[att]};\n`
                    });
    
                    styleCache.push(s += '}\n');
                });
    
                style.push(styleCache.join('\n'));
            }

            // Compile clip paths, if they exist
            if (slab.getClip() != undefined) {
                let clip: string[] = [`<clipPath id="${slab.getClip()?.[0].getId()}">`];

                slab.getClip()?.forEach(geo => {

                    let c = `<path vector-effect="non-scaling-stroke" d="`;

                    let pts = geo.getCoordinates();

                    for (let i = 0; i < pts.length; i+=8) {

                        if (i == 0) {
                            c += `M ${pts[i]} ${-pts[i + 1]}`;
                        }

                        c += ` C ${pts[i + 2]} ${-pts[i + 3]} ${pts[i + 4]} ${-pts[i + 5]} ${pts[i + 6]} ${-pts[i + 7]}`
                    }

                    c += geo.isClosed() ? ' Z" />' : '" />';

                    clip.push(c);
                });

                clip.push("</clipPath>");

                clips.push(clip.join("\n"));
            }

            // Compile geometry scope (defs, global, local)
            if (this.refreshGlobal) {
                let geometryCache: string[] = slab.getClip() == undefined 
                    ? [`<g id="${slab.getName()}">\n`]
                    : [`<g id="${slab.getName()}" clip-path="url(#${slab.getClip()?.[0].getId()})">\n`];

                slab.getAllGeometry().sort((a, b) => a.getElevation() - b.getElevation()).forEach(geo => {
                    let g = `<path vector-effect="non-scaling-stroke" class="${slab.mapTagToStyle(geo.getTag())}" id="${geo.getId()}" d="`
    
                    const coordinates = geo.getCoordinates();
    
                    let c:number[] = [];
                    
                    for (let i = 0; i < coordinates.length; i += 8) {
    
                        for (let j = 0; j < 8; j++) {
                            //let isY: boolean = j % 2 == 1;
                            //let size: number = isY ? height : width;
                            c.push(coordinates[i + j])
                        }
    
                        if (i == 0) {
                            g += `M ${c[i]} ${-c[i + 1]}`
                        }
    
                        g += ` C ${c[i + 2]} ${-c[i + 3]} ${c[i + 4]} ${-c[i + 5]} ${c[i + 6]} ${-c[i + 7]}`
                    }

                    g += geo.isClosed() ? ' Z" />' : '" />';
    
                    geometryCache.push(g)
                });
    
                geometryCache.push("\n</g>");
    
                geometry.push(geometryCache.join('\n'));
            }

        });

        style.push("</style>\n");

        // Commit information from slabs to svg string
        if (this.refreshStyle) {
            this.refreshStyle = false;
            this.style = style.join('\n');
        }

        this.clips = clips.join('\n');
        
        if (this.refreshGlobal) {
            this.refreshGlobal = false;
            this.global = geometry.join('\n');
        }

        // Finish compilation
        let svg = [this.root, this.style, this.clips, this.global, "</svg>"].join('\n');

        return svg;
    }

    private aggregateTransform(value: number, size: number, isY: boolean): number {
        const normalized = (value - this.scope.minimum[+isY]) / (this.scope.maximum[+isY] - this.scope.minimum[+isY])
        const inverted = isY ? 1 - normalized : normalized;
        const final = inverted * size;
        
        return final;
    }

    // Change current camera position based on a center point and rectangular extents
    public frame(anchor: number[], w?: number, h?: number): void {
        const xDomain = w ?? this.scope.maximum[0] - this.scope.minimum[0];
        const yDomain = h ?? this.scope.maximum[1] - this.scope.minimum[1];

        this.scope.minimum = [anchor[0] - (xDomain / 2), anchor[1] - (yDomain / 2)];
        this.scope.maximum = [anchor[0] + (xDomain / 2), anchor[1] + (yDomain / 2)];
    }

    // Flag a cache scope to be recomputed on next compile
    public flag(scope: SvgarScope): void {
        switch(scope) {
            case "root":
                this.refreshRoot = true;
                break;
            case "style":
                this.refreshStyle = true;
                break;
            case "defs":
                this.refreshDefs = true;
                break;
            case "global":
                this.refreshGlobal = true;
                break;
            case "local":
                this.refreshLocal = true;
                break;
        }
    }

    // Add a given slab to the svgar cube
    public place(slab: SvgarSlab): void {
        
    }

    // Add a given slab to the svgar cube with a custom anchor point
    public placeAt(slab: SvgarSlab, anchor: number[]): void {

    }

    // Activate any declared event listeners
    public listen(): void {
        document.querySelectorAll("path").forEach(x => {
            const path = Locate().svgar.path.withId(x.id).in.svgar.cube(this);

            const events = path?.getAllEvents();

            if (events == undefined) {
                return;
            }

            Object.keys(events).forEach(e => {
                document.addEventListener(e, events[e])
            });
        })
    }
}