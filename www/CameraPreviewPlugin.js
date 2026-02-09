/*
 * Community Cordova Camera Preview Plugin
 * Licensed under Apache 2.0 License
 */

var PLUGIN_NAME = 'CameraPreviewPlugin';

function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

var CameraPreviewPlugin = {
    // Camera Direction Constants
    CAMERA_DIRECTION: {
        BACK: 'back',
        FRONT: 'front'
    },

    // Focus Mode Constants
    FOCUS_MODE: {
        FIXED: 'fixed',
        AUTO: 'auto',
        CONTINUOUS: 'continuous',
        CONTINUOUS_PICTURE: 'continuous-picture',
        CONTINUOUS_VIDEO: 'continuous-video',
        EDOF: 'edof',
        INFINITY: 'infinity',
        MACRO: 'macro'
    },

    // Exposure Mode Constants
    EXPOSURE_MODE: {
        LOCK: 'lock',
        AUTO: 'auto',
        CONTINUOUS: 'continuous',
        CUSTOM: 'custom'
    },

    // White Balance Mode Constants
    WHITE_BALANCE_MODE: {
        LOCK: 'lock',
        AUTO: 'auto',
        CONTINUOUS: 'continuous',
        INCANDESCENT: 'incandescent',
        CLOUDY_DAYLIGHT: 'cloudy-daylight',
        DAYLIGHT: 'daylight',
        FLUORESCENT: 'fluorescent',
        SHADE: 'shade',
        TWILIGHT: 'twilight',
        WARM_FLUORESCENT: 'warm-fluorescent'
    },

    // Flash Mode Constants
    FLASH_MODE: {
        OFF: 'off',
        ON: 'on',
        AUTO: 'auto',
        RED_EYE: 'red-eye',
        TORCH: 'torch'
    },

    // Color Effect Constants
    COLOR_EFFECT: {
        AQUA: 'aqua',
        BLACKBOARD: 'blackboard',
        MONO: 'mono',
        NEGATIVE: 'negative',
        NONE: 'none',
        POSTERIZE: 'posterize',
        SEPIA: 'sepia',
        SOLARIZE: 'solarize',
        WHITEBOARD: 'whiteboard'
    },

    /**
     * Start the camera preview
     * @param {Object} options - Camera options
     * @returns {Promise<void>}
     */
    startCamera: function(options) {
        return new Promise(function(resolve, reject) {
            if (!options) {
                options = {};
            }

            options.x = options.x || 0;
            options.y = options.y || 0;
            options.width = options.width || window.screen.width;
            options.height = options.height || window.screen.height;
            options.camera = options.camera || CameraPreviewPlugin.CAMERA_DIRECTION.FRONT;

            if (typeof(options.tapPhoto) === 'undefined') {
                options.tapPhoto = true;
            }
            if (typeof(options.tapFocus) === 'undefined') {
                options.tapFocus = false;
            }

            options.previewDrag = options.previewDrag || false;
            options.toBack = options.toBack || false;

            if (typeof(options.alpha) === 'undefined') {
                options.alpha = 1;
            }

            options.disableExifHeaderStripping = options.disableExifHeaderStripping || false;
            options.storeToFile = options.storeToFile || false;

            cordova.exec(resolve, reject, PLUGIN_NAME, 'startCamera', [
                options.x,
                options.y,
                options.width,
                options.height,
                options.camera,
                options.tapPhoto,
                options.previewDrag,
                options.toBack,
                options.alpha,
                options.tapFocus,
                options.disableExifHeaderStripping,
                options.storeToFile
            ]);
        });
    },

    /**
     * Stop the camera preview
     * @returns {Promise<void>}
     */
    stopCamera: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'stopCamera', []);
        });
    },

    /**
     * Switch between front and back camera
     * @returns {Promise<void>}
     */
    switchCamera: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'switchCamera', []);
        });
    },

    /**
     * Hide the camera preview
     * @returns {Promise<void>}
     */
    hide: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'hideCamera', []);
        });
    },

    /**
     * Show the camera preview
     * @returns {Promise<void>}
     */
    show: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'showCamera', []);
        });
    },

    /**
     * Take a snapshot (lower quality, faster)
     * @param {Object} options - Snapshot options
     * @returns {Promise<string>} Base64 encoded image
     */
    takeSnapshot: function(options) {
        return new Promise(function(resolve, reject) {
            if (!options) {
                options = {};
            }
            if (!options.quality || options.quality > 100 || options.quality < 0) {
                options.quality = 85;
            }
            cordova.exec(resolve, reject, PLUGIN_NAME, 'takeSnapshot', [options.quality]);
        });
    },

    /**
     * Take a picture (full quality)
     * @param {Object} options - Picture options
     * @returns {Promise<string>} Base64 encoded image
     */
    takePicture: function(options) {
        return new Promise(function(resolve, reject) {
            if (!options) {
                options = {};
            }
            options.width = options.width || 0;
            options.height = options.height || 0;
            if (!options.quality || options.quality > 100 || options.quality < 0) {
                options.quality = 85;
            }
            cordova.exec(resolve, reject, PLUGIN_NAME, 'takePicture', [options.width, options.height, options.quality]);
        });
    },

    /**
     * Set the color effect
     * @param {string} effect - Color effect
     * @returns {Promise<void>}
     */
    setColorEffect: function(effect) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setColorEffect', [effect]);
        });
    },

    /**
     * Set the zoom level
     * @param {number} zoom - Zoom level
     * @returns {Promise<void>}
     */
    setZoom: function(zoom) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setZoom', [zoom]);
        });
    },

    /**
     * Get the maximum zoom level
     * @returns {Promise<number>}
     */
    getMaxZoom: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getMaxZoom', []);
        });
    },

    /**
     * Get the current zoom level
     * @returns {Promise<number>}
     */
    getZoom: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getZoom', []);
        });
    },

    /**
     * Get the horizontal field of view
     * @returns {Promise<number>}
     */
    getHorizontalFOV: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getHorizontalFOV', []);
        });
    },

    /**
     * Set the preview size
     * @param {Object} dimensions - Width and height
     * @returns {Promise<void>}
     */
    setPreviewSize: function(dimensions) {
        return new Promise(function(resolve, reject) {
            dimensions = dimensions || {};
            dimensions.width = dimensions.width || window.screen.width;
            dimensions.height = dimensions.height || window.screen.height;
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setPreviewSize', [dimensions.width, dimensions.height]);
        });
    },

    /**
     * Get supported picture sizes
     * @returns {Promise<Array>}
     */
    getSupportedPictureSizes: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getSupportedPictureSizes', []);
        });
    },

    /**
     * Get supported flash modes
     * @returns {Promise<Array>}
     */
    getSupportedFlashModes: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getSupportedFlashModes', []);
        });
    },

    /**
     * Get supported color effects
     * @returns {Promise<Array>}
     */
    getSupportedColorEffects: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getSupportedColorEffects', []);
        });
    },

    /**
     * Set the flash mode
     * @param {string} flashMode - Flash mode
     * @returns {Promise<void>}
     */
    setFlashMode: function(flashMode) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setFlashMode', [flashMode]);
        });
    },

    /**
     * Get the current flash mode
     * @returns {Promise<string>}
     */
    getFlashMode: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getFlashMode', []);
        });
    },

    /**
     * Get supported focus modes
     * @returns {Promise<Array>}
     */
    getSupportedFocusModes: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getSupportedFocusModes', []);
        });
    },

    /**
     * Get the current focus mode
     * @returns {Promise<string>}
     */
    getFocusMode: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getFocusMode', []);
        });
    },

    /**
     * Set the focus mode
     * @param {string} focusMode - Focus mode
     * @returns {Promise<void>}
     */
    setFocusMode: function(focusMode) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setFocusMode', [focusMode]);
        });
    },

    /**
     * Tap to focus on a specific point
     * @param {number} xPoint - X coordinate
     * @param {number} yPoint - Y coordinate
     * @returns {Promise<void>}
     */
    tapToFocus: function(xPoint, yPoint) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'tapToFocus', [xPoint, yPoint]);
        });
    },

    /**
     * Get available exposure modes
     * @returns {Promise<Array>}
     */
    getExposureModes: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getExposureModes', []);
        });
    },

    /**
     * Get the current exposure mode
     * @returns {Promise<string>}
     */
    getExposureMode: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getExposureMode', []);
        });
    },

    /**
     * Set the exposure mode
     * @param {string} exposureMode - Exposure mode
     * @returns {Promise<void>}
     */
    setExposureMode: function(exposureMode) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setExposureMode', [exposureMode]);
        });
    },

    /**
     * Get the exposure compensation value
     * @returns {Promise<number>}
     */
    getExposureCompensation: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getExposureCompensation', []);
        });
    },

    /**
     * Set the exposure compensation value
     * @param {number} exposureCompensation - Exposure compensation value
     * @returns {Promise<void>}
     */
    setExposureCompensation: function(exposureCompensation) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setExposureCompensation', [exposureCompensation]);
        });
    },

    /**
     * Get the exposure compensation range
     * @returns {Promise<Object>}
     */
    getExposureCompensationRange: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getExposureCompensationRange', []);
        });
    },

    /**
     * Get supported white balance modes
     * @returns {Promise<Array>}
     */
    getSupportedWhiteBalanceModes: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getSupportedWhiteBalanceModes', []);
        });
    },

    /**
     * Get the current white balance mode
     * @returns {Promise<string>}
     */
    getWhiteBalanceMode: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getWhiteBalanceMode', []);
        });
    },

    /**
     * Set the white balance mode
     * @param {string} whiteBalanceMode - White balance mode
     * @returns {Promise<void>}
     */
    setWhiteBalanceMode: function(whiteBalanceMode) {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'setWhiteBalanceMode', [whiteBalanceMode]);
        });
    },

    /**
     * Get camera characteristics
     * @returns {Promise<Object>}
     */
    getCameraCharacteristics: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'getCameraCharacteristics', []);
        });
    },

    /**
     * Listen for back button press (Android only)
     * @returns {Promise<void>}
     */
    onBackButton: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'onBackButton', []);
        });
    },

    /**
     * Get blob from file URL
     * @param {string} url - File URL
     * @returns {Promise<Blob>}
     */
    getBlob: function(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status !== 0 && (xhr.status < 200 || xhr.status >= 300)) {
                    reject('Local request failed');
                    return;
                }
                var blob = new Blob([xhr.response], { type: 'image/jpeg' });
                resolve(blob);
            };
            xhr.onerror = function() {
                reject('Local request failed');
            };
            xhr.open('GET', url);
            xhr.responseType = 'arraybuffer';
            xhr.send(null);
        });
    },

    /**
     * Start recording video
     * @param {Object} options - Recording options
     * @returns {Promise<void>}
     */
    startRecordVideo: function(options) {
        return new Promise(function(resolve, reject) {
            if (!options) {
                options = {};
            }
            options.width = options.width || 0;
            options.height = options.height || 0;
            if (!options.quality || options.quality > 100 || options.quality < 0) {
                options.quality = 85;
            }
            cordova.exec(resolve, reject, PLUGIN_NAME, 'startRecordVideo', [
                options.cameraDirection,
                options.width,
                options.height,
                options.quality,
                options.withFlash
            ]);
        });
    },

    /**
     * Stop recording video
     * @returns {Promise<string>} Path to recorded video
     */
    stopRecordVideo: function() {
        return new Promise(function(resolve, reject) {
            cordova.exec(resolve, reject, PLUGIN_NAME, 'stopRecordVideo', []);
        });
    }
};

module.exports = CameraPreviewPlugin;
