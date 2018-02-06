/**
 * iFrame Receive Message
 * by Tamedia | Webclients Team
 * 
 * @name TwentyWindow
 * @class
 */
TwentyWindow = (function(){
    /**
     * registry of all listeners
     */
    var registry = {};

    /**
     * @alias TwentyWindow.register
     * @memberof TwentyWindow
     * @description Register a handler callback for a specific message from a specific origin
     * @param {String} allowedOrigin - Fully qualified origin (<PROTOCOL>://<HOSTNAME>:<PORT>)
     * @param {String} allowedMessage - Message to listen to
     * @param {Function} messageHandler - Callback that handles the message
     */
    function register(allowedOrigin, allowedMessage, messageHandler) {
        registry[allowedOrigin] = registry[allowedOrigin] || {};

        registry[allowedOrigin][allowedMessage] = messageHandler;
    }

    /**
     * @alias TwentyWindow.unregister
     * @memberof TwentyWindow
     * @description Unregister a handler callback for a specific message from a specific origin
     * @param {String} allowedOrigin - Fully qualified origin (<PROTOCOL>://<HOSTNAME>:<PORT>)
     * @param {String} allowedMessage - Message to listen to
     */
    function unregister(allowedOrigin, allowedMessage) {
        if(registry[allowedOrigin]) {
            registry[allowedOrigin][allowedMessage] = null;
        }
    }

    /**
     * @description Internal, private message listener. Performs security and integrity checks on the data received.
     * @param {Object} e - Message event object
     * @param {Object} e.data - Message data
     * @param {String} e.data.type - Type (should be sendmessage)
     * @param {String} e.data.domain - Source domain as the message source thinks of itself
     * @param {String} e.data.message - Message
      */
    function listen(e) {
        var information = e.origin.match(/^(https?):\/\/(.*?)(?::([0-9]+))?$/),
            origin;

        // match must be an array of length 4 (match, protocol, server, port)
        if(!information || information.length !== 4) {
            return false;
        }

        // add default port 80
        if(information[1] === "http" && !information[3]) {
            information[3] = "80";
        }

        // add default port 443
        if(information[1] === "https" && !information[3]) {
            information[3] = "443";
        }

        // check port number, and verify data (type, domain, message)
        if(!information[3] || !e.data || e.data.type !== "sendmessage" || !e.data.domain || !e.data.message) {
            return false;
        }

        // put origin back together, including default ports
        origin = information[1] + "://" + information[2] + ":" + information[3];

        // origin has to match data
        if(e.data.domain !== origin) {
            return false;
        }

        // origin and message must be a registered handler callback
        if(!registry[origin] || !registry[origin][e.data.message] || typeof registry[origin][e.data.message] !== "function") {
            return false;
        }

        // handle time
        window.setTimeout(registry[origin][e.data.message], 1);
    }

    /**
     * @alias TwentyWindow.startListening
     * @memberof TwentyWindow
     * @description Start listening for messages
     */
    function startListening() {
        window.addEventListener("message", listen);
    }

    /**
     * @alias TwentyWindow.stopListening
     * @memberof TwentyWindow
     * @description Stop listening for messages
     */
    function stopListening() {
        window.removeEventListener("message", listen);
    }

    return {
        register: register,
        unregister: unregister,
        startListening: startListening,
        stopListening: stopListening
    };
})();