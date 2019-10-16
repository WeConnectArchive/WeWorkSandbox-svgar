import SvgarCube from "./../models/SvgarCube";
import SvgarSlab from "./../models/SvgarSlab";
import SvgarPath from "./../models/SvgarPath";
import SvgarState from "./../models/SvgarState";
import SvgarStyle from "./../models/SvgarStyle";

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
    }

    public slabs: {
        to: (slabs: SvgarSlab[]) => UpdateSvgarCubeContext,
        add: (slabs: SvgarSlab | SvgarSlab[]) => UpdateSvgarCubeContext,
        remove: (test: (slab: SvgarSlab) => boolean) => UpdateSvgarCubeContext
    }

    constructor(cube: SvgarCube) {
        this.cube = cube;

        this.camera = {
            extentsTo: this.updateCameraExtentsTo.bind(this),
            anchorTo: this.updateCameraAnchorTo.bind(this),
            withZoom: this.updateCameraWithZoom.bind(this),
            withPan: this.updateCameraWithPan.bind(this),
        }

        this.slabs = {
            to: this.updateSlabsTo.bind(this),
            add: this.updateSlabsAdd.bind(this),
            remove: this.updateSlabsRemove.bind(this),
        }
    }

    private updateCameraExtentsTo(xMin: number, yMin: number, xMax: number, yMax: number): UpdateSvgarCubeContext {
        this.cube.scope = {
            maximum: [xMax, yMax],
            minimum: [xMin, yMin]
        }

        this.cube.flag("root");

        return this;
    }

    private updateCameraAnchorTo(x: number, y: number): UpdateSvgarCubeContext {
        const minX = this.cube.scope.minimum[0];
        const minY = this.cube.scope.minimum[1];
        const maxX = this.cube.scope.maximum[0];
        const maxY = this.cube.scope.maximum[1];

        const aX = ( maxX + minX ) / 2;
        const aY = ( maxY + minY ) / 2;

        const dX = x - aX;
        const dY = y - aY;

        this.cube.scope = {
            minimum: [minX + dX, minY + dY],
            maximum: [maxX + dX, maxY + dY]
        }

        this.cube.flag("root");

        return this;
    }

    private updateCameraWithZoom(amount: number): UpdateSvgarCubeContext {
        const minX = this.cube.scope.minimum[0];
        const minY = this.cube.scope.minimum[1];
        const maxX = this.cube.scope.maximum[0];
        const maxY = this.cube.scope.maximum[1];

        if (amount > 0) {
            if (maxX - minX < 2 * amount || maxY - minY < 2 * amount) {
                throw new Error("Cannot zoom beyond a zero-width camera.");
            }
        }

        this.cube.scope = {
            minimum: [minX + amount, minY + amount],
            maximum: [maxX - amount, maxY - amount]
        }

        this.cube.flag("root");

        return this;
    }

    private updateCameraWithPan(xPan: number, yPan: number): UpdateSvgarCubeContext {
        const minX = this.cube.scope.minimum[0];
        const minY = this.cube.scope.minimum[1];
        const maxX = this.cube.scope.maximum[0];
        const maxY = this.cube.scope.maximum[1];

        this.cube.scope = {
            minimum: [minX + xPan, minY + yPan],
            maximum: [maxX + xPan, maxY + yPan]
        }

        this.cube.flag("root");

        return this;
    }

    private updateSlabsTo(slabs: SvgarSlab[]): UpdateSvgarCubeContext {
        this.cube.slabs = slabs;

        return this;
    }

    private updateSlabsAdd(slabs: SvgarSlab | SvgarSlab[]): UpdateSvgarCubeContext {
        const s: SvgarSlab[] = (slabs instanceof SvgarSlab) ? [slabs] : slabs;

        this.cube.slabs = s;

        return this;
    }

    private updateSlabsRemove(test: (slab: SvgarSlab) => boolean): UpdateSvgarCubeContext {
        this.cube.slabs = this.cube.slabs.filter(x => !test(x));

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
    }

    public states: {
        to: (states: SvgarState[] ) => UpdateSvgarSlabContext,
        add: (states: SvgarState | SvgarState[] ) => UpdateSvgarSlabContext,
        remove: (test: (state: SvgarState) => boolean) => UpdateSvgarSlabContext
    }

    public name: {
        to: (name: string) => UpdateSvgarSlabContext,
    }

    public id: {
        to: (name: string) => UpdateSvgarSlabContext,
    }

    public elevation: {
        to: (elevation: number) => UpdateSvgarSlabContext,
    }

    constructor(slab: SvgarSlab) {
        this.slab = slab;

        this.state = { to: this.updateStateTo.bind(this) };
        this.states = { 
            to: this.updateStatesTo.bind(this),
            add: this.updateStatesAdd.bind(this),
            remove: this.updateStatesRemove.bind(this)
        };

        this.name = { to: this.updateNameTo.bind(this) };
        this.id = { to: this.updateIdTo.bind(this) };
        this.elevation = { to: this.updateElevationTo.bind(this) };
    }

    private updateStateTo(state: string): UpdateSvgarSlabContext {
        this.slab.flag("state");
        this.slab.setCurrentState(state);

        return this;
    }

    private updateNameTo(name: string): UpdateSvgarSlabContext {
        this.slab.flag("style");
        this.slab.setName(name);

        return this;
    }

    private updateIdTo(id: string): UpdateSvgarSlabContext {
        this.slab.flag("style");
        this.slab.newId(id);

        return this;
    }

    private updateElevationTo(elevation: number): UpdateSvgarSlabContext {
        this.slab.setElevation(elevation);

        return this;
    }

    private updateStatesTo(states: SvgarState[] ): UpdateSvgarSlabContext {
       this.slab.setAllStates(states);
       this.slab.flag("state");

       return this;
    }

    private updateStatesAdd(states: SvgarState | SvgarState[] ): UpdateSvgarSlabContext {
        function isSvgarState(obj: any): obj is SvgarState {
            return 'name' in obj;
        } 
 
        let s: SvgarState[] = isSvgarState(states) ? [states] : states;

        s.forEach(x => {
            this.slab.setAllStates(this.slab.getAllStates().concat(s));
        });

        this.slab.flag("state");

        return this;
    }

    private updateStatesRemove(test: (state: SvgarState) => boolean): UpdateSvgarSlabContext {
        this.slab.setAllStates(this.slab.getAllStates().filter(x => !test(x)));
        this.slab.flag("state");

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