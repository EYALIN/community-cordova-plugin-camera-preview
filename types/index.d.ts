/*
 * Community Cordova Camera Preview Plugin
 * TypeScript Declarations
 */

export interface CameraPreviewStartOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    camera?: 'front' | 'back';
    tapPhoto?: boolean;
    tapFocus?: boolean;
    previewDrag?: boolean;
    toBack?: boolean;
    alpha?: number;
    disableExifHeaderStripping?: boolean;
    storeToFile?: boolean;
}

export interface CameraPreviewPictureOptions {
    width?: number;
    height?: number;
    quality?: number;
}

export interface CameraPreviewSnapshotOptions {
    quality?: number;
}

export interface CameraPreviewDimensions {
    width?: number;
    height?: number;
}

export interface CameraPreviewRecordOptions {
    cameraDirection?: 'front' | 'back';
    width?: number;
    height?: number;
    quality?: number;
    withFlash?: boolean;
}

export interface CameraPreviewPictureSize {
    width: number;
    height: number;
}

export interface CameraPreviewExposureRange {
    min: number;
    max: number;
}

export default class CameraPreviewManager {
    // Constants
    static CAMERA_DIRECTION: {
        BACK: 'back';
        FRONT: 'front';
    };

    static FOCUS_MODE: {
        FIXED: 'fixed';
        AUTO: 'auto';
        CONTINUOUS: 'continuous';
        CONTINUOUS_PICTURE: 'continuous-picture';
        CONTINUOUS_VIDEO: 'continuous-video';
        EDOF: 'edof';
        INFINITY: 'infinity';
        MACRO: 'macro';
    };

    static EXPOSURE_MODE: {
        LOCK: 'lock';
        AUTO: 'auto';
        CONTINUOUS: 'continuous';
        CUSTOM: 'custom';
    };

    static WHITE_BALANCE_MODE: {
        LOCK: 'lock';
        AUTO: 'auto';
        CONTINUOUS: 'continuous';
        INCANDESCENT: 'incandescent';
        CLOUDY_DAYLIGHT: 'cloudy-daylight';
        DAYLIGHT: 'daylight';
        FLUORESCENT: 'fluorescent';
        SHADE: 'shade';
        TWILIGHT: 'twilight';
        WARM_FLUORESCENT: 'warm-fluorescent';
    };

    static FLASH_MODE: {
        OFF: 'off';
        ON: 'on';
        AUTO: 'auto';
        RED_EYE: 'red-eye';
        TORCH: 'torch';
    };

    static COLOR_EFFECT: {
        AQUA: 'aqua';
        BLACKBOARD: 'blackboard';
        MONO: 'mono';
        NEGATIVE: 'negative';
        NONE: 'none';
        POSTERIZE: 'posterize';
        SEPIA: 'sepia';
        SOLARIZE: 'solarize';
        WHITEBOARD: 'whiteboard';
    };

    // Camera control methods
    startCamera(options?: CameraPreviewStartOptions): Promise<void>;
    stopCamera(): Promise<void>;
    switchCamera(): Promise<void>;
    hide(): Promise<void>;
    show(): Promise<void>;

    // Capture methods
    takeSnapshot(options?: CameraPreviewSnapshotOptions): Promise<string>;
    takePicture(options?: CameraPreviewPictureOptions): Promise<string>;

    // Video recording
    startRecordVideo(options?: CameraPreviewRecordOptions): Promise<void>;
    stopRecordVideo(): Promise<string>;

    // Zoom controls
    setZoom(zoom: number): Promise<void>;
    getZoom(): Promise<number>;
    getMaxZoom(): Promise<number>;

    // Flash controls
    setFlashMode(flashMode: string): Promise<void>;
    getFlashMode(): Promise<string>;
    getSupportedFlashModes(): Promise<string[]>;

    // Focus controls
    setFocusMode(focusMode: string): Promise<void>;
    getFocusMode(): Promise<string>;
    getSupportedFocusModes(): Promise<string[]>;
    tapToFocus(xPoint: number, yPoint: number): Promise<void>;

    // Exposure controls
    setExposureMode(exposureMode: string): Promise<void>;
    getExposureMode(): Promise<string>;
    getExposureModes(): Promise<string[]>;
    setExposureCompensation(exposureCompensation: number): Promise<void>;
    getExposureCompensation(): Promise<number>;
    getExposureCompensationRange(): Promise<CameraPreviewExposureRange>;

    // White balance controls
    setWhiteBalanceMode(whiteBalanceMode: string): Promise<void>;
    getWhiteBalanceMode(): Promise<string>;
    getSupportedWhiteBalanceModes(): Promise<string[]>;

    // Color effects
    setColorEffect(effect: string): Promise<void>;
    getSupportedColorEffects(): Promise<string[]>;

    // Preview size
    setPreviewSize(dimensions: CameraPreviewDimensions): Promise<void>;
    getSupportedPictureSizes(): Promise<CameraPreviewPictureSize[]>;

    // Other
    getHorizontalFOV(): Promise<number>;
    getCameraCharacteristics(): Promise<any>;
    onBackButton(): Promise<void>;
    getBlob(url: string): Promise<Blob>;
}
