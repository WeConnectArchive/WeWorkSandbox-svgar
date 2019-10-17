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

    public styles: {
        to: (styles: SvgarStyle[] ) => UpdateSvgarSlabContext,
        add: (styles: SvgarStyle | SvgarStyle[] ) => UpdateSvgarSlabContext,
        remove: (test: (style: SvgarStyle) => boolean) => UpdateSvgarSlabContext,
    }

    public geometry: {
        to: (paths: SvgarPath[] ) => UpdateSvgarSlabContext,
        add: (paths: SvgarPath | SvgarPath[] ) => UpdateSvgarSlabContext,
        remove: (test: (path: SvgarPath) => boolean) => UpdateSvgarSlabContext,
    }

    public clipPath: {
        to: (clip: SvgarSlab) => UpdateSvgarSlabContext,
    }

    public mask: {
        to: (mask: SvgarSlab) => UpdateSvgarSlabContext,
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

        this.styles = {
            to: this.updateStylesTo.bind(this),
            add: this.updateStylesAdd.bind(this),
            remove: this.updateStylesRemove.bind(this)
        }

        this.geometry = {
            to: this.updateGeometryTo.bind(this),
            add: this.updateGeometryAdd.bind(this),
            remove: this.updateGeometryRemove.bind(this)
        }

        this.clipPath = { to: this.updateClipPathTo.bind(this) };
        this.mask = { to: this.updateMaskTo.bind(this) };

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

    private updateStylesTo(styles: SvgarStyle[] ): UpdateSvgarSlabContext {
        this.slab.setAllStyles(styles);
        this.slab.flag("style");

        return this;
    }

    private updateStylesAdd(styles: SvgarStyle | SvgarStyle[] ): UpdateSvgarSlabContext {
        function isSvgarStyle(obj: any): obj is SvgarStyle {
            return 'name' in obj;
        }

        let s: SvgarStyle[] = isSvgarStyle(styles) ? [styles] : styles;

        this.slab.setAllStyles(this.slab.getAllStyles().concat(s));

        this.slab.flag("style");

        return this;
    }

    private updateStylesRemove(test: (style: SvgarStyle) => boolean): UpdateSvgarSlabContext {
        this.slab.setAllStyles(this.slab.getAllStyles().filter(x => !test(x)));
        this.slab.flag("style");

        return this;
    }

    private updateGeometryTo(paths: SvgarPath[] ): UpdateSvgarSlabContext {
        this.slab.setAllGeometry(paths);
        this.slab.flag("geometry");

        return this;
    } 

    private updateGeometryAdd(paths: SvgarPath | SvgarPath[] ): UpdateSvgarSlabContext {
        let p: SvgarPath[] = paths instanceof SvgarPath ? [paths] : paths;

        this.slab.setAllGeometry(this.slab.getAllGeometry().concat(p));

        this.slab.flag("geometry");

        return this;
    }

    private updateGeometryRemove(test: (path: SvgarPath) => boolean): UpdateSvgarSlabContext {
        this.slab.setAllGeometry(this.slab.getAllGeometry().filter(x => !test(x)));

        this.slab.flag("geometry");

        return this;
    }

    private updateClipPathTo(slab: SvgarSlab): UpdateSvgarSlabContext {
        this.slab.clipWith(slab);

        this.slab.flag("clipPath");

        return this;
    }

    private updateMaskTo(slab: SvgarSlab): UpdateSvgarSlabContext {
        this.slab.maskWith(slab);

        this.slab.flag("mask");

        return this;
    }
}

function updateSvgarPath(path: SvgarPath): UpdateSvgarPathContext {
    return new UpdateSvgarPathContext(path);
}

class UpdateSvgarPathContext {

    private path: SvgarPath;

    public id: {
        to: (id: string) => UpdateSvgarPathContext,
    }

    public tag: {
        to: (tag: string) => UpdateSvgarPathContext,
    }

    public elevation: {
        to: (elevation: number) => UpdateSvgarPathContext,
    }

    public coordinates: {
        to: (coordinates: number[]) => UpdateSvgarPathContext
    }

    constructor(path: SvgarPath) {
        this.path = path;

        this.id = { to: this.updateIdTo.bind(this) }
        this.tag = { to: this.updateTagTo.bind(this) }
        this.elevation = { to: this.updateElevationTo.bind(this) }
        this.coordinates = { to: this.updateCoordinatesTo.bind(this) }
    }

    private updateIdTo(id: string): UpdateSvgarPathContext {
        this.path.newId(id);
        return this;
    }

    private updateTagTo(tag: string): UpdateSvgarPathContext {
        this.path.setTag(tag);
        return this;
    }

    private updateElevationTo(elevation: number): UpdateSvgarPathContext {
        this.path.setElevation(elevation);
        return this;
    }

    private updateCoordinatesTo(coordinates: number[] ): UpdateSvgarPathContext {
        if(coordinates.length % 8 != 0) {
            throw new Error("Coordinate array total must be evenly divisible by 8.");
        }

        this.path.setCoordinates(coordinates);
        this.path.segments = coordinates.length / 8;

        this.path.flag("geometry");

        return this;
    }
}