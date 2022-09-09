package ui;

import js.Browser;
import js.html.CSSStyleDeclaration;
import js.html.Node;
import EventDispacher;

class Element extends EventDispacher<Element> implements IControl {
    
    // ** Publics

    public var style(get, null):CSSStyleDeclaration;

    // ** Privates

    private var __element:js.html.Element;

    public function new(tag:String, className:String) {

        __element = __createElement(tag);

        if (className != null) {

            __element.classList.add(className);
        }

        super();
    }

    public function init():Void {
        
    }

    public function release():Void {
        
    }

    public function addClassName(value:String):Void {
        
        __element.classList.add(value);
    }

    public function getNode():Node {
        
        return __element;
    }

    private function __createElement(tag:String):js.html.Element {

        return Browser.document.createElement(tag);
    }

    // ** Getters and setters

	function get_style():CSSStyleDeclaration {
		
        return __element.style;
	}
}