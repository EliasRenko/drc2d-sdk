package ui;

import ui.PositionType;
import js.html.Node;

class Container extends Element {
    
    public function new(position:PositionType = PositionType.RELATIVE, className:String = 'container_default') {
        
        super('div', className);

        __element.style.position = position;
    }

    public function addControl(control:IControl):IControl {
        
        __addElement(control.getNode());

        return control;
    }

    private function __addElement(node:Node):Node {

        return __element.appendChild(node);
    }

    private function __removeElement():Void {
        
        // ** TODO: Implementation
    }
}