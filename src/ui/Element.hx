package ui;

import js.html.CSSStyleDeclaration;
import js.html.Node;

class Element extends Control {
    
    // ** Publics

    public var display(get, set):String;

    public var style(get, null):CSSStyleDeclaration;

    // ** Privates

    private var __element:js.html.Element;

    public function new(className:String) {
        
        super(className);
    }

    private function __createElement():js.html.Element {

    }

	function get_display():String {
		
        return __element.style.display;
	}

	function set_display(value:String):String {
		
        __element.style.display = value;

        return value;
	}

	function get_style():CSSStyleDeclaration {
		
        return __element.style;
	}

    override function get_node():Node {
        
        return __element;
    }
}