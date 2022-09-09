package ui;

import js.Browser;
import js.html.Node;

class Text extends Container implements IControl {
    
    // ** Publics

    public var text(get, set):String;

    // ** Privates

    private var __textNode:Node;

    public function new(text:String) {
        
        super('text_default');
        
        __textNode = __addElement(Browser.document.createTextNode(text));
    }

    override public function init():Void {

    }

    override public function release():Void {
        
    }

    // ** Getters and setters

	function get_text():String {

		return __element.textContent;
	}

	function set_text(value:String):String {

		return __element.textContent = value;
	}
}