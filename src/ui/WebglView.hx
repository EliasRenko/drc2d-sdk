package ui;

import ui.Container;

class WebglView extends Container {

    public function new() {
        
        super(PositionType.RELATIVE, 'webglView');

        __element.id = 'webglView';
    }
}