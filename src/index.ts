import Cube from './models/SvgarCube';
import Slab from './models/SvgarSlab';
import Path from './models/SvgarPath';
import CircleBuilder from './builders/CircleBuilder';
import PolylineBuilder from './builders/PolylineBuilder';
import CurveBuilder from './builders/CurveBuilder';

const Builder = {
    Circle: CircleBuilder,
    Polyline: PolylineBuilder,
    Curve: CurveBuilder
}

// Default model and builder exports
export default {
    Cube,
    Slab,
    Path,
    Builder
}

// Individual predicate exports
import Create from './predicates/Create';
import Update from './predicates/Update';
import Locate from './predicates/Locate';

export { Create, Update, Locate }