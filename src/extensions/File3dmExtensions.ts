import { File3dm } from 'rhino3dm';
import { CreateRhinoModelContext } from '../predicates/create/rhino/CreateRhinoModelContext';

declare module 'rhino3dm' {
    interface File3dm {
        And(): CreateRhinoModelContext;
    }
}

File3dm.prototype.And = function() {
    return new CreateRhinoModelContext(this);
};