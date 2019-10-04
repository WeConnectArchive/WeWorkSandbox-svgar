import * as uuid from 'uuid/v4';

export default class SvgarPath {

    private id: string;
    private tag: string;
    private coordinates: number[];
    private elevation: number;

    private events: {
        [event: string]: (arg: any) => void,
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

    public attach(event: string, fct: (arg: any) => void): void {
        this.events[event] = fct;
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