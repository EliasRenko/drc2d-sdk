package ui;

import js.html.Node;

interface IControl {
    
    public function init():Void;

    public function release():Void;

    public function addEventListener(listener:IControl -> UInt -> Void, type:EventType = 0, priority:UInt = 0):Void;

    public function removeEventListener(listener:IControl -> UInt -> Void):Void;

    public function addClassName(value:String):Void;

    public function getNode():Node;
}