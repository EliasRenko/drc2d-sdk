package ui;

import js.Browser;
import js.html.Element;

class Form {
    
    // ** Publics

    public var root(get, null):Element;

    // ** Privates

    private var __root:Element;

    public function new() {
        
        __root = Browser.document.getElementById("root");
    }

    public function init():Void {
        
    }

    public function release():Void {
        
    }

    public function addElement(control:IControl):IControl {
        
        control.init();

        __root.appendChild(control.getNode());

        return control;
    }

    public function removeElement():Void {
        
        // ** TODO: Implementation
    }

    // ** Getters and setters

    private function get_root():Element {
        
        return __root;
    }
}