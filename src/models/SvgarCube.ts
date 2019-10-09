import SvgarSlab from './SvgarSlab';
import Locate from './../predicates/Locate';

type SvgarScope = "root" | "defs" | "cube";

export default class SvgarCube {

    // Current svgar data
    private name: string;
    public slabs: SvgarSlab[];
    private placements: {
        slabName: string,
        elevation: number,
        instances: {
            x: number,
            y: number
        }[]
    }[] = [];
    public scope: {
        minimum: number[],
        maximum: number[],
    };

    // Cached output by scope
    private root: string = "";
    private defs: string = "";
    private cube: string = "";

    // Refresh flags 
    private refreshRoot: boolean = true;
    private refreshDefs: boolean = true;
    private refreshCube: boolean = true;

    constructor(name?: string) {
        this.name = name || "";
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

            const min = this.scope.minimum;
            const max = this.scope.maximum;

            const xmlns = `xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"`;
            const viewBox = `viewBox="${min[0]} ${-max[1]} ${max[0] - min[0]} ${max[1] - min[1]}"`;
            const divBox = `width="${width}" height="${height}"`

            this.root = ["<svg", xmlns, viewBox, divBox, ">\n"].join(" ");
        }

        // Compile defs scope
        let defs: string[] = ["<defs>"]

        // Compile each slab
        this.slabs.sort((a, b) => a.getElevation() - b.getElevation()).forEach(slab => {

            defs.push(slab.compile());

            // (Chuck) The slab will flag itself as refreshed on compile if anything changed.
            if (slab.refresh) {
                this.refreshDefs = true;
            }

            // if (slab.refresh) {
            //     let styleCache: string[] = [];

            //     slab.getAllStyles().forEach(style => {
            //         let s = `#${slab.getName()} > .${style.name} {\n`;
    
            //         Object.keys(style.attributes).forEach(att => {
            //             s += `\t${att}: ${style.attributes[att]};\n`
            //         });
    
            //         styleCache.push(s += '}\n');
            //     });
    
            //     style.push(styleCache.join('\n'));
            // }
            // else {
                
            // }

            // Compile geometry scope (defs, global, local)
            // if (this.refreshGlobal) {
            //     let geometryCache: string[] = [`<g id="${slab.getName()}">\n`];

            //     slab.getAllGeometry().sort((a, b) => a.getElevation() - b.getElevation()).forEach(geo => {
            //         let g = `<path class="${slab.mapTagToStyle(geo.getTag())}" id="${geo.getId()}" d="`
    
            //         const coordinates = geo.getCoordinates();
    
            //         let c:number[] = [];
                    
            //         for (let i = 0; i < coordinates.length; i += 8) {
    
            //             for (let j = 0; j < 8; j++) {
            //                 //let isY: boolean = j % 2 == 1;
            //                 //let size: number = isY ? height : width;
            //                 c.push(coordinates[i + j])
            //             }
    
            //             if (i == 0) {
            //                 g += `M ${c[i]} ${-c[i + 1]} `
            //             }
    
            //             g += `C ${c[i + 2]} ${-c[i + 3]} ${c[i + 4]} ${-c[i + 5]} ${c[i + 6]} ${-c[i + 7]}`
            //         }
    
            //         if (geo.isClosed()) {
            //             g += " Z";
            //         }
    
            //         g += `" />`;
    
            //         geometryCache.push(g)
            //     });
    
            //     geometryCache.push("\n</g>");
    
            //     geometry.push(geometryCache.join('\n'));
            // }

        });

        if (this.refreshDefs) {
            this.refreshDefs = false;
            defs.push("</defs>")
            this.defs = defs.join('\n');
        }

        // Compile cube scope
        if (this.refreshCube) {
            this.refreshCube = false;

            let cube: string[] = [`<g id="${this.name}" >`];

            this.placements.sort((a, b) => a.elevation - b.elevation).forEach(x => {
                x.instances.forEach(loc => {
                    cube.push(`<use x="${loc.x}" y="${-loc.y}" xlink:href="#${x.slabName}" />`)
                });
            });

            cube.push("</g>");

            this.cube = cube.join("\n");
        }

        // Finish compilation
        let svg = [this.root, this.defs, this.cube, "</svg>"].join('\n');

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
            case "defs":
                this.refreshDefs = true;
                break;
            case "cube":
                this.refreshCube = true;
                break;
        }
    }

    // Add a given slab to the svgar cube
    public place(slab: SvgarSlab): void {
        this.placeAt(slab, 0, 0);
    }

    // Add a given slab to the svgar cube with a custom anchor point
    public placeAt(slab: SvgarSlab, x: number, y: number): void {
        if(this.slabs.find(x => x.getName() == slab.getName()) == undefined) {
            this.slabs.push(slab);
        }
        
        let placements = this.placements.find(x => x.slabName == slab.getName());

        if (placements != undefined) {
            placements.instances.push({x: x, y: y});
        }
        else {
            this.placements.push({slabName: slab.getName(), elevation: slab.getElevation(), instances: [{x: x, y: y}]});
        }
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