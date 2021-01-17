import { Scene, ActionManager, ExecuteCodeAction, Observer, Scalar, Logger } from '@babylonjs/core';

export class PlayerInput {
    public inputMap: any;

    private _scene: Scene;

    public didStartGame: boolean;
    public didTeleport: boolean;

    constructor(scene: Scene) {
        this._scene = scene;
        this._scene.actionManager = new ActionManager(this._scene);
        this.inputMap = {};
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        this.didStartGame = false;
        this.didTeleport = false;

        //add to the scene an observable that calls updateFromKeyboard before rendering
        scene.onBeforeRenderObservable.add(() => {
            this._updateFromKeyboard();
        });
    }

    private _updateFromKeyboard(): void {
        if ((this.inputMap[" "])) {
            Logger.Log("space key pressed");
            this.didStartGame = true;
        } 

        //TODO apply teleportation behhaviour with this or button click input
        if (this.inputMap["ArrowRight"]) {
            Logger.Log("right arrow is pressed");
            this.didTeleport = true;
        }
    }
}