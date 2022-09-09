package ui;

import ui.Element;

class Panel extends Element {
    
    // ** Privates

    private var __x:Int = 0;

    private var __y:Int = 0;

    public function new(positionType:PositionType, className:String = "panel_default") {
        
        super('div', className);

        __element.style.position = positionType;
    }

    override public function init():Void {
    
    }

    override public function release():Void {
        
    }

    public function addControl(control:IControl):IControl {

        __element.appendChild(control.getNode());

        return control;
    }

    public function removeControl():Void {
        
        // ** TODO: Implementation
    }
}