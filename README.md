# ytool
a simple javascript library for daily development

- checkType

  ```
    /**
       * check the type of the parameter
       *
       * @param {any} param the parameter need to be checked
       * @return {string} this type of the parameter. such as String,Funciton,Object,Null,Undefined,Boolean,Number,RegExp and so on。
       *
    */
  ```

- getUrlQuery

  ```
    /**
       * get query from the url
       *
       * @param {string} param the query
       * @return {string|undefined} the value of the key get from the url
    */
  ```

- arrayUnique

  ```
    /**
       * array unique
       *
       * @param {Array} arr the array need to be unique
       * @return {Array} new array
       *
    */
  ```

- deepClone

  ```
    /**
       * deep clone
       *
       * @param {any} source the parameter need to clone
       * @return {any} a new parameter
    */
  ```

- object2String

  ```
    /**
       * change object to string
       * eg: {a:1,b:2} => 'a=1&b=2'
       * 
       * @param {Object} data the object need to change
       * @return {string}
    */
  ```

- uaDetect

  ```
    /**
       * detect ua 
       * 
       * @returns {Object}
    */
  ```

- debounce

  ```
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
  ```

- throttle

  ```
    /**
        * A decorator function. Trigger the [func] during every [wait] milliseconds.
        * if you'd like to disable the execution on the leading edge, pass [options={leading: false}];
        * if you'd like to disable the execution on the trailing edge, pass [options={trailing: false}];
        * 
        * @param {Function} func
        * @param {number} wait
        * @param {Object} options 
    */
  ```

  ​