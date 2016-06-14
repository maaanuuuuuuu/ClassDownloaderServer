/*jslint
    browser:true
    devel:true
*/

(function() {
    "use strict";

    function findClass(className) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr);
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.log('Error: ' + xhr.status);
                }
            }
        };
        xhr.open('GET', 'https://localhost:3001/classes/' + className);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
    }
    // NE MARCHE PAS UTILSIER CA http://stackoverflow.com/questions/5907777/making-and-handling-jsonp-request-using-javascript
    document.addEventListener("DOMContentLoaded", function() {
        findClass('bold');
    });
}());


