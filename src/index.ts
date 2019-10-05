import Cube from './models/SvgarCube';
import Slab from './models/SvgarSlab';
import Path from './models/SvgarPath';
import CircleBuilder from './builders/CircleBuilder';
import PolylineBuilder from './builders/PolylineBuilder';

const Builder = {
    Circle: CircleBuilder,
    Polyline: PolylineBuilder
}

// Default model and idiom exports
export default {
    Cube,
    Slab,
    Path,
    Builder
}

// Individual schema model exports
export * from './models/SvgarCube';