var Utility;
(function (Utility) {
    function log(msg) {
        console.log(msg);
    }
    Utility.log = log;
    function error(msg) {
        console.error(msg);
    }
    Utility.error = error;
})(Utility || (Utility = {}));
// usage
Utility.log('Call me');
Utility.error('maybe!');
