/**
 * @file ytool核心
 * @author coypan
 */

var ytool = {

    /**
     * 判断变量的类型
     *
     * @param {any} arg 需要进行类型判断的变量.
     * @return {string} 变量的类型。String,Funciton,Object,Null,Undefined,Boolean,Number,RegExp等等。
     *
     */
    checkType: function (arg) {
        var reg = /\[object\s(\w+)\]/;
        return Object.prototype.toString.call(arg).replace(reg, '$1');
    },

    /**
     * 获取url中的某参数的值
     *
     * @param {string} param 想要获取的参数的值
     * @return {string|undefined} 参数的值。若该参数不存在，返回undefined;
     */
    getUrlQuery: function (param) {
        var url = window.location.search.substr(1);
        var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
        var res = url.match(reg);
        if (res) {
            return res[2];
        }
        return undefined;
    }

};
