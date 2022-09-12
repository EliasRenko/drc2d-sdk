package ui;

class MenuStrip extends Container {

    // ** Privates
    
    private var __list:__MenuStripList;

    public function new(className:String = 'menuStrip_default') {
        
        super(PositionType.RELATIVE, className);

        __list = new __MenuStripList();

        __list.marker = 'none';

        __addElement(__list.getNode());
    }

    public function addItem(name:String):IControl {

        var button:Button = new Button(name, 'menuStrip_button_default');

        __list.addControl(button);

        return button;
    }

    public function removeItem():Void {
        
        // ** TODO: Implementation
    }
}

private class __MenuStripList extends List {
    
    public function new(className:String = 'menuStrip_list_default') {
        
        super(className);
    }
}