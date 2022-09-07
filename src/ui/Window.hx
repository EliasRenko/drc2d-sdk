package ui;

import js.html.MouseEvent;
import js.Browser;

class Window extends Panel {
    
    // ** Privates

    private var titleBar:js.html.Element;

    private var container:js.html.Element;

    public function new(positionType:PositionType = ABSOLUTE, width:Int = 256, height:Int = 256) {
        
        super(positionType);

        __element.style.width = Std.string(width) + 'px';

        __element.style.height = Std.string(height) + 'px';

        titleBar = Browser.document.createElement("div");

        titleBar.classList.add('window_titleBar_default');

        container = Browser.document.createElement("div");

        __element.appendChild(titleBar);

        __element.appendChild(container);

        titleBar.onmousedown = __onMouseDown;
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