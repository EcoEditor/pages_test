import { Scene, Vector3, Ray, TransformNode, Mesh, Color3, Color4, UniversalCamera, Quaternion, AnimationGroup, ExecuteCodeAction, ActionManager, ParticleSystem, Texture, SphereParticleEmitter, Sound, Observable, ShadowGenerator, Logger } from "@babylonjs/core";
import { PlayerInput } from "./inputController";
import { AudioController } from "./audioController";
import { TrailParticlesController } from "./trailParticlesController";

export class Player {
    public scene: Scene;
    private _input: PlayerInput;
    private _audio: AudioController;
    private _particles: TrailParticlesController;

    private _startGame: boolean = false;
    private _audioIsPlaying: boolean = false;
    private _canLoadParticles: boolean = false;

    private _startTime: number;
    private _audioStartPlayTime: number;

    constructor(scene: Scene, input?: PlayerInput, audio?: AudioController, particles?:TrailParticlesController) {
        this.scene = scene;
        this._input = input;
        this._audio = audio;
        this._particles = particles;
        this._startTime = Date.now();
        Logger.Log("start time is " + this._startTime);
    }

    private async _updateFromControler() {
        if (this._input.didStartGame) {
            if (!this._audioIsPlaying) {
                this._canLoadParticles = false;
                this._particles.stopParticles();
                this._audioStartPlayTime = Date.now();
                Logger.Log("Play audio once, at time" + this._audioStartPlayTime);
                await this._audio.PlaySound();
                this._audioIsPlaying = true;
            }

            if (this._audioIsPlaying && !this._canLoadParticles) {
                var deltaTime = (Date.now() - this._audioStartPlayTime) / 1000.0;
                // give some time for the audio to load and play before checking is isPlaying()
                if (deltaTime >= 10) {
                    if (this._audio.isPlayingAudio()) return;
                    this._particles.playTrailEffect();
                    this._canLoadParticles = true;
                    this._audio.increaseClipIndex();
                    this._input.didStartGame = false;
                    this._audioIsPlaying = false;
                    return;
                }
            } 
        }
    }

    // Game updates
    public beforeRenderUpdate(): void {
        this.scene.registerBeforeRender(() => {
            this._updateFromControler();
        })
    }
}