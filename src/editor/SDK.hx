package editor;

import ui.Window;
import ui.PositionType;
import ui.EventType;
import ui.Control;
import ui.Button;
import ui.MenuStrip;
import ui.Form;
import ui.List;
import ui.Panel;
import ui.Text;
import ui.EventType;

class SDK {

    // public static var ogmo:Ogmo;
	public static var editor:Editor;
	// public static var startPage:StartPage;
	// public static var projectEditor:ProjectEditor;
	// public static var dialog:Dynamic;

    public function new() {
     
        var form:Form = new Form();

        form.init();

        var b = new Button('Hello!');

        b.addEventListener(function(control:Control, type:UInt) {

            trace('Button event: type > ' + type);

        }, EventType.MOUSE_CLICK);

        form.addElement(b);

        var list = new List();

        list.marker = 'none';

        list.display = 'block';

        // list.addControl(new Text('File'));
        // list.addControl(new Text('Edit'));
        // list.addControl(new Text('View'));
        // list.addControl(new Text('Help'));

        form.addElement(list);

        var menuStrip:MenuStrip = new MenuStrip();

        menuStrip.addItem('File');
        menuStrip.addItem('Edit');
        menuStrip.addItem('View');
        menuStrip.addItem('Help');

        form.addElement(menuStrip);

        var panel:Panel = new Panel(PositionType.ABSOLUTE);

        panel.style.width = '128px';

        panel.style.height = '256px';

        form.addElement(panel);

        var window:Window = new Window('New window', ABSOLUTE);

        form.addElement(window);

        //editor = new Editor();
    }
}