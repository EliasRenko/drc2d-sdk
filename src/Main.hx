package;

import drc.core.App;
import drc.types.AppEventType;

class Main {
    
    public static function main():Void {
        
        var app:App = new App();

        app.addEventListener(onReady, READY);

        app.run();
    }
    
    public static function onReady(app:App, type:UInt) {
        
        app.addState(new MapTestState());

        
    }
}