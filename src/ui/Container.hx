package ui;

import js.html.Node;
import js.Browser;

class Container extends Element {
    
    public function new(className:String = 'container_default') {
        
        super();

        __element = Browser.document.createElement("div");

        __element.classList.add(className);
    }

    private function __addElement(node:Node):Node {

        return __element.appendChild(node);
    }

    private function __removeElement():Void {
        
    }
}