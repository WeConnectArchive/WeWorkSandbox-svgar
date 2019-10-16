import SvgarCube from "./../models/SvgarCube";
import SvgarSlab from "./../models/SvgarSlab";
import SvgarPath from "./../models/SvgarPath";

export default function Update(): UpdateContext {
    const context: UpdateContext = {
        svgar: {
            cube: updateSvgarCube,
            slab: updateSvgarSlab,
            path: updateSvgarPath,
        }
    }

    return context;
}

interface UpdateContext {
    svgar: {
        cube: (cube: SvgarCube) => UpdateSvgarCubeContext,
        slab: (slab: SvgarSlab) => UpdateSvgarSlabContext,
        path: (path: SvgarPath) => UpdateSvgarPathContext,
    }
}

function updateSvgarCube(cube: SvgarCube): UpdateSvgarCubeContext {
    return new UpdateSvgarCubeContext(cube);
}

class UpdateSvgarCubeContext {

    private cube: SvgarCube;

    public camera: {
        extentsTo: (xMin: number, yMin: number, xMax: number, yMax: number) => UpdateSvgarCubeContext,
        anchorTo: (x: number, y: number) => UpdateSvgarCubeContext,
        withZoom: (amount: number) => UpdateSvgarCubeContext,
        withPan: (xPan: number, yPan: number) => UpdateSvgarCubeContext,
    };

    constructor(cube: SvgarCube) {
        this.cube = cube;

        this.camera = {
            extentsTo: this.updateCameraExtentsTo.bind(this),
            anchorTo: this.updateCameraAnchorTo.bind(this),
            withZoom: this.updateCameraWithZoom.bind(this),
            withPan: this.updateCameraWithPan.bind(this)
        }
    }

    private updateCameraExtentsTo(xMin: number, yMin: number, xMax: number, yMax: number): UpdateSvgarCubeContext {

        return this;
    }

    private updateCameraAnchorTo(x: number, y: number): UpdateSvgarCubeContext {

        return this;
    }

    private updateCameraWithZoom(amount: number): UpdateSvgarCubeContext {

        return this;
    }

    private updateCameraWithPan(xPan: number, yPan: number): UpdateSvgarCubeContext {

        return this;
    }
}

function updateSvgarSlab(slab: SvgarSlab): UpdateSvgarSlabContext {
    return new UpdateSvgarSlabContext(slab);
}

class UpdateSvgarSlabContext {

    private slab: SvgarSlab;

    public state: {
        to: (state: string) => UpdateSvgarSlabContext,
    };

    constructor(slab: SvgarSlab) {
        this.slab = slab;

        this.state = { to: this.updateStateTo.bind(this) };
    }

    private updateStateTo(state: string): UpdateSvgarSlabContext {
        this.slab.flag("state");
        this.slab.setCurrentState(state);

        return this;
    }
}

function updateSvgarPath(path: SvgarPath): UpdateSvgarPathContext {
    return new UpdateSvgarPathContext(path);
}

class UpdateSvgarPathContext {

    private path: SvgarPath;

    constructor(path: SvgarPath) {
        this.path = path;
    }
}