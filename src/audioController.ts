import { Scene, Vector3, Ray, TransformNode, Mesh, Color3, Color4, UniversalCamera, Quaternion, AnimationGroup, ExecuteCodeAction, ActionManager, ParticleSystem, Texture, SphereParticleEmitter, Sound, Observable, ShadowGenerator, Logger, Particle } from "@babylonjs/core";

export class AudioController {
    public scene: Scene;

    private _peraVoice: Sound[];
    private _clipIndex: number;

    constructor(scene: Scene) {
        this.scene = scene;
        this._clipIndex = 0;
    }

    public async loadAsync() {
        var peraVoice1;
        var peraVoice2;
        var peraVoice3;

        //TODO find a way to use for loop
        var peraVoice1Async = new Promise<Sound>((resolve) => {
            const sound = new Sound("Pera_Teleport1", "./sounds/voiceover/Test_Pera_Teleport1.mp3", this.scene, () => { resolve(sound) });
            peraVoice1 = sound;
        });

        var peraVoice2Async = new Promise<Sound>((resolve) => {
            const sound = new Sound("Pera_Teleport2", "./sounds/voiceover/Test_Pera_Teleport2.mp3", this.scene, () => { resolve(sound) });
            peraVoice2 = sound;
        });

        var peraVoice3Async = new Promise<Sound>((resolve) => {
            const sound = new Sound("Pera_Teleport3", "./sounds/voiceover/Test_Pera_Teleport3.mp3", this.scene, () => { resolve(sound) });
            peraVoice3 = sound;
        });

        this._peraVoice = []; 

        peraVoice1 = await peraVoice1Async;
        this._peraVoice.push(peraVoice1);
        peraVoice2 = await peraVoice2Async;
        this._peraVoice.push(peraVoice2);
        peraVoice3 = await peraVoice3Async;
        this._peraVoice.push(peraVoice3);

        for (var i = 0; i < this._peraVoice.length; i++) {
            Logger.Log("sound name is " + this._peraVoice[i].name);
        }
    }

    public increaseClipIndex(): void {
        this._clipIndex++;
    }

    public async PlaySound() {
        if (this._clipIndex >= this._peraVoice.length) return;
        Logger.Log("sound is ready? " + this._peraVoice[this._clipIndex].isReady());
        this._peraVoice[this._clipIndex].play();
    }

    public isPlayingAudio(): boolean{
        if (this._clipIndex >= this._peraVoice.length - 1) return;
        return this._peraVoice[this._clipIndex].isPlaying;
    }
}



