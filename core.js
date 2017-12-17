/**
 * @file ytool core
 * @author coypan
 */

var ytool = {

    /**
     * check the type of the parameter
     *
     * @param {any} param the parameter need to be checked
     * @return {string} this type of the parameter. such as String,Funciton,Object,Null,Undefined,Boolean,Number,RegExp and so on。
     *
     */
    checkType: function (param) {
        var reg = /\[object\s(\w+)\]/;
        return Object.prototype.toString.call(param).replace(reg, '$1');
    },

    /**
     * get query from the url
     *
     * @param {string} param the query
     * @return {string|undefined} the value of the key get from the url
     */
    getUrlQuery: function (param) {
        var url = window.location.search.substr(1);
        var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
        var res = url.match(reg);
        if (res) {
            return res[2];
        }
        return undefined;
    },

    /**
     * array unique
     *
     * @param {Array} arr the array need to be unique
     * @return {Array} new array
     *
     */
    arrayUnique: function (arr) {
        if (!(arr instanceof Array)) {
            return arr;
        }
        return arr.filter(function (item, idx, array) {
            return array.indexOf(item) === idx;
        });
    },

    /**
     * deep clone
     *
     * @param {any} source the parameter need to clone
     * @return {any} a new parameter
     */
    deepClone: function (source) {
        var target = undefined;
        if (typeof source !== 'object') {
            target = source;
        }
        else {
            if (source instanceof Array) {
                target = [];
                for (var j = 0, len = source.length; j < len; j++) {
                    var tmp = source[j];
                    target.push(arguments.callee(tmp));
                }
            }
            else {
                target = {};
                for (var i in source) {
                    if (source.hasOwnProperty(i)) {
                        target[i] = arguments.callee(source[i]);
                    }
                }
            }
        }
        return target;
    },

    /**
     * change object to string
     * 
     * @param {Object} data the object need to change
     * @return {string}
     */
    object2String: function (data) {
        var params = [];
        if (data && Object.prototype.toString.call(data) === '[object Object]') {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    params.push(i + '=' + encodeURIComponent(data[i]));
                }
            }
        }
        return params.join('&');
    },

    /**
     * detect ua 
     */
    uaDetect: function () {
        var ua = window.navigator.userAgent;

        // detect if the browser is safari
        var detectSafari = function () {
            /* eslint-disable max-len */
            var ret = ua.match(/(MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)/);
            var likeSafari = false;
            if (ret && ret[1] && ret[1].toLowerCase() === 'safari') {
                likeSafari = true;
            }
            /* eslint-disable max-len */
            if (likeSafari && !/CriOS|UCBrowser|fxiOS|QHBrowser|MQQBrowser|baidubrowser|MicroMessenger|SogouMobileBrowser/i.test(ua)) {
                return true;
            }
            return false;
        }

        var isIOS = /iPhone/i.test(ua) || /iPod/i.test(ua);
        var isIOS9 = isIOS && /OS (?:9|10|11|12)_\d[_\d]* like Mac OS X/i.test(ua);
        var isAndroid = /android/i.test(ua);
        var isQQBrowser = /MQQBrowser/i.test(ua);
        var isWeChat = /MicroMessenger/i.test(ua);
        var isMobileQQ = /^(?!.*Safari).*QQ/.test(ua);
        var isHaoKan = /haokan(.*)/.test(ua);
        var isSafari = detectSafari();
        var isIOS8 = /OS (?:8)_\d[_\d]* like Mac OS X/i.test(ua);
        var isUC = /UCBrowser|UCWeb/i.test(ua);
        var isFireFox = /Firefox/i.test(ua) || /fxiOS/i.test(ua);
        
        return {
            ua: ua,
            isIOS: isIOS,
            isIOS8: isIOS8,
            isIOS9: isIOS9,
            isAndroid: isAndroid,
            isQQBrowser: isQQBrowser,
            isWeChat: isWeChat,
            isMobileQQ: isMobileQQ,
            isHaoKan: isHaoKan,
            isSafari: isSafari,
            isUC: isUC,
            isFireFox: isFireFox
        };
    }
};
