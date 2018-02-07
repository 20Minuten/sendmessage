/**
 * iFrame Send Message
 * by Tamedia | Webclients Team
 * 
 * @name Twenty.Sendmessage
 * @class
 */
(function(Twenty){
    // maybe we want to make this more specific in the future
    var targetWindow = window.parent,
        targetOrigin = "*";

    /**
     * @alias Twenty.Sendmessage.send
     * @memberof Twenty.Sendmessage
     * @description Send message across the universe
     * @param {Object} data - Data to send
     * @param {String} data.type - Type (should be sendmessage)
     * @param {String} data.domain - Fully qualified source domain (<PROTOCOL>://<HOSTNAME>:<PORT>), as you perceive it
     * @param {String} data.message - Message
     */
    function send(data) {
        targetWindow.postMessage(data, targetOrigin);
    }

    Twenty.Sendmessage = {
        send: send
    };
})(window.Twenty = window.Twenty || {});