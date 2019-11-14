import SvgarSlab from './SvgarSlab';
import Locate from './../predicates/Locate';
import { newGuid } from './../utils/Guid';

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
    global: boolean,
}

type SvgarCubeFlag = "root" | "global";

export default class SvgarCube {

    // Current svgar data
    public slabs: SvgarSlab[];
    public scope: {
        minimum: number[],
        maximum: number[],
    };

    private name: string;
    private id: string; 

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
        global: true,
    }

    constructor(name: string) {
        this.slabs = [];
        this.scope = {
            minimum: [0, 0],
            maximum: [1, 1],
        }

        this.name = name;
        this.id = newGuid();
    }

    // Write out current state of svgar data as svg markup
    public compile(width: number, height: number): string {

        // Compile root scope
        if (this.changed.root) {
            this.changed.root = false;
            this.cache.root = [
                `<svg xmlns="http://www.w3.org/2000/svg"`, 
                `viewBox="${this.scope.minimum[0]} ${-this.scope.maximum[1]} ${this.scope.maximum[0] - this.scope.minimum[0]} ${this.scope.maximum[1] - this.scope.minimum[1]}"`,
                `id="${this.id}"`,
                `width="${width}" height="${height}">\n`
            ].join(" ");
        }

        // Compile slab information
        let style: string[] = ["<style>\n"];
        let clipPaths: string[] = [];
        let masks: string[] = [];
        let geometry: string[] = [];

        this.slabs.sort((a, b) => a.getElevation() - b.getElevation()).forEach(slab => {
            slab.compile();

            style.push(slab.cache.style);
            style.push(slab.cache.clipPathStyle);
            style.push(slab.cache.maskStyle);

            clipPaths.push(slab.cache.clipPathGeometry);
            masks.push(slab.cache.maskGeometry);

            geometry.push(slab.getClip() == undefined ? `<g id="${slab.getName()}">` : `<g id="${slab.getName()}" clip-path="url(#${slab.getClip()?.getId()})">`);
            geometry.push(slab.cache.geometry);
            geometry.push(`</g>`)
        });

        style.push("</style>");

        this.cache.styles = style.join("\n");
        this.cache.clipPaths = clipPaths.join("\n");
        this.cache.masks = masks.join("\n");
        this.cache.local = geometry.join("\n");

        // Compile global scope
        if(this.changed.global) {
            this.changed.global = false;
        }

        // Compose all cached information into svg markup
        return [
            this.cache.root,
            this.cache.styles,
            this.cache.clipPaths,
            this.cache.masks,
            this.cache.local,
            "</svg>"
        ].join("\n");
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
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
    public placeAt(slab: SvgarSlab, anchorX: number, anchorY: number): void {
        this.slabs.push(slab);
        this.slabs[this.slabs.length - 1].setAnchor(anchorX, anchorY);
    }

    public flag(scope: SvgarCubeFlag): void {
        switch(scope) {
            case "global":
                this.changed.global = true;
                break;
            case "root":
                this.changed.root = true;
                break;
        }
    }

    public checkFlag(scope: SvgarCubeFlag): boolean {
        switch(scope) {
            case "global":
                return this.changed.global;
            case "root":
                return this.changed.root;
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
                console.log(e);
                x.addEventListener(e, events[e])
            });
        })
    }

    // Map page coordinate to svgar coordinate by normalizing to parent div dimensions
    mapPageCoordinateToSvgarCoordinate(pageX: number, pageY: number, div?: Element): number[] {
        // Locate parent div with svgar coordinate or use provided element
        var nx, ny;
        const el: Element | null = div ?? document.querySelector(`#${this.id}`);

        if (el == null) {
            return [];
        }

        // Get normalized coordinate locations on html element
        const svgarRect = el.getBoundingClientRect();
        const nX = (pageX - svgarRect.left) / (svgarRect.right - svgarRect.left);
        const nY = (pageY - svgarRect.top) / (svgarRect.bottom - svgarRect.top);

        // Compare page div proportion to svgar camera proportion
        const camera = this.scope;
        const svgarXDomain = camera.maximum[0] - camera.minimum[0];
        const svgarYDomain = camera.maximum[1] - camera.minimum[1];

        const svgarProportion = svgarXDomain / svgarYDomain;

        const pageXDomain = svgarRect.right - svgarRect.left;
        const pageYDomain = svgarRect.bottom - svgarRect.top;

        const pageProportion = pageXDomain / pageYDomain;

        // Calculate svgar domain modifiers based on relative proportions
        const xModifier = pageProportion > svgarProportion 
            ? (pageXDomain / svgarXDomain) * (svgarYDomain / pageYDomain)
            : 1;
        const yModifier = pageProportion < svgarProportion
            ? (pageYDomain / svgarYDomain) * (svgarXDomain / pageXDomain)
            : 1;

        // Calculate visible svgar extents
        // ( Chuck ) This process is necessary given how svg renders a viewBox with different proportions than the parent div
        interface SvgarExtents {
            x: {
                min: number,
                max: number
            },
            y: {
                min: number,
                max: number
            }
        }

        const deltaX = ((svgarXDomain * xModifier) - svgarXDomain) / 2;
        const deltaY = ((svgarYDomain * yModifier) - svgarYDomain) / 2;

        const visibleSvgarExtents: SvgarExtents = {
            x: {
                min: camera.minimum[0] - deltaX,
                max: camera.maximum[0] + deltaX
            },
            y: {
                min: camera.minimum[1] - deltaY,
                max: camera.maximum[1] + deltaY
            }
        }

        const visibleSvgarXDomain = visibleSvgarExtents.x.max - visibleSvgarExtents.x.min;
        const visibleSvgarYDomain = visibleSvgarExtents.y.max - visibleSvgarExtents.y.min;

        // Map normalized coordinates to calculated visible svgar domain
        const svgarX = (nX * visibleSvgarXDomain) + visibleSvgarExtents.x.min;
        const svgarY = visibleSvgarYDomain - ((nY * visibleSvgarYDomain) - visibleSvgarExtents.y.min);
        
        return [svgarX, svgarY];
    }
}