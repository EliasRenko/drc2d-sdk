package;

import drc.core.App;
import drc.types.AppEventType;
import editor.SDK;

class Main {

    public static var sdk:SDK;

    public static function main():Void {
        
        sdk = new SDK();

        var app:App = new App();

        app.addEventListener(onReady, READY);

        app.run();
    }
    
    public static function onReady(app:App, type:UInt) {
        
        // app.addState(new MapTestState());
    }
}