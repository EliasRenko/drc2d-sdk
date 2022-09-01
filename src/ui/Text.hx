package ui;

import js.Browser;
import js.html.Node;

class Text extends Control {
    
    // ** Private

    private var __node:Node;

    public function new(text:String) {
        
        __node = Browser.document.createTextNode(text);

        super();
    }

    override public function init():Void {
    
    }

    override public function release():Void {
        
    }

    override function get_node():Node {
        
        return __node;
    }
}