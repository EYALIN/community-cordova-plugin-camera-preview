[![npm version](https://badge.fury.io/js/community-cordova-plugin-camera-preview.svg)](https://badge.fury.io/js/community-cordova-plugin-camera-preview)
[![npm downloads](https://img.shields.io/npm/dt/community-cordova-plugin-camera-preview.svg)](https://www.npmjs.com/package/community-cordova-plugin-camera-preview)


# community-cordova-plugin-camera-preview

I dedicate a considerable amount of my free time to developing and maintaining many cordova plugins for the community ([See the list with all my maintained plugins][community_plugins]).
To help ensure this plugin is kept updated,
new features are added and bugfixes are implemented quickly,
please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance.
Please consider donating if you're using this plugin in an app that makes you money,
or if you're asking for new features or priority bug fixes. Thank you!

[![](https://img.shields.io/static/v1?label=Sponsor%20Me&style=for-the-badge&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/eyalin)


---

# Community Cordova Plugin Camera Preview

A Cordova plugin that allows camera interaction from Javascript and HTML with a camera preview displayed on top of or behind the HTML content.

## Why This Fork?

This is a community-maintained fork of the original [cordova-plugin-camera-preview](https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview). This fork was created to:

- Provide **active maintenance** and timely bug fixes
- Ensure **compatibility** with the latest Cordova, Android, and iOS versions
- Fix permission issues for modern Android SDK versions (API 29+)
- Offer **Promise-based API** for better async/await support
- Include **TypeScript definitions** out of the box

## Credits

This plugin is based on the excellent work of:
- **[cordova-plugin-camera-preview](https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview)** - Original plugin
- **Marcel Barbosa Pinto** ([@mbppower](https://github.com/mbppower)) - Original creator
- **Weston Ganger** ([@westonganger](https://github.com/westonganger)) - Previous maintainer

We are grateful for their foundational work that made this plugin possible.

---

## Features

- Start a camera preview from HTML code
- Take Photos and Snapshots
- Maintain HTML interactivity
- Drag the preview box
- Set camera color effect
- Send the preview box to back of the HTML content
- Set a custom position for the camera preview box
- Set a custom size for the preview box
- Set a custom alpha for the preview box
- Set the focus mode, zoom, color effects, exposure mode, white balance mode and exposure compensation
- Tap to focus
- Record Videos

## Installation

```bash
# Install from npm
cordova plugin add community-cordova-plugin-camera-preview

# Or with Ionic
ionic cordova plugin add community-cordova-plugin-camera-preview

# Or install from GitHub for latest changes
cordova plugin add https://github.com/eyalin/community-cordova-plugin-camera-preview.git
```

### TypeScript Support

This plugin includes TypeScript definitions. You can use them directly:

```typescript
import CameraPreviewManager from 'community-cordova-plugin-camera-preview';

declare var CameraPreviewPlugin: CameraPreviewManager;

// Now use CameraPreviewPlugin with full type support
await CameraPreviewPlugin.startCamera({ camera: 'back' });
const photo = await CameraPreviewPlugin.takePicture({ quality: 85 });
await CameraPreviewPlugin.stopCamera();
```

## Platform Requirements

### iOS

If you are developing for iOS 10+ you must add the following to your config.xml:

```xml
<config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription" overwrite="true">
  <string>Allow the app to use your camera</string>
</config-file>
```

**Note:** It is not possible to use your computer's webcam during testing in the simulator; you must test on a device.

### Android

For Android, the plugin automatically requests the necessary permissions. The `WRITE_EXTERNAL_STORAGE` permission is limited to `maxSdkVersion="28"` to comply with Android's scoped storage requirements.

**Quirk:** When using the plugin for older devices, the camera preview will take focus inside the app once initialized. To prevent the app from closing when a user presses the back button, see the [`onBackButton`](#onbackbutton) method.

---

## API Reference

All methods return Promises for easy async/await usage.

### startCamera(options)

Starts the camera preview instance.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `x` | number | 0 | X position |
| `y` | number | 0 | Y position |
| `width` | number | window.screen.width | Preview width |
| `height` | number | window.screen.height | Preview height |
| `camera` | string | 'front' | Camera direction: 'front' or 'back' |
| `toBack` | boolean | false | Set to true to put preview behind HTML |
| `tapPhoto` | boolean | true | Tap to take photo (only when toBack is true) |
| `tapFocus` | boolean | false | Tap to focus |
| `previewDrag` | boolean | false | Enable dragging preview (only when toBack is true) |
| `storeToFile` | boolean | false | Store captures to file instead of base64 |
| `disableExifHeaderStripping` | boolean | false | Android only - disable automatic rotation |
| `alpha` | number | 1 | Preview transparency (0-1) |

```javascript
await CameraPreviewPlugin.startCamera({
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'back',
  toBack: true,
  tapPhoto: false,
  tapFocus: true,
  previewDrag: false,
  alpha: 1
});
```

When setting `toBack` to true, add this CSS to make the preview visible:

```css
html, body, .ion-app, .ion-content {
  background-color: transparent;
}
```

### stopCamera()

Stops the camera preview instance.

```javascript
await CameraPreviewPlugin.stopCamera();
```

### switchCamera()

Switch between the rear camera and front camera.

```javascript
await CameraPreviewPlugin.switchCamera();
```

### show() / hide()

Show or hide the camera preview.

```javascript
await CameraPreviewPlugin.show();
await CameraPreviewPlugin.hide();
```

### takePicture(options)

Take a full-resolution picture.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | number | 0 | Image width (0 = max) |
| `height` | number | 0 | Image height (0 = max) |
| `quality` | number | 85 | JPEG quality (0-100) |

```javascript
const base64Data = await CameraPreviewPlugin.takePicture({
  width: 1280,
  height: 720,
  quality: 85
});

// Use the image
const imgSrc = 'data:image/jpeg;base64,' + base64Data;
```

### takeSnapshot(options)

Take a snapshot at the preview resolution (faster than takePicture).

```javascript
const base64Data = await CameraPreviewPlugin.takeSnapshot({ quality: 85 });
```

### Flash Control

```javascript
// Get supported flash modes
const modes = await CameraPreviewPlugin.getSupportedFlashModes();

// Set flash mode: 'off', 'on', 'auto', 'torch'
await CameraPreviewPlugin.setFlashMode('auto');

// Get current flash mode
const currentMode = await CameraPreviewPlugin.getFlashMode();
```

### Zoom Control

```javascript
// Get max zoom level
const maxZoom = await CameraPreviewPlugin.getMaxZoom();

// Get current zoom level
const currentZoom = await CameraPreviewPlugin.getZoom();

// Set zoom level
await CameraPreviewPlugin.setZoom(2);
```

### Focus Control

```javascript
// Get supported focus modes
const modes = await CameraPreviewPlugin.getSupportedFocusModes();

// Set focus mode
await CameraPreviewPlugin.setFocusMode('continuous-picture');

// Tap to focus at specific point
await CameraPreviewPlugin.tapToFocus(xPoint, yPoint);
```

### Exposure Control

```javascript
// Get exposure modes
const modes = await CameraPreviewPlugin.getExposureModes();

// Set exposure mode
await CameraPreviewPlugin.setExposureMode('continuous');

// Get/set exposure compensation
const range = await CameraPreviewPlugin.getExposureCompensationRange();
await CameraPreviewPlugin.setExposureCompensation(-1);
```

### White Balance Control

```javascript
// Get supported white balance modes
const modes = await CameraPreviewPlugin.getSupportedWhiteBalanceModes();

// Set white balance mode
await CameraPreviewPlugin.setWhiteBalanceMode('daylight');
```

### Color Effects

```javascript
// Get supported color effects
const effects = await CameraPreviewPlugin.getSupportedColorEffects();

// Set color effect: 'none', 'mono', 'negative', 'sepia', etc.
await CameraPreviewPlugin.setColorEffect('mono');
```

### onBackButton()

Handle the Android back button press when camera preview has focus.

```javascript
CameraPreviewPlugin.onBackButton().then(() => {
  console.log('Back button pressed');
  // Handle back navigation
});
```

### Video Recording (Android Only)

```javascript
// Start recording
await CameraPreviewPlugin.startRecordVideo({
  cameraDirection: 'back',
  width: 1280,
  height: 720,
  quality: 60,
  withFlash: false
});

// Stop recording and get file path
const filePath = await CameraPreviewPlugin.stopRecordVideo();
```

---

## Constants

### CAMERA_DIRECTION

| Name | Value |
|------|-------|
| BACK | 'back' |
| FRONT | 'front' |

### FLASH_MODE

| Name | Value | Note |
|------|-------|------|
| OFF | 'off' | |
| ON | 'on' | |
| AUTO | 'auto' | |
| RED_EYE | 'red-eye' | Android only |
| TORCH | 'torch' | |

### FOCUS_MODE

| Name | Value | Note |
|------|-------|------|
| FIXED | 'fixed' | |
| AUTO | 'auto' | |
| CONTINUOUS | 'continuous' | iOS only |
| CONTINUOUS_PICTURE | 'continuous-picture' | Android only |
| CONTINUOUS_VIDEO | 'continuous-video' | Android only |
| EDOF | 'edof' | Android only |
| INFINITY | 'infinity' | Android only |
| MACRO | 'macro' | Android only |

### EXPOSURE_MODE

| Name | Value | Note |
|------|-------|------|
| LOCK | 'lock' | |
| AUTO | 'auto' | iOS only |
| CONTINUOUS | 'continuous' | |
| CUSTOM | 'custom' | iOS only |

### WHITE_BALANCE_MODE

| Name | Value | Note |
|------|-------|------|
| LOCK | 'lock' | |
| AUTO | 'auto' | |
| CONTINUOUS | 'continuous' | iOS only |
| INCANDESCENT | 'incandescent' | |
| CLOUDY_DAYLIGHT | 'cloudy-daylight' | |
| DAYLIGHT | 'daylight' | |
| FLUORESCENT | 'fluorescent' | |
| SHADE | 'shade' | |
| TWILIGHT | 'twilight' | |
| WARM_FLUORESCENT | 'warm-fluorescent' | |

### COLOR_EFFECT

| Name | Value | Note |
|------|-------|------|
| NONE | 'none' | |
| MONO | 'mono' | |
| NEGATIVE | 'negative' | |
| POSTERIZE | 'posterize' | |
| SEPIA | 'sepia' | |
| AQUA | 'aqua' | Android only |
| BLACKBOARD | 'blackboard' | Android only |
| SOLARIZE | 'solarize' | Android only |
| WHITEBOARD | 'whiteboard' | Android only |

---

## Migration from cordova-plugin-camera-preview

If you're migrating from the original plugin:

1. Remove the old plugin:
   ```bash
   cordova plugin remove cordova-plugin-camera-preview
   ```

2. Install this plugin:
   ```bash
   cordova plugin add community-cordova-plugin-camera-preview
   ```

3. Update your code to use the new global variable:
   ```javascript
   // Old
   CameraPreview.startCamera(options);

   // New
   CameraPreviewPlugin.startCamera(options);
   ```

4. All methods now return Promises, so you can use async/await:
   ```javascript
   // Old (callback-based)
   CameraPreview.takePicture(options, function(data) {
     // handle data
   });

   // New (Promise-based)
   const data = await CameraPreviewPlugin.takePicture(options);
   ```

---

## License

Apache 2.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

[community_plugins]: https://github.com/eyalin?tab=repositories&q=community-cordova-plugin
