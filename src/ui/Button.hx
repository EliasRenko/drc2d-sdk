package ui;

import js.Browser;
import js.html.MouseEvent;

class Button extends Element {

    // ** Privates

    public function new(text:String, className:String = 'button_default') {
        
        __element = Browser.document.createElement("button");

        __element.innerHTML = text;

        super(className);
    }

    override public function init():Void {

        // __element.onclick = function(event:MouseEvent) {

        //     var a = EventType.fromString(event.type);

        //     trace('ASDASD');

        //     dispatchEvent(this, a);
        // };

        // __element.addEventListener('onclick', function(event:MouseEvent) {

        //     var a = EventType.fromString(event.type);

        //     trace('ASDASD');

        //     dispatchEvent(this, a);
        // });
    }

    override public function release():Void {
        
    }

    // ** Events
}