package editor;

import ui.WebglView;
import ui.Container;
import ui.Element;
import ui.Window;
import ui.PositionType;
import ui.EventType;
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

        var list = new List();

        //list.marker = 'none';

        //list.display = 'block';

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

        var panel:Panel = new Panel(PositionType.FIXED);

        panel.style.width = '128px';

        panel.style.height = '256px';

        //form.addElement(panel);

        var window:Window = new Window('New window', ABSOLUTE);

        //form.addElement(window);

        //editor = new Editor();

        var container:Container = new Container(PositionType.FIXED);
        container.addClassName('container_sidebar');

        form.addElement(container);

        var button_editor = new Button('Editor');
        button_editor.addClassName('button_sidebar');
        container.addControl(button_editor);

        button_editor.addEventListener(function(control:Element, type:EventType) {

            trace('Button event: type > ' + type);

        }, EventType.MOUSE_CLICK);

        var button_sprites = new Button('Sprites');
        button_sprites.addClassName('button_sidebar');
        container.addControl(button_sprites);

        var context:Container = new Container(PositionType.RELATIVE);
        context.addClassName('container_context');

        form.addElement(context);

        var webglView:WebglView = new WebglView();
        context.addControl(webglView);
    }
}