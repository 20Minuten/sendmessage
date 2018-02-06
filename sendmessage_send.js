/**
 * iFrame Send Message
 * by Tamedia | Webclients Team
 * 
 * @name TwentyWindow
 * @class
 */
TwentyWindow = (function(){
    // maybe we want to make this more specific in the future
    var targetWindow = window.parent,
        targetOrigin = "*";

    /**
     * @alias TwentyWindow.send
     * @memberof TwentyWindow
     * @description Send message across the universe
     * @param {Object} data - Data to send
     * @param {String} data.type - Type (should be sendmessage)
     * @param {String} data.domain - Fully qualified source domain (<PROTOCOL>://<HOSTNAME>:<PORT>), as you perceive it
     * @param {String} data.message - Message
     */
    function send(data) {
        targetWindow.postMessage(data, targetOrigin);
    }

    return {
        send: send
    };
})();