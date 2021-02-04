export interface CropperPosition {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface Dimensions {
    width: number;
    height: number;
}

export interface ImageCroppedEvent {
    base64?: string | null;
    file?: Blob | null;
    width: number;
    height: number;
    cropperPosition: CropperPosition;
    imagePosition: CropperPosition;
}

export interface MoveStart {
    active: boolean;
    type: string | null;
    position: string | null;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    clientX: number;
    clientY: number;
}
