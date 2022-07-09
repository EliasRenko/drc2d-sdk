package;

import drcJS.utils.Common;
import drcJS.display.Image;
import drc.objects.State;

class TestState extends State {

    public function new() {
        
        super();

        var image:Image = new Image(Common.resources.getProfile('res/profiles/texture.json'), [Common.resources.getTexture('res/graphics/grid_bw.png')]);

        addGraphic(image);
    }
}