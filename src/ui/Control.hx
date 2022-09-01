package ui;

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

    // ** Getters and setters

    private function get_node():Node {
        
        return null;
    }
}