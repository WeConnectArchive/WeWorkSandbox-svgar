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
        this.slabs.sort((a, b) => a.getElevation() - b.getElevation()).forEach(slab => {

            // Compile style information
            let styleCache: string[] = [];

            slab.getAllStyles().forEach(style => {
                let s = `#${slab.getName()} > .${style.name} {\n`;

                Object.keys(style.attributes).forEach(att => {
                    s += `\t${att}: ${style.attributes[att]};\n`
                });

                styleCache.push(s += '}\n');
            })

            style.push(styleCache.join('\n'));

            // Compile geometric information
            let geometryCache: string[] = [`<g id="${slab.getName()}">\n`];

            slab.getAllGeometry().sort((a, b) => a.getElevation() - b.getElevation()).forEach(geo => {
                let g = `<path class="${slab.mapTagToStyle(geo.getTag())}" d="`

                const coordinates = geo.getCoordinates();

                let c:number[] = [];
                
                for (let i = 0; i < coordinates.length; i += 8) {

                    for (let j = 0; j < 8; j++) {
                        let isY: boolean = j % 2 == 1;
                        let size: number = isY ? height : width;
                        c.push(this.aggregateTransform(coordinates[i + j], size, isY))
                    }

                    if (i == 0) {
                        g += `M ${c[i]} ${c[i + 1]} `
                    }

                    g += `C ${c[i + 2]} ${c[i + 3]} ${c[i + 4]} ${c[i + 5]} ${c[i + 6]} ${c[i + 7]} `
                }

                if (geo.isClosed()) {
                    g += "Z";
                }

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