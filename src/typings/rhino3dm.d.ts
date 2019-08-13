declare module 'rhino3dm' {

    export default function rhino3dm() : Promise<RhinoModule>;

    // Notes:
    // Interval - number[] with two values
    // ObjectType - empty object of some "ObjectType_Name"
    // Array.<x, y, z> - number[] with three values (xyz)

    // Parent module returned by the library
    class RhinoModule {
        CommonObject: typeof CommonObject;
        File3dm: typeof File3dm;
        Line: typeof Line;
        NurbsCurve: typeof NurbsCurve;
        Point3dList: typeof Point3dList;      
    }

    class ArcCurve extends Curve {
        angleDegrees: number;
        angleRadians: number;
        isCompleteCircle: boolean;
        radius: number;

        constructor();
    }

    class BoundingBox {
        area: number;
        center: number[]; //TODO - Array.<x, y, z>
        diagonal: number[]; //TODO - Array.<x, y, z>
        isValid: boolean;
        max: number[]; //TODO - Array.<x, y, z>
        min: number[]; //TODO - Array.<x, y, z>
        volume: number;

        constructor(min: number[], max: number[]); //TODO - Array.<x, y, z>

        static decode(): any;
        static union(other: BoundingBox): void;
        closestPoint(point: number[]): number[]; //TODO - Array.<x, y, z>
        contains(point: number[]): boolean; //TODO - Array.<x, y, z>
        encode(): any;
        isDegenerate(tolerance:number): number;
        toBrep(): any; //TODO
        toJSON(): string;
        transform(xform: any): boolean; //TODO
    }

    // Note: not documented
    class Color {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    class CommonObject {
        userStringCount: any //TODO

        static decode() : any //TODO
        encode() : any //TODO
        getUserString() : any //TODO
        setUserString() : any //TODO
        toJSON() : any //TODO
    }

    class Curve extends GeometryBase {
        degree: number;
        dimension: number;
        domain: number[]; //TODO - Interval
        isClosed: boolean;
        isPeriodic: boolean;
        pointAtEnd: number[]; //TODO - Array.<x, y, z>
        pointAtStart: number[]; //TODO - Array.<x, y, z>
        spanCount: number;

        changeClosedCurveSeam(t: number): boolean;
        changeDimension(desiredDimension: number): boolean;
        curvatureAt(t: number): number[]; //TODO - Array.<x, y, z>
        isArc(): boolean;
        isCircle(): boolean;
        isEllipse(): boolean;
        isLinear(): boolean;
        isPlanar(): boolean;
        isPolyline(): boolean;
        pointAt(t: number): number[]; //TODO - Array.<x, y, z>
        reverse(): boolean;
        setEndPoint(point: number[]): boolean;
        tangentAt(t: number): number[]; //TODO - Array.<x, y, z>
        toNurbsCurve(): NurbsCurve;
        trim(t0: number, t1: number): Curve | undefined;
        //tryGetArc(arc: Arc): boolean;
        //tryGetCircle(circle: Circle): boolean;
        //tryGetPolyline(polyline: Polyline): boolean;
    }

    class File3dm {
        applicationDetails: string;
        applicationName: string;
        applicationUrl: string;
        createdBy: string;
        lastEditedBy: string;
        revision: number;
        startSectionComments: string;

        constructor();

        static fromByteArray(array:Uint8Array) : File3dm;
        dimstyles() : any; //TODO
        instanceDefinitions() : any; //TODO
        layers() : File3dmLayerTable;        
        objects() : File3dmObjectTable;
        settings() : any; //TODO
    }

    class File3dmLayerTable {

        constructor();

        count() : number;
        get(index:number) : Layer;
    }

    class File3dmObject {

        constructor();

        attributes() : any; //TODO
        geometry() : any; //TODO: Incomplete
    }

    class File3dmObjectTable {
        count:number;

        constructor();

        get(index:number) : File3dmObject;
    }

    class GeometryBase extends CommonObject {
        hasBrepForm: boolean;
        isDeformable: boolean;
        objectType: any; //TODO - ObjectType

        getBoundingBox(accurate: boolean): BoundingBox;
        makeDeformable(): boolean;
        rotate(angleRadians: number, rotationAxis: number[], rotationCenter: number[]): boolean; //TODO - Array.<x, y, z>
        scale(scaleFactor: number): boolean;
        transform(xform: any): boolean; //TODO
        translate(translationVector: number[]): boolean; //TODO - Array.<x, y, z>
    }

    class Layer extends CommonObject {
        color: Color;
        //expanded
        id: string;
        igesLevel: number;
        linetypeIndex: number;
        //locked
        name: string;
        parentLayerId: string;
        plotColor: Color;
        plotWeight: number;
        renderMaterialIndex: number;
        //visible

        constructor();

        deletePerViewportColor(viewportId: string): void;
    }

    class Line {
        from: number[]; //TODO - Array.<x, y, z>
        length: number;
        to: number[]; //TODO - Array.<x, y, z>

        constructor(from:number[], to:number[]);
    }

    class NurbsCurve {
        hasBezierSpans: boolean;
        isRational: boolean;
        order: number;

        constructor(degree: number, pointCount: number);

        static create(periodic: boolean, degree: number, points: Point3dList) : NurbsCurve;
        increaseDegree(desiredDegree: number): boolean;
        makePiecewiseBezier(setEndWeightsToOne: boolean): boolean;
        reparameterize(c: number): boolean;
    }

    class Point3dList {
        boundingBox: BoundingBox;
        capacity: number;
        count: number;

        constructor(initialCapacity?: number);

        add(x:number, y:number, z:number): Point3dList;
        clear(): void;
        get(index: number): number[];
        //insert()
        removeAt(index: number): void;
        setAllX(value: number): void;
        setAllY(value: number): void;
        setAllZ(value: number): void;
        transform(xform: any): void; //TODO
    }

    class Sphere {
        center: number[];
        diameter: number;
        isValid: boolean;

        constructor(center:number[], radius:number)
    }
}