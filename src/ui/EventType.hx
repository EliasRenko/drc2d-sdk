package ui;

@:enum abstract EventType(UInt) from UInt to UInt {
	
	var UNKNOWN = 0;
	
	var MOUSE_CLICK = 1;

    var ON_HOVER = 2;
	
	@:from public static function fromString(value:String):EventType {

		return switch (value) {

			case "unknown": UNKNOWN;
			
			case "click": MOUSE_CLICK;
			
			default: null;
		}
	}
	
	@:to public function toString():String {

		return switch (cast this: EventType) {

			case EventType.UNKNOWN: "unknown";
			
			case EventType.MOUSE_CLICK: "click";
			
			default: null;
		}
	}
}