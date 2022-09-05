package ui;

import js.html.Event;
import js.html.Node;

class Control extends EventDispacher<Control> {
    
    // ** Publics

    public var node(get, null):Node;

    // ** Privates

    public function new() {
        
        super();
    }

    public function init():Void {
        
    }

    public function release():Void {
        
    }

    override function addEventListener(listener:(Control, UInt) -> Void, type:EventType = 0, priority:UInt = 0) {

        node.addEventListener(type.toString(), __onEvent);

        super.addEventListener(listener, type, priority);
    }

    private function __onEvent(event:Event):Void {
        
        dispatchEvent(this, EventType.fromString(event.type));
    }

    // ** Getters and setters

    private function get_node():Node {
        
        return null;
    }
}