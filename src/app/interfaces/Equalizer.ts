import {Levels} from './volume';

export interface Equalizer {
    channel: {
        name: string,
        property: string,
        position: number
    };

    levels: Levels;
}


