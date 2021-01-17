import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Logger } from "@babylonjs/core";

import { TrailParticlesController } from "./trailParticlesController";
import { AudioController } from "./audioController";
import { PlayerInput } from "./inputController";
import { Player } from "./playerController";

class App {
    // General Entire Application
    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;

    //Game State Related
    private _trailvfx: TrailParticlesController;
    private _audioController: AudioController;
    private _input: PlayerInput;
    private _player: Player;

    constructor() {
        this._canvas = this._createCanvas();
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
        camera.attachControl(this._canvas, true);

        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });
        // run the main render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        this._main();
    }

    private async _main(): Promise<void> {
        await this._goToStart();
        //await this._initializeGameAsync(this._scene);
        //await this._audioController.loadAsync();
        //this._trailvfx.playTrailEffect();
    }

    private async _goToStart(): Promise<void> {
        await this._scene.createDefaultXRExperienceAsync({});
        //this._trailvfx = new TrailParticlesController(this._scene);
        this._audioController = new AudioController(this._scene);
        this._input = new PlayerInput(this._scene);

        //Create cube
        var box = MeshBuilder.CreateBox("box", {});
    }

    //init game
    private async _initializeGameAsync(scene): Promise<void> {
        this._player = new Player(this._scene, this._input, this._audioController, this._trailvfx);
        this._player.beforeRenderUpdate();
    }

    //set up the canvas
    private _createCanvas(): HTMLCanvasElement {

        //Commented out for development
        document.documentElement.style["overflow"] = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        //create the canvas html element and attach it to the webpage
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
        this._canvas.id = "gameCanvas";
        document.body.appendChild(this._canvas);

        return this._canvas;
    }
}
new App();