import drc.core.App;

class Main {
    
    public static function main():Void {
        
        var app:App = new App();

        app.addState(new TestState());

        app.run();
    }
}