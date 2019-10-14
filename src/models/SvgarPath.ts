import * as uuid from 'uuid/v4';

interface SvgarPathCache {
    d: string,
}

interface SvgarPathChanged {
    geometry: boolean;
}

type SvgarCubeFlag = "geometry";

export default class SvgarPath {

    private id: string;
    private tag: string;
    private coordinates: number[];
    private elevation: number;

    private events: {
        [event: string]: (arg: any) => void,
    }

    // Current cache
    public cache: SvgarPathCache = {
        d: "",
    }

    // Cache update flags
    public changed: SvgarPathChanged = {
        geometry: true,
    }

    public segments: number;

    constructor(coordinates: number[]) {
        this.id = uuid.default();
        this.tag = "default";
        this.elevation = 0;

        this.coordinates = coordinates;
        this.segments = this.coordinates.length / 8;

        this.events = {};
    }

    public compile(ax?: number, ay?: number): void {
        if(!this.changed.geometry) {
            return;
        }

        const dx = ax ?? 0;
        const dy = ay ?? 0;

        this.changed.geometry = false;

        const c = this.coordinates;
        let d = 'd="'

        for (let i = 0; i < c.length; i+=8) {
            
            if (i == 0) {
                d += `M ${c[i] + dx} ${-(c[i + 1] + dy)}`
            }

            d += ` C ${c[i + 2] + dx} ${-(c[i + 3] + dy)} ${c[i + 4] + dx} ${-(c[i + 5] + dy)} ${c[i + 6] + dx} ${-(c[i + 7] + dy)}`

        }

        d += this.isClosed() ? ' Z"' : '"';

        this.cache.d = d;
    }

    public flag(scope: SvgarCubeFlag): void {
        switch(scope) {
            case "geometry":
                this.changed.geometry = true;
                break;
        }
    }

    public changedAny(): boolean {
        return this.changed.geometry;
    }

    public attach(event: string, fct: (arg: any) => void): void {
        this.events[event] = fct;
    }

    public getAllEvents() {
        return this.events;
    }

    public getId(): string {
        return this.id;
    }

    public newId(): string {
        this.id = uuid.default();
        return this.id;
    }

    public getTag(): string {
        return this.tag;
    }

    public setTag(tag: string): void {
        this.tag = tag;
    }

    public getElevation(): number {
        return this.elevation;
    }

    public setElevation(elevation: number): void {
        this.elevation = elevation;
    }

    public getCoordinates(): number[] {
        return this.coordinates;
    }

    public isClosed(): boolean {
        if(!this.isContiguous()) {
            return false;
        }

        const xMatch = this.coordinates[0] == this.coordinates[this.coordinates.length - 2];
        const yMatch = this.coordinates[1] == this.coordinates[this.coordinates.length - 1];
        
        return xMatch && yMatch;
    }

    public isContiguous(): boolean {
        if (this.coordinates.length < 8) {
            return false;
        }
        
        for (let i = 0; i < this.coordinates.length - 8; i += 8) {
            if (this.coordinates[i + 6] != this.coordinates[i + 8]) {
                return false;
            }

            if (this.coordinates[i + 7] != this.coordinates[i + 9]) {
                return false;
            }
        }

        return true;
    }

}