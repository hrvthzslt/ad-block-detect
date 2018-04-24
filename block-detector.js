AdBlockDetector = (function() {
    detected = null;

    function publicIsBlocked() {
        return publicDetect(function() {return true}, function() {return false});
    }

    function publicDetect(detectedCallback, undetectedCallback) {
        detectedCallback = privateSetDetectedCallback(detectedCallback);

        undetectedCallback = privateSetUndetectedCallback(undetectedCallback);

        if ( detected === null ) {
            return privateSetDetected(detectedCallback, undetectedCallback);
        } else if ( detected ) {
            return detectedCallback();
        } else if ( ! detected ) {
            return undetectedCallback();
        }
    }

    function privateSetDetected(detectedCallback, undetectedCallback) {
        testBlock = document.createElement('div');
        testBlock.innerHTML = '&nbsp';
        testBlock.className = 'adsbox';
        testBlock.id = Math.random().toString(36).substring(3);
        document.body.appendChild(testBlock);

        detected = testBlock.offsetHeight === 0;

        document.getElementById(testBlock.id).remove();

        if ( detected ) {
            return detectedCallback();
        } else {
            return undetectedCallback();
        }
    }
    
    function privateSetDetectedCallback(detectedCallback) {
        if ( typeof detectedCallback === 'undefined' ) {
            detectedCallback = function () {
                console.log('Ad block detected');
            }
        }

        return detectedCallback;
    }

    function privateSetUndetectedCallback(undetectedCallback) {
        if ( typeof undetectedCallback === 'undefined' ) {
            undetectedCallback = function () {
                console.log('Ad block undetected');
            }
        }

        return undetectedCallback;
    }

    return {
        detect: publicDetect,
        isBlocked: publicIsBlocked
    }
})();
