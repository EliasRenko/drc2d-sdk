package ui;

import js.Browser;
import js.html.Node;
import ui.Element;

class List extends Element {
    
    public var marker(get, set):String;

    public function new(className:String = 'list_default') {
        
        __element = Browser.document.createElement("ul");

        __element.classList.add(className);

        super();
    }

    override public function init():Void {
    
    }

    override public function release():Void {
        
    }

    public function addControl(control:Control):Control {

        var listItem:ListItem = new ListItem();

        listItem.init();

        listItem.addControl(control);

        __element.appendChild(listItem.node);

        return control;
    }

    public function removeControl():Void {
        
        // ** TODO: Implementation
    }

	function get_marker():String {

        return __element.style.listStyleType;
	}

	function set_marker(value:String):String {
        
		__element.style.listStyleType = value;

        return value;
	}
}

private class ListItem extends Control {
    
    private var __node:Node;

    public function new() {
        
        __node = Browser.document.createElement("li");

        super();
    }

    public function addControl(control:Control):Control {
        
        control.init();

        __node.appendChild(control.node);

        return control;
    }

    override function get_node():Node {

        return __node;
    }
}