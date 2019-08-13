declare module 'rhino3dm' {

    export default function rhino3dm() : Promise<RhinoModule>;

    class RhinoModule {
        File3dm: typeof File3dm;
        Line: typeof Line;
        NurbsCurve: typeof NurbsCurve;
        Point3dList: typeof Point3dList;      
    }

    class File3dm {
        revision: number;

        constructor();

        static fromByteArray(array:Uint8Array) : File3dm;
        objects() : File3dmObjectTable;
        layers() : File3dmLayerTable;
    }

    class File3dmLayerTable {

        constructor();

        count() : number;
        get(index:number) : Layer;
    }

    class File3dmObject {

        constructor();

        attributes() : any;
        geometry() : any;
    }

    class File3dmObjectTable {
        count:number;

        constructor();

        get(index:number) : File3dmObject;
    }

    class Layer {
        name:string;

        constructor();
    }

    class Line {
        from:Point3d;
        length: number;
        to:Point3d;

        constructor(from:number[], to:number[]);
    }

    class NurbsCurve {

        constructor(degree: number, pointCount: number);

        static create(periodic: boolean, degree: number, points: Point3dList) : NurbsCurve;
    }

    class Point3d {
        xyz:number[];

        constructor(x:number, y:number, z:number);

        DistanceTo(point:Point3d) : number;
    }

    class Point3dList {
        xyz:number[]

        constructor(capacity?: number);

        add(x:number, y:number, z:number) : Point3dList;
    }

    class Sphere {
        center: Point3d;
        diameter: number;
        isValid: boolean;

        constructor(center:Point3d, radius:number)
    }
}