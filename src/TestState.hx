package;

import drcJS.display.Region;
import drcJS.display.Tile;
import drcJS.display.Tilemap;
import drcJS.utils.Common;
import drcJS.display.Image;
import drc.objects.State;

class TestState extends State {

    public function new() {
        
        super();
    }

    override function init() {

        super.init();

        var image:Image = new Image(Common.resources.getProfile('res/profiles/texture.json'), [Common.resources.getTexture('res/graphics/grid_bw.png')]);

        addGraphic(image);

        var tilemap:Tilemap = new Tilemap(Common.resources.getProfile('res/profiles/texture.json'), [Common.resources.getTexture('res/graphics/grid_mt.png')]);

        tilemap.tileset.addRegion(new Region([0, 0, 32, 32]));

        var _x:Int = 0;

        for (i in 0...10) {

            tilemap.addTile(new Tile(tilemap, 0, _x, 300));

            _x += 64;
        }

        addGraphic(tilemap);
    }
}