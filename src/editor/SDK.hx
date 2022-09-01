package editor;

import ui.Button;
import ui.MenuStrip;
import ui.Form;
import ui.List;
import ui.Panel;
import ui.Text;

class SDK {

    // public static var ogmo:Ogmo;
	public static var editor:Editor;
	// public static var startPage:StartPage;
	// public static var projectEditor:ProjectEditor;
	// public static var dialog:Dynamic;

    public function new() {
     
        var form:Form = new Form();

        form.init();

        form.addElement(new Button('Hello!'));

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

        var panel:Panel = new Panel();

        panel.style.width = '128px';

        panel.style.height = '256px';

        form.addElement(panel);

        editor = new Editor();
    }
}