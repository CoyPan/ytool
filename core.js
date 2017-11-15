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
     * Array unique
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
    }

};