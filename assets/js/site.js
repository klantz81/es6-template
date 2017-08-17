import "css/styles.css";
import "css/styles.less";
import "css/styles.scss";

export var testing = true;

export function test() {
        console.log(testing);
}

document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOMContentLoaded");
});
