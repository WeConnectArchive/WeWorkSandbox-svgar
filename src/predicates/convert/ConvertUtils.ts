export function Normalize(point: number[], domain: Domain) : number[] {

    let xNormalized = (point[0] - domain.xDomain[0]) / (domain.xDomain[1] - domain.xDomain[0]);
    let yNormalized = (point[1] - domain.yDomain[0]) / (domain.yDomain[1] - domain.yDomain[0]);
    let zNormalized = 0;

    // Normalize Z coordinate if it exists
    if (point.length > 2) {
        zNormalized = (point[2] - domain.zDomain[0]) / (domain.zDomain[1] - domain.zDomain[0]);
    }

    return [xNormalized, yNormalized, zNormalized];
}