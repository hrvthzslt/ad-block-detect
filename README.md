# Adblocker Detector

A simple script for detecting Adblocker

## Usage

Point to the external JavaScript file:

```html
<script src="block-detector.js"></script>
```

Returning a boolean of detection.

```javascript
AdBlockDetector.isBlocked()
```

Passing callback function to detection. First argument is the callback which will run if Adblocker detected, second if not detected.

```javascript
AdBlockDetector.detect(function() {
    // detected
}, function() {
    // undetected
});
```

## Acknowledgments

Based on: https://christianheilmann.com/2015/12/25/detecting-adblock-without-an-extra-http-overhead/
