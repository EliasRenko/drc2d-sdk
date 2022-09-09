package ui;

import js.Browser;
import js.html.MouseEvent;
import ui.Element;

class Panel extends Element {
    
    // ** Privates

    private var __x:Int = 0;

    private var __y:Int = 0;

    public function new(positionType:PositionType, className:String) {
        
        __element = Browser.document.createElement("div");

        //__element.classList.add('draggable');

        __element.style.position = positionType;

        //__element.style.backgroundColor = "#92a8d1";

        super();
    }

    override public function init():Void {
    
    }

    override public function release():Void {
        
    }

    public function addControl(control:Control):Control {

        __element.appendChild(control.node);

        return control;
    }

    public function removeControl():Void {
        
        // ** TODO: Implementation
    }
}