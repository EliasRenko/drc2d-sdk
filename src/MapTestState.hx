package;

import haxe.Json;
import drc.objects.Map;
import drcJS.display.Region;
import drcJS.display.Tile;
import drcJS.display.Tilemap;
import drcJS.utils.Common;
import drcJS.display.Image;
import drc.objects.State;
import drc.data.MapData;

class MapTestState extends State {

    public function new() {
        
        super();
    }

    override function init() {

        super.init();

        loadMap();
    }

    public function loadMap(?name:String) {
        
        var mapData:MapData = Json.parse(Common.resources.getText('res/maps/testmap1.tmj'));

        var map:Map = new Map(mapData);
    }
}