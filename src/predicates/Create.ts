import SvgarCube from './../models/SvgarCube';
import SvgarSlab from './../models/SvgarSlab';
import SvgarPath from './../models/SvgarPath';

export default function Create(): CreateContext {
    const context: CreateContext = {
        svgar: {
            cube: createSvgarCube,
            slab: createSvgarSlab,
            path: new CreateSvgarPathContext(),
        }
    }

    return context;
}

interface CreateContext {
    svgar: {
        cube: (name: string) => CreateSvgarCubeContext,
        slab: (name: string) => CreateSvgarSlabContext,
        path: CreateSvgarPathContext,
    }
}

function createSvgarCube(name: string): CreateSvgarCubeContext {
    return new CreateSvgarCubeContext(name);
}

class CreateSvgarCubeContext {

    public then: {
        build: () => SvgarCube,
    }

    private name: string;
    private slabs: SvgarSlab[] | undefined;
    private camera: number[] | undefined;

    constructor(name: string) {
        this.then = { build: this.build.bind(this) }

        this.name = name;
    }

    private build(): SvgarCube {
        let cube = new SvgarCube(this.name);

        cube.slabs = this.slabs ?? [];
        cube.scope = {
            minimum: [this.camera?.[0] ?? 0, this.camera?.[1] ?? 0],
            maximum: [this.camera?.[2] ?? 1, this.camera?.[3] ?? 1]
        }

        return cube;
    }

    public withSlabs(slabs: SvgarSlab[]): CreateSvgarCubeContext {
        this.slabs = slabs;

        return this;
    }

    public withCameraExtents(xMin: number, yMin: number, xMax: number, yMax: number): CreateSvgarCubeContext {
        this.camera = [
            xMin,
            yMin,
            xMax,
            yMax
        ]
        
        return this;
    }

}

function createSvgarSlab(name: string): CreateSvgarSlabContext {
    return new CreateSvgarSlabContext(name);
}

class CreateSvgarSlabContext {

    constructor(name: string) {

    }

}

class CreateSvgarPathContext {

    constructor() {

    }

}