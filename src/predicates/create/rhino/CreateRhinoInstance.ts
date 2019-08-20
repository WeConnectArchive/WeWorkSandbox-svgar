import rhino3dm, { RhinoModule } from "rhino3dm";

export class CreateRhinoInstance {

    private _rhino!: RhinoModule;
    get Rhino(): RhinoModule {
        if (this._rhino) {
            return this._rhino
        }
        else {
            rhino3dm().then(r => {
                this._rhino = r;
                return this._rhino;
            });
        }
        return this._rhino;
    }

    constructor() {
        rhino3dm().then(r => {
            this._rhino = r;
        })
    }
}