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
            return decodeURI(res[2]);
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
     * eg: {a:1,b:2} => 'a=1&b=2'
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
     * 
     * @return {Object} 
            ua 
            isIOS
            isIOS8
            isIOS9
            isAndroid
            isQQBrowser
            isWeChat
            isMobileQQ
            isHaoKan
            isSafari
            isUC
            isFireFox
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
    },

    /**
     * A decorator function. trigger the [func] after it stops being called for [wait] milliseconds.
     * If [immediate] is passed,trigger the func on the leading edge;
     * 
     * @param {Function} func the function need to be triggered
     * @param {number} wait the spacing interval
     * @param {boolean} immediate
     * 
     * @return {Function}  
     */
    debounce: function (func, wait, immediate) {

        if (typeof func !== 'function') {
            throw 'A function is required for debounce';
        }

        var now = function () {
            return new Date().getTime();
        }

        var timer = null;
        var lastTime = now();
        var args = null;
        var context = null;

        var exec = function () {
            if (now() - lastTime < wait) {
                window.clearTimeout(timer);
                timer = window.setTimeout(exec, wait);
            } else {
                timer = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }
        }

        return function () {
            args = arguments;
            lastTime = now();
            context = this;
            if (!timer && immediate) {
                func.apply(context, args);
            }
            if (!timer) {
                timer = window.setTimeout(exec, wait);
            }
        }
    },

    /**
     * A decorator function. Trigger the [func] during every [wait] milliseconds.
     * if you'd like to disable the execution on the leading edge, pass [options={leading: false}];
     * if you'd like to disable the execution on the trailing edge, pass [options={trailing: false}];
     * 
     * @param {Function} func
     * @param {number} wait
     * @param {Object} options 
     * 
     * @return {Function}  
     */
    throttle: function (func, wait, options) {
        if (typeof func !== 'function') {
            throw 'A function is required for throttle';
        }

        var now = function () {
            return new Date().getTime();
        }

        options = options || {};

        var timer = null;
        var lastTime = now();
        var args = null;
        var context = null;
        var leftTime = wait;

        var LeadingTrigger = options.leading !== false;
        var trailingTrigger = options.trailing !== false;

        if (LeadingTrigger) {
            leftTime = 0;
        }

        var exec = function () {
            lastTime = now();
            leftTime = wait;
            func.apply(context, args);
        }

        return function () {
            args = arguments;
            context = this;
            if (leftTime <= 0) {
                exec();
            }
            else {
                leftTime = wait - (now() - lastTime);
                timer && window.clearTimeout(timer);
                if (trailingTrigger) {
                    timer = window.setTimeout(exec, leftTime);
                }
            }
        }
    },
    /**
     * get the distance between a dom's top and the page's top
     * 
     * @param {HTMLElement} dom
     * 
     * @return {number} 
     * 
     */
    getOffetTop: function (dom) {
        var res = 0;
        while (dom !== document.body) {
            res += dom.offsetTop;
            dom = dom.parentNode;
        }
        return res;
    }
};

module.exports = ytool;
