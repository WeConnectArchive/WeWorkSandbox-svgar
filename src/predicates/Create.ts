import SvgarCube from './../models/SvgarCube';
import SvgarSlab from './../models/SvgarSlab';
import SvgarPath from './../models/SvgarPath';
import SvgarState from './../models/SvgarState';
import SvgarStyle from './../models/SvgarStyle';

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
        this.camera = [ xMin, yMin, xMax, yMax ];
        return this;
    }

}

function createSvgarSlab(name: string): CreateSvgarSlabContext {
    return new CreateSvgarSlabContext(name);
}

class CreateSvgarSlabContext {

    public then: {
        build: () => SvgarSlab,
    }

    private name: string;
    private id: string | undefined;
    private elevation: number | undefined;
    private states: SvgarState[] | undefined;
    private styles: SvgarStyle[] | undefined;
    private localStyle: SvgarStyle | undefined;
    private clip: SvgarSlab | undefined;
    private mask: SvgarSlab | undefined;

    constructor(name: string) {
        this.then = { build: this.build.bind(this) }

        this.name = name;
    }

    private build(): SvgarSlab {
        let slab = new SvgarSlab(this.name);

        if(this.id) slab.newId(this.id);
        if(this.elevation) slab.setElevation(this.elevation);
        if(this.states) slab.setAllStates(this.states);
        if(this.styles) slab.setAllStyles(this.styles);
        if(this.localStyle) slab.setLocalStyle(this.localStyle);
        if(this.clip) slab.clipWith(this.clip);
        if(this.mask) slab.maskWith(this.mask);

        return slab;
    }

    public withId(id: string): CreateSvgarSlabContext {
        this.id = id;
        return this;
    }

    public withElevation(elevation: number): CreateSvgarSlabContext {
        this.elevation = elevation;
        return this;
    }

    public withStates(states: SvgarState[]): CreateSvgarSlabContext {
        this.states = states;
        return this;
    }

    public withStyles(styles: SvgarStyle[]): CreateSvgarSlabContext {
        this.styles = styles;
        return this;
    }

    public withLocalStyle(style: SvgarStyle): CreateSvgarSlabContext {
        this.localStyle = style;
        return this;
    }

    public withClipPath(clipPath: SvgarSlab): CreateSvgarSlabContext {
        this.clip = clipPath;
        return this;
    }

    public withMask(mask: SvgarSlab): CreateSvgarSlabContext {
        this.mask = mask;
        return this;
    }

}

class CreateSvgarPathContext {

    constructor() {

    }

}