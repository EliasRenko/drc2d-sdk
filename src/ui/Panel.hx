package ui;

import js.Browser;
import js.html.MouseEvent;
import ui.Element;

class Panel extends Element {
    
    // ** Privates

    private var __x:Int = 0;

    private var __y:Int = 0;

    public function new() {
        
        __element = Browser.document.createElement("div");

        __element.classList.add('draggable');

        __element.style.position = 'absolute';

        __element.style.backgroundColor = "#92a8d1";

        __element.onmousedown = __onMouseDown;

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

    private function __onMouseDown(event:MouseEvent):Void {

        event.preventDefault();

        __x = event.clientX;

        __y = event.clientY;

        Browser.document.onmouseup = __onMouseUp;

        Browser.document.onmousemove = __onMouseMove;
    }

    private function __onMouseMove(event:MouseEvent):Void {
        
        event.preventDefault();
        
        var posX:Int = __x - event.clientX;

        var posY:Int = __y - event.clientY;
        
        __x = event.clientX;

        __y = event.clientY;
        
        __element.style.left = (__element.offsetLeft - posX) + "px";
        
        __element.style.top = (__element.offsetTop - posY) + "px";
    }

    private function __onMouseUp(event:MouseEvent):Void {
        
        Browser.document.onmouseup = null;
        
        Browser.document.onmousemove = null;
    }
}