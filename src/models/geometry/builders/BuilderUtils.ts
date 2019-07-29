// Scale coordinates from provided domain to asvg coordinate space [0, 1]
export function Normalize(coordinates:number[], xDomain:number[], yDomain:number[]) : void {

    for (let i = 0; i < coordinates.length; i++) {
        if (i % 2 == 0) {
            // x coordinate
            coordinates[i] = (coordinates[i] - xDomain[0]) / (xDomain[1] - xDomain[0]);
        }
        else {
            // y coordinate
            coordinates[i] = (coordinates[i] - yDomain[0]) / (yDomain[1] - yDomain[0]);
        }
    }

}

// Mirror all y coordinates over the x axis
export function MirrorY(coordinates:number[]) : void {

    for (let i = 1; i < coordinates.length; i += 2) {
        coordinates[i] = 1 - coordinates[i];
    }

}

// Get midpoint of two points
export function Midpoint(ptA: number[], ptB: number[]) : number[] {
    return [ ( ptA[0] + ptB[0] ) / 2 , ( ptA[1] + ptB[1] ) / 2 ];
}