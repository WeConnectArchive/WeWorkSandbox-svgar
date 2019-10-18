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

    constructor(name: string) {
        this.then = { build: this.build.bind(this) }

        this.name = name;
    }

    private build(): SvgarCube {
        let cube = new SvgarCube(this.name);

        return cube;
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