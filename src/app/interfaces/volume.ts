export interface Levels {
        master: { pct: number , muted: boolean};
        left: { pct: number , muted: boolean};
        right: { pct: number , muted: boolean};
}

export interface VolumeResponse {
    levels: Levels;
}

