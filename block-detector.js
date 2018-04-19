const AdBlockDetector = {
    detected: null,

    testBlock: null,

    isBlocked: function() {
        return AdBlockDetector.detect(function() {return true}, function() {return false});
    },

    detect: function(detectedCallback, undetectedCallback) {
        if ( typeof detectedCallback === 'undefined' ) {
            detectedCallback = function () {
                console.log('Ad block detected');
            }
        }

        if ( typeof undetectedCallback === 'undefined' ) {
            undetectedCallback = function () {
                console.log('Ad block undetected');
            }
        }

        if ( AdBlockDetector.detected === null ) {
            return AdBlockDetector.setDetected(detectedCallback, undetectedCallback);
        } else if ( AdBlockDetector.detected ) {
            return detectedCallback();
        } else if ( ! AdBlockDetector.detected ) {
            return undetectedCallback();
        }
    },

    setDetected: function(detectedCallback, undetectedCallback) {
        let testBlock = document.createElement('div');
        testBlock.innerHTML = '&nbsp';
        testBlock.className = 'adsbox';
        document.body.appendChild(testBlock);

        if ( testBlock.offsetHeight === 0 ) {
            testBlockdetected = true;
            testBlock.remove();
            return detectedCallback();
        } else {
            testBlockdetected = false;
            testBlock.remove();
            return undetectedCallback();
        }
    }
};