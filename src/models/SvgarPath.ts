import * as uuid from 'uuid/v4';

export default class SvgarPath {

    private id: string;
    private tag: string;
    private coordinates: number[];
    private events: {
        [event: string]: (arg: any) => void,
    }

    public segments: number;

    constructor(coordinates: number[]) {
        this.id = uuid.default();
        this.tag = "default";

        this.coordinates = coordinates;
        this.segments = this.coordinates.length / 8;

        this.events = {};
    }

    public attach(event: string, fct: (arg: any) => void): void {
        this.events[event] = fct;
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