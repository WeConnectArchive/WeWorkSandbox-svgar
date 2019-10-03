import SvgarSlab from './SvgarSlab';

export default class SvgarCube {

    public Slabs: SvgarSlab[];
    public Scope: {
        Minimum: number[],
        Maximum: number[],
    };

    constructor() {
        this.Slabs = [];
        this.Scope = {
            Minimum: [0, 0],
            Maximum: [1, 1],
        }
    }

    // Write out current state of svgar data as svg markup
    public Compile(): string {
        //
        return "svg";
    }

    // Change current camera position based on a center point and rectangular extents
    public Frame(anchor: number[], w?: number, h?: number): void {

    }

    // Add a given slab to the svgar cube
    public Place(slab: SvgarSlab): void {

    }

    // Add a given slab to the svgar cube with a custom anchor point
    public PlaceAt(slab: SvgarSlab, anchor: number[]): void {

    }

    // Activate any declared event listeners
    public Listen(): void {
        document.querySelectorAll("path").forEach(x => {
            //If geometry element of x.id has any attached events, add listener!
        })
    }
}