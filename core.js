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
        if (this.checkType(arr) !== 'Array') {
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
    }
};
