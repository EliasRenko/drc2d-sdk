package ui;

@:enum abstract PositionType(UInt) from UInt to UInt {
	
	var STATIC = 0;
	
	var RELATIVE = 1;

    var ABSOLUTE = 2;

    var STICKY = 3;

    var FIXED = 4;
	
	@:from public static function fromString(value:String):PositionType {

		return switch (value) {

			case "static": STATIC;
			
			case "relative": RELATIVE;

			case "absolute": ABSOLUTE;

			case "sticky": STICKY;

			case "fixed": FIXED;
			
			default: null;
		}
	}
	
	@:to public function toString():String {

		return switch (cast this: PositionType) {

			case PositionType.STATIC: "static";
			
			case PositionType.RELATIVE: "relative";

			case PositionType.ABSOLUTE: "absolute";

			case PositionType.STICKY: "sticky";

			case PositionType.FIXED: "fixed";
			
			default: null;
		}
	}
}