package ui;

import js.Browser;

class Layout extends Element {

    public function new() {
        
        super();

        __element = Browser.document.createElement("div");
    }
}