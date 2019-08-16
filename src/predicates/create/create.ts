import { CreateRhinoContext } from './rhino/CreateRhinoContext';
import { CreateSvgarContext } from './svgar/CreateSvgarContext';

export default {
    Rhino: Rhino(),
    Svgar: Svgar(),
}

function Rhino() : CreateRhinoContext {
    return new CreateRhinoContext();
}

function Svgar() : CreateSvgarContext {
    return new CreateSvgarContext();
}

