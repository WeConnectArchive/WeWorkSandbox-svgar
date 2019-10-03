import SvgarSlab from './SvgarSlab';

export default class SvgarCube {

    public slabs: SvgarSlab[];
    public scope: {
        minimum: number[],
        maximum: number[],
    };

    constructor() {
        this.slabs = [];
        this.scope = {
            minimum: [0, 0],
            maximum: [1, 1],
        }
    }

    // Write out current state of svgar data as svg markup
    public compile(width: number, height: number): string {
        // Begin compilation
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 ${width} ${height}" width="${width}" height="${height}" version="1.1">\n`

        // Initialize arrays for style and geometry
        let style: string[] = ["\n<style>\n"];
        let geometry: string[] = [];

        // Compile slabs
        this.slabs.forEach(slab => {

            // Compile style information
            let styleCache: string[] = [];

            slab.getStyles().forEach(style => {
                let s = `#${slab.getName()} > .${style.name} {\n`;

                Object.keys(style.attributes).forEach(att => {
                    s += `\t${att}: ${style.attributes[att]};\n`
                });

                styleCache.push(s += '}\n');
            })

            style.push(styleCache.join('\n'));

            // Compile geometric information
            let geometryCache: string[] = [`<g id="${slab.getName()}">\n`];

            slab.getGeometry().forEach(geo => {
                let g = `<path class="${slab.mapTagToStyle(geo.getTag())}" d="`
                
                g += `" />`;

                geometryCache.push(g)
            });

            geometryCache.push("\n</g>");

            geometry.push(geometryCache.join('\n'));

        });

        style.push("</style>\n");

        // Commit information from slabs to svg string
        svg += style.join('\n');
        svg += '\n';
        svg += geometry.join('\n');
        svg += '\n';

        // Finish compilation
        svg += "\n</svg>"

        return svg;
    }

    private aggregateTransform(value: number, size: number, isY: boolean): number {
        return (((value - this.scope.minimum[+isY]) / (this.scope.maximum[+isY] - this.scope.minimum[+isY])) - this.scope.minimum[+isY]) * size;
    }

    // Change current camera position based on a center point and rectangular extents
    public frame(anchor: number[], w?: number, h?: number): void {

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
            //If geometry element of x.id has any attached events, add listener!
        })
    }
}