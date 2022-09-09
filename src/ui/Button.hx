package ui;

class Button extends Element {

    // ** Privates

    public function new(text:String, className:String = 'button_default') {

        super('button', className);

        __element.innerHTML = text;
    }

    override function init():Void {
        
    }

    override public function release():Void {
        
    }
}