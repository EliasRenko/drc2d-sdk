package ui;

import js.Browser;
import js.html.Node;
import ui.Element;

class List extends Element {
    
    public var marker(get, set):String;

    public function new(className:String = 'list_default') {
        
        super('ul', className);
    }

    override public function init():Void {
    
    }

    override public function release():Void {
        
    }

    public function addControl(control:IControl):IControl {

        var listItem:ListItem = new ListItem();

        listItem.init();

        listItem.addControl(control);

        __element.appendChild(listItem.getNode());

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

private class ListItem extends Element implements IControl {
    
    // ** Privates

    public function new() {
        
        super('li', 'listItem_default');
    }

    public function addControl(control:IControl):IControl {
        
        control.init();

        __element.appendChild(control.getNode());

        return control;
    }
}