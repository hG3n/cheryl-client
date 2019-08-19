import {Levels} from './Volume';

export interface Equalizer {
    channel: {
        name: string,
        property: string,
        position: number
    };

    levels: Levels;
}


