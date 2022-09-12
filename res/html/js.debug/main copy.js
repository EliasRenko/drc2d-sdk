(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EventDispacher = function() {
	this.__listeners = [];
};
EventDispacher.__name__ = true;
EventDispacher.prototype = {
	addEventListener: function(listener,type,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(type == null) {
			type = 0;
		}
		var eventListener = { func : listener, type : type, priority : priority};
		var _g = 0;
		var _g1 = this.__listeners.length;
		while(_g < _g1) {
			var i = _g++;
			if(UInt.gt(priority,this.__listeners[i].priority)) {
				this.__listeners.splice(i,0,eventListener);
				return;
			}
		}
		this.__listeners.push(eventListener);
	}
	,dispatchEvent: function(value,type) {
		if(type == null) {
			type = 0;
		}
		var _g = 0;
		var _g1 = this.__listeners.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.__listeners[i].type == type || this.__listeners[i].type == 0) {
				this.__listeners[i].func(value,type);
			}
		}
	}
	,__class__: EventDispacher
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	Main.sdk = new editor_SDK();
	var app = new drc_core_App();
	app.addEventListener(Main.onReady,1);
	app.run();
};
Main.onReady = function(app,type) {
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var UInt = {};
UInt.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a > b;
	}
};
var drc_core_App = function() {
	this.states = new drcJS_part_ObjectList();
	EventDispacher.call(this);
	this.__runtime = new drcJS_backend_web_core_Runtime();
	this.__runtime.init();
	this.__context = new drcJS_core_Context();
	drcJS_utils_Common.context = this.__context;
	this.__resources = new drc_utils_Resources();
	drcJS_utils_Common.resources = this.__resources;
	this.preload();
};
drc_core_App.__name__ = true;
drc_core_App.__super__ = EventDispacher;
drc_core_App.prototype = $extend(EventDispacher.prototype,{
	preload: function() {
		var _preloads = [this.__resources.loadProfile("res/profiles/texture.json"),this.__resources.loadTexture("res/graphics/grid_bw.png"),this.__resources.loadTexture("res/graphics/grid_mt.png"),this.__resources.loadText("res/maps/testmap1.tmj"),this.__resources.loadTexture("res/graphics/dev_tiles.png"),this.__resources.loadTexture("res/graphics/db32.png")];
		this.__promise = drcJS_core_Promise.all(_preloads);
	}
	,run: function() {
		var _gthis = this;
		this.__promise.onComplete(function(promise,type) {
			var tmp = drcJS_utils_Common.resources.getProfile("res/profiles/texture.json");
			_gthis.__stage = new drcJS_display_Stage(tmp);
			drcJS_utils_Common.stage = _gthis.get_stage();
			_gthis.ready();
			_gthis.__runtime.addEventListener($bind(_gthis,_gthis.loop),1);
			_gthis.__runtime.requestLoopFrame();
		});
		this.__promise.onReject(function(promise,type) {
			throw haxe_Exception.thrown("Cannot preload assets");
		});
	}
	,ready: function() {
		this.dispatchEvent(this,1);
	}
	,loop: function(runtime,type) {
		this.__runtime.pollEvents();
		this.update();
		this.get_stage().setToDraw();
		this.render();
		this.__context.setRenderToBackbuffer();
		this.__context.clear(0,1,0,1);
		this.get_stage().present();
	}
	,render: function() {
		var _g = 0;
		var _g1 = this.states.get_count();
		while(_g < _g1) {
			var i = _g++;
			this.states.members[i].render();
		}
	}
	,update: function() {
		var _g = 0;
		var _g1 = this.states.get_count();
		while(_g < _g1) {
			var i = _g++;
			this.states.members[i].update();
		}
	}
	,get_stage: function() {
		return this.__stage;
	}
	,__class__: drc_core_App
});
var drcJS_part_Object = function() {
};
drcJS_part_Object.__name__ = true;
drcJS_part_Object.prototype = {
	__class__: drcJS_part_Object
};
var drc_objects_Entity = function() {
	drcJS_part_Object.call(this);
};
drc_objects_Entity.__name__ = true;
drc_objects_Entity.__super__ = drcJS_part_Object;
drc_objects_Entity.prototype = $extend(drcJS_part_Object.prototype,{
	update: function() {
	}
	,__class__: drc_objects_Entity
});
var drc_objects_State = function() {
	this.__perpspective = false;
	this.graphics = new drcJS_part_RecycleList();
	this.entities = new drcJS_part_RecycleList();
	this.camera = new drcJS_objects_Camera();
	drcJS_part_Object.call(this);
};
drc_objects_State.__name__ = true;
drc_objects_State.__super__ = drcJS_part_Object;
drc_objects_State.prototype = $extend(drcJS_part_Object.prototype,{
	render: function() {
		this.graphics.forEachActive($bind(this,this.__renderGraphic));
	}
	,update: function() {
		this.entities.forEachActive($bind(this,this.__updateEntity));
	}
	,__renderGraphic: function(drawable) {
		if(drawable.get_visible()) {
			drawable.render();
			if(this.__perpspective) {
				this.__parent.get_stage().draw(drawable,this.camera.render2(drawable.matrix));
			} else {
				this.__parent.get_stage().draw(drawable,this.camera.render(drawable.matrix));
			}
		}
	}
	,__updateEntity: function(entity) {
		entity.update();
	}
	,__class__: drc_objects_State
});
var drcJS_utils_Resources = function() { };
drcJS_utils_Resources.__name__ = true;
drcJS_utils_Resources.loadText = function(path,func) {
	var __request = new drcJS_utils_HTTPRequest(path,"");
	__request.load(func,"text");
};
drcJS_utils_Resources.loadTexture = function(path,func) {
	var __request = new drcJS_utils_HTTPRequest(path,"");
	__request.load(function(status,response) {
		var this1 = new Uint8Array(response);
		var _arrayBuffer = this1;
		func(status,_arrayBuffer);
	},"arraybuffer",true);
};
var drc_utils_Resources = function() {
	this.__resources = new haxe_ds_StringMap();
};
drc_utils_Resources.__name__ = true;
drc_utils_Resources.__super__ = drcJS_utils_Resources;
drc_utils_Resources.prototype = $extend(drcJS_utils_Resources.prototype,{
	getProfile: function(name) {
		if(Object.prototype.hasOwnProperty.call(this.__resources.h,name)) {
			var _textureResource = js_Boot.__cast(this.__resources.h[name] , drc_utils__$Resources__$_$ProfileResource);
			return _textureResource.data;
		}
		var _textureResource = js_Boot.__cast(this.__resources.h["res/profiles/default.json"] , drc_utils__$Resources__$_$ProfileResource);
		return _textureResource.data;
	}
	,loadText: function(path,cache) {
		if(cache == null) {
			cache = true;
		}
		var _gthis = this;
		return new drcJS_core_Promise(function(resolve,reject,advance) {
			drcJS_utils_Resources.loadText(path,function(status,response) {
				if(status == 200 || status == 0) {
					if(cache) {
						var this1 = _gthis.__resources;
						var value = new drc_utils__$Resources__$_$TextResource(response);
						this1.h[path] = value;
					}
					resolve(response);
				} else {
					drcJS_debug_Log.print(status);
					reject();
				}
			});
		});
	}
	,loadTexture: function(path,cache) {
		if(cache == null) {
			cache = true;
		}
		var _gthis = this;
		return new drcJS_core_Promise(function(resolve,reject,advance) {
			drcJS_utils_Resources.loadTexture(path,function(status,response) {
				if(status == 200 || status == 0) {
					var i = new haxe_io_BytesInput(haxe_io_Bytes.ofData(response.buffer));
					var png = new drcJS_format_PNG(i);
					var _bytes = png.extract();
					var header = drcJS_format_PNG.getHeader(png.data);
					var _texture = new drcJS_data_Texture(haxe_io_UInt8Array.fromBytes(_bytes),4,header.width,header.height);
					if(cache) {
						var this1 = _gthis.__resources;
						var value = new drc_utils__$Resources__$_$TextureResource(_texture);
						this1.h[path] = value;
					}
					resolve(_texture);
				} else {
					reject();
				}
			});
		});
	}
	,loadProfile: function(path,cache) {
		if(cache == null) {
			cache = true;
		}
		var _gthis = this;
		return new drcJS_core_Promise(function(resolve,reject,advance) {
			drcJS_utils_Resources.loadText(path,function(status,response) {
				if(status == 200 || status == 0) {
					var _rootData = JSON.parse(response);
					var _promises = [];
					console.log("drc/utils/Resources.hx:251:","Vert: " + Std.string(_rootData.vertexShader));
					console.log("drc/utils/Resources.hx:252:","Frag: " + Std.string(_rootData.fragmentShader));
					if(Object.prototype.hasOwnProperty.call(_rootData,"vertexShader")) {
						_promises.push(_gthis.loadText("res/shaders/" + Std.string(_rootData.vertexShader)));
					} else {
						_promises.push(null);
					}
					if(Object.prototype.hasOwnProperty.call(_rootData,"fragmentShader")) {
						_promises.push(_gthis.loadText("res/shaders/" + Std.string(_rootData.fragmentShader)));
					} else {
						_promises.push(null);
					}
					var _promise = drcJS_core_Promise.all(_promises);
					_promise.onComplete(function(promise,type) {
						var _profile = new drcJS_data_Profile(_rootData.name);
						var _vertexShaderSource = "";
						var _fragmentShaderSource = "";
						var dataPerVertex = 0;
						if(Object.prototype.hasOwnProperty.call(_rootData,"attributes")) {
							var _attributeData = Reflect.field(_rootData,"attributes");
							var _g = 0;
							var _g1 = _attributeData.length;
							while(_g < _g1) {
								var i = _g++;
								var _attributeFormat = 4;
								switch(_attributeData[i].format) {
								case "float":
									_attributeFormat = 1;
									break;
								case "vec2":
									_attributeFormat = 2;
									break;
								case "vec3":
									_attributeFormat = 3;
									break;
								case "vec4":
									_attributeFormat = 4;
									break;
								default:
									drcJS_debug_Log.print("Unknown attribute format.");
									reject();
								}
								var struct = [];
								var structData = Reflect.field(_attributeData[i],"struct");
								var _g2 = 0;
								var _g3 = structData.length;
								while(_g2 < _g3) {
									var j = _g2++;
									var _vertex = { name : structData[j].name, position : dataPerVertex};
									struct.push(_vertex);
									++dataPerVertex;
								}
								_profile.addAttribute(new drcJS_display_Attribute(_attributeData[i].name,_attributeFormat,0,struct));
							}
						} else {
							throw haxe_Exception.thrown("Profile: " + _profile.get_name() + " has no field with name `attributes`.");
						}
						_profile.dataPerVertex = dataPerVertex;
						if(Object.prototype.hasOwnProperty.call(_rootData,"uniforms")) {
							var _uniformData = Reflect.field(_rootData,"uniforms");
							var _g = 0;
							var _g1 = _uniformData.length;
							while(_g < _g1) {
								var i = _g++;
								_profile.addUniform(new drcJS_display_Uniform(_uniformData[i].name,_uniformData[i].format));
							}
						} else {
							throw haxe_Exception.thrown("Profile: " + _profile.get_name() + " has no field with name `uniforms`.");
						}
						var textures = [];
						if(Object.prototype.hasOwnProperty.call(_rootData,"textures")) {
							var textureData = Reflect.field(_rootData,"textures");
							var _g = 0;
							var _g1 = textureData.length;
							while(_g < _g1) {
								var textureCount = _g++;
								_profile.textures[textureCount] = { name : textureData[textureCount].name, format : textureData[textureCount].format};
							}
						} else {
							throw haxe_Exception.thrown("Profile: " + _profile.get_name() + " has no field with name `textures`.");
						}
						if(promise.get_result()[0] != null) {
							_vertexShaderSource = promise.get_result()[0];
						}
						var _vertexShader = drcJS_backend_web_core_GL.gl.createShader(35633);
						drcJS_backend_web_core_GL.gl.shaderSource(_vertexShader,_vertexShaderSource);
						drcJS_backend_web_core_GL.gl.compileShader(_vertexShader);
						if(promise.get_result()[1] != null) {
							_fragmentShaderSource = promise.get_result()[1];
						}
						var _fragmentShader = drcJS_backend_web_core_GL.gl.createShader(35632);
						drcJS_backend_web_core_GL.gl.shaderSource(_fragmentShader,_fragmentShaderSource);
						drcJS_backend_web_core_GL.gl.compileShader(_fragmentShader);
						var _program = new drcJS_display_Program(drcJS_backend_web_core_GL.gl.createProgram());
						var _location = 0;
						var _g = 0;
						var _g1 = _profile.attributes.length;
						while(_g < _g1) {
							var i = _g++;
							var program = _program.get_innerData();
							var name = _profile.attributes[i].get_name();
							drcJS_backend_web_core_GL.gl.bindAttribLocation(program,_location,name);
							_profile.attributes[i].assignLocation(_location);
							++_location;
						}
						var program = _program.get_innerData();
						drcJS_backend_web_core_GL.gl.attachShader(program,_vertexShader);
						var program = _program.get_innerData();
						drcJS_backend_web_core_GL.gl.attachShader(program,_fragmentShader);
						var program = _program.get_innerData();
						drcJS_backend_web_core_GL.gl.linkProgram(program);
						var program = _program.get_innerData();
						if(drcJS_backend_web_core_GL.gl.getProgramParameter(program,35714) == 0) {
							var program = _program.get_innerData();
							var _error = drcJS_backend_web_core_GL.gl.getProgramInfoLog(program);
							throw haxe_Exception.thrown("Unable to link the shader program: " + _error);
						}
						var _g = 0;
						var _g1 = _profile.uniforms.length;
						while(_g < _g1) {
							var i = _g++;
							var program = _program.get_innerData();
							var name = _profile.uniforms[i].get_name();
							var _location = drcJS_backend_web_core_GL.gl.getUniformLocation(program,name);
							_profile.uniforms[i].assignLocation(_location);
						}
						var _g = 0;
						var _g1 = _profile.textures.length;
						while(_g < _g1) {
							var i = _g++;
							var program = _program.get_innerData();
							var _loc = drcJS_backend_web_core_GL.gl.getUniformLocation(program,_profile.textures[i].name);
							_profile.textures[i].location = _loc;
							console.log("drc/utils/Resources.hx:478:","Tex loc: " + Std.string(_loc));
						}
						_profile.program = _program;
						if(cache) {
							var this1 = _gthis.__resources;
							var value = new drc_utils__$Resources__$_$ProfileResource(_profile);
							this1.h[path] = value;
						}
						resolve(_profile);
					});
				} else {
					reject();
				}
			});
		});
	}
	,__class__: drc_utils_Resources
});
var drc_utils__$Resources__$_$Resource = function() {
};
drc_utils__$Resources__$_$Resource.__name__ = true;
drc_utils__$Resources__$_$Resource.prototype = {
	__class__: drc_utils__$Resources__$_$Resource
};
var drc_utils__$Resources__$_$TextResource = function(data) {
	drc_utils__$Resources__$_$Resource.call(this);
	this.data = data;
};
drc_utils__$Resources__$_$TextResource.__name__ = true;
drc_utils__$Resources__$_$TextResource.__super__ = drc_utils__$Resources__$_$Resource;
drc_utils__$Resources__$_$TextResource.prototype = $extend(drc_utils__$Resources__$_$Resource.prototype,{
	__class__: drc_utils__$Resources__$_$TextResource
});
var drc_utils__$Resources__$_$TextureResource = function(data) {
	drc_utils__$Resources__$_$Resource.call(this);
	this.data = data;
};
drc_utils__$Resources__$_$TextureResource.__name__ = true;
drc_utils__$Resources__$_$TextureResource.__super__ = drc_utils__$Resources__$_$Resource;
drc_utils__$Resources__$_$TextureResource.prototype = $extend(drc_utils__$Resources__$_$Resource.prototype,{
	__class__: drc_utils__$Resources__$_$TextureResource
});
var drc_utils__$Resources__$_$ProfileResource = function(data) {
	drc_utils__$Resources__$_$Resource.call(this);
	this.data = data;
};
drc_utils__$Resources__$_$ProfileResource.__name__ = true;
drc_utils__$Resources__$_$ProfileResource.__super__ = drc_utils__$Resources__$_$Resource;
drc_utils__$Resources__$_$ProfileResource.prototype = $extend(drc_utils__$Resources__$_$Resource.prototype,{
	__class__: drc_utils__$Resources__$_$ProfileResource
});
var drcJS_backend_web_core_GL = function() { };
drcJS_backend_web_core_GL.__name__ = true;
var drcJS_core_EventDispacher = function() {
	this.__listeners = [];
};
drcJS_core_EventDispacher.__name__ = true;
drcJS_core_EventDispacher.prototype = {
	addEventListener: function(listener,type,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(type == null) {
			type = 0;
		}
		var eventListener = { func : listener, type : type, priority : priority};
		var _g = 0;
		var _g1 = this.__listeners.length;
		while(_g < _g1) {
			var i = _g++;
			if(UInt.gt(priority,this.__listeners[i].priority)) {
				this.__listeners.splice(i,0,eventListener);
				return;
			}
		}
		this.__listeners.push(eventListener);
	}
	,dispatchEvent: function(value,type) {
		if(type == null) {
			type = 0;
		}
		var _g = 0;
		var _g1 = this.__listeners.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.__listeners[i].type == type || this.__listeners[i].type == 0) {
				this.__listeners[i].func(value,type);
			}
		}
	}
	,__class__: drcJS_core_EventDispacher
};
var drcJS_backend_web_core_Runtime = function() {
	drcJS_core_EventDispacher.call(this);
	this.__active = true;
};
drcJS_backend_web_core_Runtime.__name__ = true;
drcJS_backend_web_core_Runtime.__super__ = drcJS_core_EventDispacher;
drcJS_backend_web_core_Runtime.prototype = $extend(drcJS_core_EventDispacher.prototype,{
	init: function() {
		var _gthis = this;
		this.__initVideo();
		this.__keyboard = new drcJS_backend_web_core__$Runtime_BackendKeyboard();
		this.__mouse = new drcJS_backend_web_core__$Runtime_BackendMouse();
		if($global.navigator.getGamepads != null) {
			console.log("drcJS/backend/web/core/Runtime.hx:77:","getGamepads is true");
		}
		if($global.navigator.webkitGetGamepads != null) {
			console.log("drcJS/backend/web/core/Runtime.hx:82:","webkit getGamepads is true");
		}
		this.__window.innerData.addEventListener("gamepadconnected",function(gamepad) {
			console.log("drcJS/backend/web/core/Runtime.hx:87:","Gamepad connected!");
		});
		this.__window.innerData.addEventListener("gamepaddisconnected",function(event) {
		});
		this.__window.innerData.addEventListener("mousedown",function(event) {
		});
		this.__window.innerData.addEventListener("mousemove",function(event) {
			_gthis.__mouse.x = event.clientX - _gthis.__boundingRect.left | 0;
			_gthis.__mouse.y = event.clientY - _gthis.__boundingRect.top | 0;
		});
		window.document.addEventListener("keydown",function(keyboardEvent) {
		});
		window.document.addEventListener("keyup",function(keyboardEvent) {
		});
		this.attachWindow();
		this.requestLoopFrame();
	}
	,pollEvents: function() {
	}
	,__initVideo: function() {
		this.__window = new drcJS_backend_web_system_Window();
		var tmp = window.document.createElement("canvas");
		this.__window.innerData = tmp;
		this.__window.innerData.id = "glCanvas";
		this.__window.innerData.className = "glCanvas";
		this.__window.innerData.width = 640;
		this.__window.innerData.height = 480;
		drcJS_utils_Common.window = this.__window;
		this.__boundingRect = this.__window.innerData.getBoundingClientRect();
		var _gl = null;
		_gl = this.__window.innerData.getContext("webgl");
		if(_gl != null) {
			console.log("drcJS/backend/web/core/Runtime.hx:159:","Context created");
		}
		_gl.getExtension("OES_element_index_uint");
		drcJS_backend_web_core_GL.gl = _gl;
	}
	,attachWindow: function() {
		var element = window.document.getElementById("webglView");
		if(element != null) {
			element.appendChild(this.__window.innerData);
			return;
		}
	}
	,requestLoopFrame: function() {
		window.requestAnimationFrame($bind(this,this.__loop));
	}
	,__loop: function(timestamp) {
		this.dispatchEvent(this,1);
		window.requestAnimationFrame($bind(this,this.__loop));
	}
	,__class__: drcJS_backend_web_core_Runtime
});
var drcJS_input_Device = function() {
	drcJS_core_EventDispacher.call(this);
};
drcJS_input_Device.__name__ = true;
drcJS_input_Device.__super__ = drcJS_core_EventDispacher;
drcJS_input_Device.prototype = $extend(drcJS_core_EventDispacher.prototype,{
	__class__: drcJS_input_Device
});
var drcJS_input_Keyboard = function() {
	drcJS_input_Device.call(this);
	var this1 = new Array(256);
	this.__checkControls = this1;
	this.__pressControls = [];
	this.__releaseControls = [];
};
drcJS_input_Keyboard.__name__ = true;
drcJS_input_Keyboard.__super__ = drcJS_input_Device;
drcJS_input_Keyboard.prototype = $extend(drcJS_input_Device.prototype,{
	__class__: drcJS_input_Keyboard
});
var drcJS_backend_web_core__$Runtime_BackendKeyboard = function() {
	drcJS_input_Keyboard.call(this);
};
drcJS_backend_web_core__$Runtime_BackendKeyboard.__name__ = true;
drcJS_backend_web_core__$Runtime_BackendKeyboard.__super__ = drcJS_input_Keyboard;
drcJS_backend_web_core__$Runtime_BackendKeyboard.prototype = $extend(drcJS_input_Keyboard.prototype,{
	__class__: drcJS_backend_web_core__$Runtime_BackendKeyboard
});
var drcJS_input_Mouse = function() {
	this.y = 0;
	this.x = 0;
	drcJS_input_Device.call(this);
	var this1 = new Array(256);
	this.__checkControls = this1;
	this.__pressControls = [];
	this.__releaseControls = [];
};
drcJS_input_Mouse.__name__ = true;
drcJS_input_Mouse.__super__ = drcJS_input_Device;
drcJS_input_Mouse.prototype = $extend(drcJS_input_Device.prototype,{
	__class__: drcJS_input_Mouse
});
var drcJS_backend_web_core__$Runtime_BackendMouse = function() {
	drcJS_input_Mouse.call(this);
};
drcJS_backend_web_core__$Runtime_BackendMouse.__name__ = true;
drcJS_backend_web_core__$Runtime_BackendMouse.__super__ = drcJS_input_Mouse;
drcJS_backend_web_core__$Runtime_BackendMouse.prototype = $extend(drcJS_input_Mouse.prototype,{
	__class__: drcJS_backend_web_core__$Runtime_BackendMouse
});
var drcJS_backend_web_system_Window = function() {
};
drcJS_backend_web_system_Window.__name__ = true;
drcJS_backend_web_system_Window.prototype = {
	get_height: function() {
		return this.innerData.height;
	}
	,get_width: function() {
		return this.innerData.width;
	}
	,__class__: drcJS_backend_web_system_Window
};
var drcJS_core_Context = function() {
	this.__glDepthBuffer = drcJS_backend_web_core_GL.gl.createRenderbuffer();
	this.__glFrameBuffer = drcJS_backend_web_core_GL.gl.createFramebuffer();
	this.__glIndexBuffer = drcJS_backend_web_core_GL.gl.createBuffer();
	this.__glVertexBuffer = drcJS_backend_web_core_GL.gl.createBuffer();
};
drcJS_core_Context.__name__ = true;
drcJS_core_Context.prototype = {
	clear: function(r,g,b,a) {
		drcJS_backend_web_core_GL.gl.clearDepth(1.0);
		drcJS_backend_web_core_GL.gl.clearStencil(0);
		drcJS_backend_web_core_GL.gl.clearColor(r,g,b,a);
		drcJS_backend_web_core_GL.gl.clear(17664);
	}
	,drawElements: function(mode,offset,count) {
		drcJS_backend_web_core_GL.gl.drawElements(mode,count,5125,offset);
	}
	,setRenderToTexture: function(bitmapData) {
		drcJS_backend_web_core_GL.gl.bindFramebuffer(36160,this.__glFrameBuffer);
		var attachmentPoint = 36064;
		drcJS_backend_web_core_GL.gl.framebufferTexture2D(36160,attachmentPoint,3553,bitmapData.glTexture,0);
		drcJS_backend_web_core_GL.gl.bindRenderbuffer(36161,this.__glDepthBuffer);
		var width = bitmapData.get_width();
		var height = bitmapData.get_height();
		drcJS_backend_web_core_GL.gl.renderbufferStorage(36161,33189,width,height);
		drcJS_backend_web_core_GL.gl.framebufferRenderbuffer(36160,36096,36161,this.__glDepthBuffer);
		if(drcJS_backend_web_core_GL.gl.checkFramebufferStatus(36160) != 36053) {
			console.log("drcJS/core/Context.hx:79:","Framebuffer problem!");
		}
	}
	,setSamplerState: function(params) {
		drcJS_backend_web_core_GL.gl.texParameterf(3553,10242,params.wrapX);
		drcJS_backend_web_core_GL.gl.texParameterf(3553,10243,params.wrapY);
		drcJS_backend_web_core_GL.gl.texParameterf(3553,10240,params.magnification);
		drcJS_backend_web_core_GL.gl.texParameterf(3553,10241,params.minification);
	}
	,setRenderToBackbuffer: function() {
		drcJS_backend_web_core_GL.gl.bindFramebuffer(36160,null);
	}
	,generateIndexBuffer: function() {
		drcJS_backend_web_core_GL.gl.bindBuffer(34963,this.__glIndexBuffer);
	}
	,generateTexture: function() {
		var _glTexture = drcJS_backend_web_core_GL.gl.createTexture();
		drcJS_backend_web_core_GL.gl.bindTexture(3553,_glTexture);
		return _glTexture;
	}
	,generateVertexBuffer: function() {
		drcJS_backend_web_core_GL.gl.bindBuffer(34962,this.__glVertexBuffer);
	}
	,loadIndexBuffer: function(data) {
		var data1 = haxe_io_Int32Array.fromArray(data);
		drcJS_backend_web_core_GL.gl.bufferData(34963,data1,35044);
		drcJS_backend_web_core_GL.gl.bindBuffer(34963,null);
	}
	,loadTexture: function(width,height,comp,data) {
		var _format;
		switch(comp) {
		case 1:
			_format = 6409;
			break;
		case 2:
			_format = 6410;
			break;
		case 3:
			_format = 6407;
			break;
		case 4:
			_format = 6408;
			break;
		default:
			_format = 6407;
		}
		drcJS_backend_web_core_GL.gl.texImage2D(3553,0,_format,width,height,0,_format,5121,data);
		drcJS_backend_web_core_GL.gl.bindTexture(3553,null);
	}
	,loadVertexBuffer: function(data) {
		var data1 = haxe_io_Float32Array.fromArray(data);
		drcJS_backend_web_core_GL.gl.bufferData(34962,data1,35044);
		drcJS_backend_web_core_GL.gl.bindBuffer(34962,null);
	}
	,setAttributePointer: function(index,size,normalized,stride,offset) {
		drcJS_backend_web_core_GL.gl.enableVertexAttribArray(index);
		drcJS_backend_web_core_GL.gl.vertexAttribPointer(index,size,5126,normalized,stride,offset);
	}
	,setUniform: function(uniform) {
		var values = uniform.getPackedValue();
		switch(uniform.type) {
		case "float1":
			drcJS_backend_web_core_GL.gl.uniform1f(uniform.index,values[0]);
			break;
		case "float2":
			drcJS_backend_web_core_GL.gl.uniform2f(uniform.index,values[0],values[1]);
			break;
		case "float3":
			drcJS_backend_web_core_GL.gl.uniform3f(uniform.index,values[0],values[1],values[2]);
			break;
		case "float4":
			drcJS_backend_web_core_GL.gl.uniform4f(uniform.index,values[0],values[1],values[2],values[3]);
			break;
		case "int1":
			drcJS_backend_web_core_GL.gl.uniform1i(uniform.index,values[0]);
			break;
		case "int2":
			drcJS_backend_web_core_GL.gl.uniform2i(uniform.index,values[0],values[1]);
			break;
		case "int3":
			drcJS_backend_web_core_GL.gl.uniform3i(uniform.index,values[0],values[1],values[2]);
			break;
		case "int4":
			drcJS_backend_web_core_GL.gl.uniform4i(uniform.index,values[0],values[1],values[2],values[3]);
			break;
		default:
		}
	}
	,setViewport: function(x,y,width,height) {
		drcJS_backend_web_core_GL.gl.viewport(x,y,width,height);
	}
	,__class__: drcJS_core_Context
};
var drcJS_core_Promise = function(func,shoudlRun) {
	if(shoudlRun == null) {
		shoudlRun = true;
	}
	this.__time = 0;
	this.__progress = 0;
	this.__state = 0;
	this.__isComplete = false;
	drcJS_core_EventDispacher.call(this);
	this.__funcToRun = func;
	if(shoudlRun) {
		this.run();
	}
};
drcJS_core_Promise.__name__ = true;
drcJS_core_Promise.all = function(promises) {
	var _count = 0;
	var _results = [];
	return new drcJS_core_Promise(function(resolve,reject,advance) {
		var _resolve = function(index,promise) {
			_count += 1;
			_results[index] = promise.get_result();
			if(_count == promises.length) {
				resolve(_results);
			}
		};
		var _reject = function() {
			throw haxe_Exception.thrown("Promise rejected!");
		};
		var _g = 0;
		var _g1 = promises.length;
		while(_g < _g1) {
			var i = [_g++];
			if(promises[i[0]] == null) {
				_resolve(i[0],null);
				continue;
			}
			promises[i[0]].onComplete((function(i) {
				return function(promise,type) {
					_resolve(i[0],promise);
				};
			})(i));
			promises[i[0]].onReject((function() {
				return function(promise,type) {
					_reject();
				};
			})());
		}
	});
};
drcJS_core_Promise.__super__ = drcJS_core_EventDispacher;
drcJS_core_Promise.prototype = $extend(drcJS_core_EventDispacher.prototype,{
	run: function() {
		this.__time = HxOverrides.now() / 1000;
		if(this.__state == 0) {
			this.__state = 1;
			this.__funcToRun($bind(this,this.__resolve),$bind(this,this.__reject),$bind(this,this.__advance));
		}
	}
	,onComplete: function(listener) {
		if(listener == null) {
			return this;
		}
		if(this.__state == 2) {
			listener(this,0);
			if(this.__queuedPromise != null) {
				this.__queuedPromise.run();
			}
		} else if(this.__state == 1) {
			if(this.__completeListeners == null) {
				this.__completeListeners = new drcJS_core_EventDispacher();
			}
			this.addEventListener(listener,1);
		}
		return this;
	}
	,onReject: function(listener) {
		if(listener == null) {
			return this;
		}
		return this;
	}
	,__resolve: function(result) {
		this.__time = HxOverrides.now() / 1000 - this.__time;
		this.__state = 2;
		this.__isComplete = true;
		this.__result = result;
		this.dispatchEvent(this,1);
	}
	,__reject: function() {
		this.__time = HxOverrides.now() / 1000 - this.__time;
		this.__state = 2;
		this.__isComplete = true;
		this.dispatchEvent(this,2);
	}
	,__advance: function(value) {
		this.__progress = value;
		this.dispatchEvent(this,3);
	}
	,get_result: function() {
		return this.__result;
	}
	,__class__: drcJS_core_Promise
});
var drcJS_data_Profile = function(name) {
	this.uniforms = [];
	this.textures = [];
	this.attributes = [];
	this.__name = name;
};
drcJS_data_Profile.__name__ = true;
drcJS_data_Profile.prototype = {
	addAttribute: function(attribute) {
		this.attributes.push(attribute);
	}
	,addUniform: function(uniform) {
		this.uniforms.push(uniform);
	}
	,get_name: function() {
		return this.__name;
	}
	,__class__: drcJS_data_Profile
};
var drcJS_data_Texture = function(data,bytesPerPixel,width,height) {
	if(data == null) {
		return;
	}
	this.upload(data,bytesPerPixel,width,height);
};
drcJS_data_Texture.__name__ = true;
drcJS_data_Texture.prototype = {
	create: function(width,height) {
		this.__bytesPerPixel = 4;
		this.__width = width;
		this.__height = height;
		if(this.__bytesPerPixel == 4) {
			this.__transparent = true;
		}
		this.glTexture = drcJS_utils_Common.context.generateTexture();
		drcJS_utils_Common.context.setSamplerState({ magnification : 9728, minification : 9728, wrapX : 33071, wrapY : 33071});
		drcJS_utils_Common.context.loadTexture(this.__width,this.__height,this.__bytesPerPixel,null);
	}
	,upload: function(data,bytesPerPixel,width,height) {
		this.bytes = data;
		this.__bytesPerPixel = bytesPerPixel;
		this.__width = width;
		this.__height = height;
		if(this.__bytesPerPixel == 4) {
			this.__transparent = true;
		}
		this.glTexture = drcJS_utils_Common.context.generateTexture();
		drcJS_utils_Common.context.setSamplerState({ magnification : 9728, minification : 9728, wrapX : 33071, wrapY : 33071});
		drcJS_utils_Common.context.loadTexture(this.__width,this.__height,this.__bytesPerPixel,this.bytes);
	}
	,get_height: function() {
		return this.__height;
	}
	,get_width: function() {
		return this.__width;
	}
	,__class__: drcJS_data_Texture
};
var drcJS_data_Vertices = {};
drcJS_data_Vertices.insert = function(this1,count,value) {
	var _g = 0;
	var _g1 = count;
	while(_g < _g1) {
		var value = _g++;
		this1.push(1);
	}
};
var drcJS_debug_Log = function() { };
drcJS_debug_Log.__name__ = true;
drcJS_debug_Log.print = function(value) {
	console.log("drcJS/debug/Log.hx:9:",value);
};
var drcJS_display_Attribute = function(name,format,offset,pointers) {
	this.__name = name;
	this.__format = format;
	this.__offset = offset;
	this.__pointers = pointers;
};
drcJS_display_Attribute.__name__ = true;
drcJS_display_Attribute.prototype = {
	assignLocation: function(location) {
		this.__location = location;
	}
	,get_name: function() {
		return this.__name;
	}
	,get_format: function() {
		return this.__format;
	}
	,get_offset: function() {
		return this.__location;
	}
	,__class__: drcJS_display_Attribute
};
var drcJS_display_Graphic = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.__y = 0;
	this.__x = 0;
	this.__visible = true;
	this.__width = 0;
	this.__verticesToRender = 0;
	this.__shouldTransform = true;
	this.__originY = 0;
	this.__originX = 0;
	this.__height = 0;
	var this1 = [];
	this.vertices = this1;
	drcJS_part_Object.call(this);
	this.__x = x;
	this.__y = y;
};
drcJS_display_Graphic.__name__ = true;
drcJS_display_Graphic.__super__ = drcJS_part_Object;
drcJS_display_Graphic.prototype = $extend(drcJS_part_Object.prototype,{
	render: function() {
	}
	,get_height: function() {
		return this.__height;
	}
	,set_height: function(value) {
		this.__height = value;
		this.__shouldTransform = true;
		return this.__height;
	}
	,get_originX: function() {
		return this.__originX;
	}
	,get_originY: function() {
		return this.__originY;
	}
	,get_width: function() {
		return this.__width;
	}
	,set_width: function(value) {
		this.__width = value;
		this.__shouldTransform = true;
		return this.__width;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,__class__: drcJS_display_Graphic
});
var drcJS_display_Drawable = function(profile) {
	this.__indicesToRender = 0;
	this.uniforms = new haxe_ds_StringMap();
	this.shadings = new haxe_ds_StringMap();
	this.matrix = drcJS_math_Matrix._new();
	this.textures = [];
	var this1 = [];
	this.indices = this1;
	this.mode = 4;
	if(profile == null) {
		throw haxe_Exception.thrown("Profile cannot be null");
	}
	drcJS_display_Graphic.call(this,0,0);
	this.profile = profile;
	this.blendFactors = { source : 770, destination : 771};
	this.textureParams = { magnification : 9728, minification : 9728, wrapX : 33071, wrapY : 33071};
	var _g = 0;
	var _g1 = profile.attributes.length;
	while(_g < _g1) {
		var i = _g++;
		var _g2 = 0;
		var _g3 = profile.attributes[i].__pointers.length;
		while(_g2 < _g3) {
			var j = _g2++;
			var _name = profile.attributes[i].__pointers[j].name;
			var _pos = profile.attributes[i].__pointers[j].position;
			var _positions = [];
			var sum = _pos;
			_positions.push(sum);
			sum = sum + profile.dataPerVertex;
			_positions.push(sum);
			sum = sum + profile.dataPerVertex;
			_positions.push(sum);
			sum = sum + profile.dataPerVertex;
			_positions.push(sum);
			sum = sum + profile.dataPerVertex;
			var shading = { positions : _positions};
			this.shadings.h[_name] = shading;
		}
	}
	var _g = 0;
	var _g1 = profile.uniforms;
	while(_g < _g1.length) {
		var uniform = _g1[_g];
		++_g;
		this.__setUniform(uniform);
	}
};
drcJS_display_Drawable.__name__ = true;
drcJS_display_Drawable.__super__ = drcJS_display_Graphic;
drcJS_display_Drawable.prototype = $extend(drcJS_display_Graphic.prototype,{
	__setUniform: function(uniform) {
		switch(uniform.get_format()) {
		case "float1":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1.0],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "float2":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1.0,1.0],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "float3":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1.0,1.0,1.0],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "float4":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1.0,1.0,1.0,1.0],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "int1":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "int2":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1,1],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "int3":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1,1,1],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "int4":
			var this1 = this.uniforms;
			var key = uniform.get_name();
			var value = new drcJS_display_UniformParam([1,1,1,1],uniform.get_location(),uniform.get_format());
			this1.h[key] = value;
			break;
		case "mat4":
			break;
		default:
		}
	}
	,__class__: drcJS_display_Drawable
});
var drcJS_display_Program = function(glProgram) {
	this.__glProgram = glProgram;
};
drcJS_display_Program.__name__ = true;
drcJS_display_Program.prototype = {
	get_innerData: function() {
		return this.__glProgram;
	}
	,__class__: drcJS_display_Program
};
var drcJS_display_Stage = function(profile) {
	this.__drawCalls = 0;
	drcJS_display_Drawable.call(this,profile);
	this.__context = drcJS_utils_Common.context;
	drcJS_data_Vertices.insert(this.vertices,profile.dataPerVertex * 3,0);
	this.set_width(640);
	this.set_height(480);
	this.textures = [];
	this.textures[0] = new drcJS_data_Texture();
	this.textures[0].create(640,480);
	this.vertices = [0,0,0,0,1,0,960,0,0,-1,1280,0,0,2,1];
	this.indices = [0,1,2,0,2,3];
	this.setUV(0,1,2,-1);
	this.__verticesToRender = 3;
	this.__indicesToRender = 3;
	this.matrix = drcJS_math_Matrix.createOrthoMatrix(0,640,480,0,1000,-1000);
	drcJS_backend_web_core_GL.gl.lineWidth(1);
};
drcJS_display_Stage.__name__ = true;
drcJS_display_Stage.__super__ = drcJS_display_Drawable;
drcJS_display_Stage.prototype = $extend(drcJS_display_Drawable.prototype,{
	setToDraw: function() {
		this.__context.setRenderToTexture(this.textures[0]);
		this.__context.clear(0.2,0,0.2,1);
	}
	,present: function() {
		if(this.__shouldTransform) {
			this.__shouldTransform = false;
		}
		this.__context.setViewport(0,0,this.get_width() | 0,this.get_height() | 0);
		this.__drawTriangles(this,this.matrix);
		this.__drawCalls = 0;
	}
	,setUV: function(x,y,width,height) {
		this.vertices[this.shadings.h["u"].positions[0]] = x;
		this.vertices[this.shadings.h["u"].positions[1]] = x;
		this.vertices[this.shadings.h["u"].positions[2]] = width;
		this.vertices[this.shadings.h["v"].positions[0]] = y;
		this.vertices[this.shadings.h["v"].positions[1]] = height;
		this.vertices[this.shadings.h["v"].positions[2]] = y;
	}
	,draw: function(image,matrix) {
		this.__drawCalls++;
		this.__drawTriangles(image,matrix);
	}
	,__drawTriangles: function(drawable,matrix) {
		var program = drawable.profile.program.get_innerData();
		drcJS_backend_web_core_GL.gl.useProgram(program);
		this.__context.generateVertexBuffer();
		this.__context.loadVertexBuffer(drawable.vertices);
		this.__context.generateIndexBuffer();
		this.__context.loadIndexBuffer(drawable.indices);
		var program = drawable.profile.program.get_innerData();
		var matrixLocation = drcJS_backend_web_core_GL.gl.getUniformLocation(program,"matrix");
		var data = drcJS_math_Matrix.getData(matrix);
		drcJS_backend_web_core_GL.gl.uniformMatrix4fv(matrixLocation,false,data);
		var h = drawable.uniforms.h;
		var uniform_h = h;
		var uniform_keys = Object.keys(h);
		var uniform_length = uniform_keys.length;
		var uniform_current = 0;
		while(uniform_current < uniform_length) {
			var uniform = uniform_h[uniform_keys[uniform_current++]];
			this.__context.setUniform(uniform);
		}
		this.__context.generateVertexBuffer();
		var offset = 0;
		var _g = 0;
		var _g1 = drawable.profile.attributes.length;
		while(_g < _g1) {
			var i = _g++;
			this.__context.setAttributePointer(drawable.profile.attributes[i].get_offset(),drawable.profile.attributes[i].get_format(),false,drawable.profile.dataPerVertex * 4,offset * 4);
			offset += drawable.profile.attributes[i].get_format();
		}
		offset = 1;
		var _g = 0;
		var _g1 = drawable.textures.length;
		while(_g < _g1) {
			var i = _g++;
			var unit = i;
			var name = drawable.profile.textures[i].name;
			var program = drawable.profile.program.get_innerData();
			var loc = drcJS_backend_web_core_GL.gl.getUniformLocation(program,name);
			drcJS_backend_web_core_GL.gl.uniform1i(loc,i);
			drcJS_backend_web_core_GL.gl.activeTexture(33984 + i);
			drcJS_backend_web_core_GL.gl.bindTexture(3553,drawable.textures[i].glTexture);
		}
		this.__context.generateIndexBuffer();
		this.__context.drawElements(drawable.mode,0,drawable.__indicesToRender);
	}
	,set_height: function(value) {
		this.vertices[this.shadings.h["y"].positions[0]] = 0 - this.get_originY() * 2;
		this.vertices[this.shadings.h["y"].positions[1]] = 2 * (value - this.get_originY());
		this.vertices[this.shadings.h["y"].positions[2]] = 0 - this.get_originY() * 2;
		return drcJS_display_Drawable.prototype.set_height.call(this,value);
	}
	,set_width: function(value) {
		this.vertices[this.shadings.h["x"].positions[0]] = 0 - this.get_originX() * 2;
		this.vertices[this.shadings.h["x"].positions[1]] = 0 - this.get_originX() * 2;
		this.vertices[this.shadings.h["x"].positions[2]] = 2 * (value - this.get_originX());
		return drcJS_display_Drawable.prototype.set_width.call(this,value);
	}
	,__class__: drcJS_display_Stage
});
var drcJS_display_Uniform = function(name,format) {
	this.__name = name;
	this.__format = format;
};
drcJS_display_Uniform.__name__ = true;
drcJS_display_Uniform.prototype = {
	assignLocation: function(location) {
		this.__location = location;
	}
	,get_name: function() {
		return this.__name;
	}
	,get_format: function() {
		return this.__format;
	}
	,get_location: function() {
		return this.__location;
	}
	,__class__: drcJS_display_Uniform
};
var drcJS_display_UniformParam = function(values,index,type) {
	this.__value = values;
	this.index = index;
	this.type = type;
};
drcJS_display_UniformParam.__name__ = true;
drcJS_display_UniformParam.prototype = {
	getPackedValue: function() {
		return this.__value;
	}
	,__class__: drcJS_display_UniformParam
};
var drcJS_format_Color = $hxEnums["drcJS.format.Color"] = { __ename__:true,__constructs__:null
	,ColGrey: ($_=function(alpha) { return {_hx_index:0,alpha:alpha,__enum__:"drcJS.format.Color",toString:$estr}; },$_._hx_name="ColGrey",$_.__params__ = ["alpha"],$_)
	,ColTrue: ($_=function(alpha) { return {_hx_index:1,alpha:alpha,__enum__:"drcJS.format.Color",toString:$estr}; },$_._hx_name="ColTrue",$_.__params__ = ["alpha"],$_)
	,ColIndexed: {_hx_name:"ColIndexed",_hx_index:2,__enum__:"drcJS.format.Color",toString:$estr}
};
drcJS_format_Color.__constructs__ = [drcJS_format_Color.ColGrey,drcJS_format_Color.ColTrue,drcJS_format_Color.ColIndexed];
var drcJS_format_Chunk = $hxEnums["drcJS.format.Chunk"] = { __ename__:true,__constructs__:null
	,CEnd: {_hx_name:"CEnd",_hx_index:0,__enum__:"drcJS.format.Chunk",toString:$estr}
	,CHeader: ($_=function(h) { return {_hx_index:1,h:h,__enum__:"drcJS.format.Chunk",toString:$estr}; },$_._hx_name="CHeader",$_.__params__ = ["h"],$_)
	,CData: ($_=function(b) { return {_hx_index:2,b:b,__enum__:"drcJS.format.Chunk",toString:$estr}; },$_._hx_name="CData",$_.__params__ = ["b"],$_)
	,CPalette: ($_=function(b) { return {_hx_index:3,b:b,__enum__:"drcJS.format.Chunk",toString:$estr}; },$_._hx_name="CPalette",$_.__params__ = ["b"],$_)
	,CUnknown: ($_=function(id,data) { return {_hx_index:4,id:id,data:data,__enum__:"drcJS.format.Chunk",toString:$estr}; },$_._hx_name="CUnknown",$_.__params__ = ["id","data"],$_)
};
drcJS_format_Chunk.__constructs__ = [drcJS_format_Chunk.CEnd,drcJS_format_Chunk.CHeader,drcJS_format_Chunk.CData,drcJS_format_Chunk.CPalette,drcJS_format_Chunk.CUnknown];
var drcJS_format_PNG = function(input) {
	input.set_bigEndian(true);
	var pos = 0;
	var i = 137;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 80;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 78;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 71;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 13;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 10;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 26;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var i = 10;
	if(input.readByte() != i) {
		throw haxe_Exception.thrown("Invalid header");
	}
	++pos;
	var l = new haxe_ds_List();
	while(true) {
		var c = this.readChunk(input);
		l.add(c);
		if(c == drcJS_format_Chunk.CEnd) {
			break;
		}
	}
	this.data = l;
	var header = drcJS_format_PNG.getHeader(this.data);
};
drcJS_format_PNG.__name__ = true;
drcJS_format_PNG.getHeader = function(d) {
	var _g_head = d.h;
	while(_g_head != null) {
		var val = _g_head.item;
		_g_head = _g_head.next;
		var c = val;
		if(c._hx_index == 1) {
			var h = c.h;
			return h;
		}
	}
	throw haxe_Exception.thrown("Header not found");
};
drcJS_format_PNG.getPalette = function(d) {
	var _g_head = d.h;
	while(_g_head != null) {
		var val = _g_head.item;
		_g_head = _g_head.next;
		var c = val;
		if(c._hx_index == 3) {
			var b = c.b;
			return b;
		}
	}
	return null;
};
drcJS_format_PNG.prototype = {
	readChunk: function(i) {
		var dataLen = i.readInt32();
		var id = i.readString(4);
		var data = i.read(dataLen);
		var crc = i.readInt32();
		var c_crc = -1;
		var tmp = (c_crc ^ HxOverrides.cca(id,0)) & 255;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		c_crc = c_crc >>> 8 ^ tmp;
		var tmp = (c_crc ^ HxOverrides.cca(id,1)) & 255;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		c_crc = c_crc >>> 8 ^ tmp;
		var tmp = (c_crc ^ HxOverrides.cca(id,2)) & 255;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		c_crc = c_crc >>> 8 ^ tmp;
		var tmp = (c_crc ^ HxOverrides.cca(id,3)) & 255;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
		c_crc = c_crc >>> 8 ^ tmp;
		var b = data.b.bufferValue;
		var _g = 0;
		var _g1 = data.length;
		while(_g < _g1) {
			var i = _g++;
			var tmp = (c_crc ^ b.bytes[i]) & 255;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			c_crc = c_crc >>> 8 ^ tmp;
		}
		if((c_crc ^ -1) != crc) {
			throw haxe_Exception.thrown("CRC check failure");
		}
		switch(id) {
		case "IDAT":
			return drcJS_format_Chunk.CData(data);
		case "IEND":
			return drcJS_format_Chunk.CEnd;
		case "IHDR":
			return drcJS_format_Chunk.CHeader(this.readHeader(new haxe_io_BytesInput(data)));
		case "PLTE":
			return drcJS_format_Chunk.CPalette(data);
		default:
			return drcJS_format_Chunk.CUnknown(id,data);
		}
	}
	,readHeader: function(i) {
		i.set_bigEndian(true);
		var width = i.readInt32();
		var height = i.readInt32();
		var colbits = i.readByte();
		var color = i.readByte();
		var color1;
		switch(color) {
		case 0:
			color1 = drcJS_format_Color.ColGrey(false);
			break;
		case 2:
			color1 = drcJS_format_Color.ColTrue(false);
			break;
		case 3:
			color1 = drcJS_format_Color.ColIndexed;
			break;
		case 4:
			color1 = drcJS_format_Color.ColGrey(true);
			break;
		case 6:
			color1 = drcJS_format_Color.ColTrue(true);
			break;
		default:
			throw haxe_Exception.thrown("Unknown color model " + color + ":" + colbits);
		}
		var compress = i.readByte();
		var filter = i.readByte();
		if(compress != 0 || filter != 0) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var interlace = i.readByte();
		if(interlace != 0 && interlace != 1) {
			throw haxe_Exception.thrown("Invalid header");
		}
		return { width : width, height : height, colbits : colbits, color : color1, interlaced : interlace == 1};
	}
	,extract: function(flipY) {
		if(flipY == null) {
			flipY = false;
		}
		var d = this.data;
		var bytes = null;
		var h = drcJS_format_PNG.getHeader(d);
		var bgra = bytes == null ? new haxe_io_Bytes(new ArrayBuffer(h.width * h.height * 4)) : bytes;
		var data = null;
		var fullData = null;
		var _g_head = d.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var c = val;
			if(c._hx_index == 2) {
				var b = c.b;
				if(fullData != null) {
					fullData.add(b);
				} else if(data == null) {
					data = b;
				} else {
					fullData = new haxe_io_BytesBuffer();
					fullData.add(data);
					fullData.add(b);
					data = null;
				}
			}
		}
		if(fullData != null) {
			data = fullData.getBytes();
		}
		if(data == null) {
			throw haxe_Exception.thrown("Data not found");
		}
		data = haxe_zip_Uncompress.run(data);
		var r = 0;
		var w = 0;
		var lineDelta = 0;
		if(flipY) {
			lineDelta = -h.width * 8;
			w = (h.height - 1) * (h.width * 4);
		}
		var flipY1 = flipY ? -1 : 1;
		var _g = h.color;
		switch(_g._hx_index) {
		case 0:
			var alpha = _g.alpha;
			if(h.colbits != 8) {
				throw haxe_Exception.thrown("Unsupported color mode");
			}
			var width = h.width;
			var stride = (alpha ? 2 : 1) * width + 1;
			if(data.length < h.height * stride) {
				throw haxe_Exception.thrown("Not enough data");
			}
			var alphvaIdx = -1;
			if(!alpha) {
				var _g1_head = d.h;
				while(_g1_head != null) {
					var val = _g1_head.item;
					_g1_head = _g1_head.next;
					var t = val;
					if(t._hx_index == 4) {
						if(t.id == "tRNS") {
							var data1 = t.data;
							if(data1.length >= 2) {
								alphvaIdx = data1.b[1];
							}
							break;
						}
					}
				}
			}
			var _g1 = 0;
			var _g2 = h.height;
			while(_g1 < _g2) {
				var y = _g1++;
				var f = data.b[r++];
				switch(f) {
				case 0:
					if(alpha) {
						var _g3 = 0;
						var _g4 = width;
						while(_g3 < _g4) {
							var x = _g3++;
							var v = data.b[r++];
							bgra.b[w++] = v;
							bgra.b[w++] = v;
							bgra.b[w++] = v;
							bgra.b[w++] = data.b[r++];
						}
					} else {
						var _g5 = 0;
						var _g6 = width;
						while(_g5 < _g6) {
							var x1 = _g5++;
							var v1 = data.b[r++];
							bgra.b[w++] = v1;
							bgra.b[w++] = v1;
							bgra.b[w++] = v1;
							bgra.b[w++] = v1 == alphvaIdx ? 0 : 255;
						}
					}
					break;
				case 1:
					var cv = 0;
					var ca = 0;
					if(alpha) {
						var _g7 = 0;
						var _g8 = width;
						while(_g7 < _g8) {
							var x2 = _g7++;
							cv += data.b[r++];
							bgra.b[w++] = cv;
							bgra.b[w++] = cv;
							bgra.b[w++] = cv;
							ca += data.b[r++];
							bgra.b[w++] = ca;
						}
					} else {
						var _g9 = 0;
						var _g10 = width;
						while(_g9 < _g10) {
							var x3 = _g9++;
							cv += data.b[r++];
							bgra.b[w++] = cv;
							bgra.b[w++] = cv;
							bgra.b[w++] = cv;
							bgra.b[w++] = cv == alphvaIdx ? 0 : 255;
						}
					}
					break;
				case 2:
					var stride = y == 0 ? 0 : width * 4 * flipY1;
					if(alpha) {
						var _g11 = 0;
						var _g12 = width;
						while(_g11 < _g12) {
							var x4 = _g11++;
							var v2 = data.b[r++] + bgra.b[w - stride];
							bgra.b[w++] = v2;
							bgra.b[w++] = v2;
							bgra.b[w++] = v2;
							bgra.b[w++] = data.b[r++] + bgra.b[w - stride];
						}
					} else {
						var _g13 = 0;
						var _g14 = width;
						while(_g13 < _g14) {
							var x5 = _g13++;
							var v3 = data.b[r++] + bgra.b[w - stride];
							bgra.b[w++] = v3;
							bgra.b[w++] = v3;
							bgra.b[w++] = v3;
							bgra.b[w++] = v3 == alphvaIdx ? 0 : 255;
						}
					}
					break;
				case 3:
					var cv1 = 0;
					var ca1 = 0;
					var stride1 = y == 0 ? 0 : width * 4 * flipY1;
					if(alpha) {
						var _g15 = 0;
						var _g16 = width;
						while(_g15 < _g16) {
							var x6 = _g15++;
							cv1 = data.b[r++] + (cv1 + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cv1;
							bgra.b[w++] = cv1;
							bgra.b[w++] = cv1;
							ca1 = data.b[r++] + (ca1 + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = ca1;
						}
					} else {
						var _g17 = 0;
						var _g18 = width;
						while(_g17 < _g18) {
							var x7 = _g17++;
							cv1 = data.b[r++] + (cv1 + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cv1;
							bgra.b[w++] = cv1;
							bgra.b[w++] = cv1;
							bgra.b[w++] = cv1 == alphvaIdx ? 0 : 255;
						}
					}
					break;
				case 4:
					var stride2 = width * 4 * flipY1;
					var cv2 = 0;
					var ca2 = 0;
					if(alpha) {
						var _g19 = 0;
						var _g20 = width;
						while(_g19 < _g20) {
							var x8 = _g19++;
							var b = y == 0 ? 0 : bgra.b[w - stride2];
							var c = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k = cv2 + b - c;
							var pa = k - cv2;
							if(pa < 0) {
								pa = -pa;
							}
							var pb = k - b;
							if(pb < 0) {
								pb = -pb;
							}
							var pc = k - c;
							if(pc < 0) {
								pc = -pc;
							}
							var pos = r++;
							cv2 = (pa <= pb && pa <= pc ? cv2 : pb <= pc ? b : c) + data.b[pos] & 255;
							bgra.b[w++] = cv2;
							bgra.b[w++] = cv2;
							bgra.b[w++] = cv2;
							var b1 = y == 0 ? 0 : bgra.b[w - stride2];
							var c1 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k1 = ca2 + b1 - c1;
							var pa1 = k1 - ca2;
							if(pa1 < 0) {
								pa1 = -pa1;
							}
							var pb1 = k1 - b1;
							if(pb1 < 0) {
								pb1 = -pb1;
							}
							var pc1 = k1 - c1;
							if(pc1 < 0) {
								pc1 = -pc1;
							}
							var pos1 = r++;
							ca2 = (pa1 <= pb1 && pa1 <= pc1 ? ca2 : pb1 <= pc1 ? b1 : c1) + data.b[pos1] & 255;
							bgra.b[w++] = ca2;
						}
					} else {
						var _g21 = 0;
						var _g22 = width;
						while(_g21 < _g22) {
							var x9 = _g21++;
							var b2 = y == 0 ? 0 : bgra.b[w - stride2];
							var c2 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k2 = cv2 + b2 - c2;
							var pa2 = k2 - cv2;
							if(pa2 < 0) {
								pa2 = -pa2;
							}
							var pb2 = k2 - b2;
							if(pb2 < 0) {
								pb2 = -pb2;
							}
							var pc2 = k2 - c2;
							if(pc2 < 0) {
								pc2 = -pc2;
							}
							var pos2 = r++;
							cv2 = (pa2 <= pb2 && pa2 <= pc2 ? cv2 : pb2 <= pc2 ? b2 : c2) + data.b[pos2] & 255;
							bgra.b[w++] = cv2;
							bgra.b[w++] = cv2;
							bgra.b[w++] = cv2;
							bgra.b[w++] = cv2 == alphvaIdx ? 0 : 255;
						}
					}
					break;
				default:
					throw haxe_Exception.thrown("Invalid filter " + f);
				}
				w += lineDelta;
			}
			break;
		case 1:
			var alpha = _g.alpha;
			if(h.colbits != 8) {
				throw haxe_Exception.thrown("Unsupported color mode");
			}
			var width = h.width;
			var stride = (alpha ? 4 : 3) * width + 1;
			if(data.length < h.height * stride) {
				throw haxe_Exception.thrown("Not enough data");
			}
			var alphaRed = -1;
			var alphaGreen = -1;
			var alphaBlue = -1;
			if(!alpha) {
				var _g1_head = d.h;
				while(_g1_head != null) {
					var val = _g1_head.item;
					_g1_head = _g1_head.next;
					var t = val;
					if(t._hx_index == 4) {
						if(t.id == "tRNS") {
							var data1 = t.data;
							if(data1.length >= 6) {
								alphaRed = data1.b[1];
								alphaGreen = data1.b[3];
								alphaBlue = data1.b[5];
							}
							break;
						}
					}
				}
			}
			var cr = 0;
			var cg = 0;
			var cb = 0;
			var ca = 0;
			var _g = 0;
			var _g1 = h.height;
			while(_g < _g1) {
				var y = _g++;
				var f = data.b[r++];
				switch(f) {
				case 0:
					if(alpha) {
						var _g2 = 0;
						var _g3 = width;
						while(_g2 < _g3) {
							var x = _g2++;
							bgra.b[w++] = data.b[r];
							bgra.b[w++] = data.b[r + 1];
							bgra.b[w++] = data.b[r + 2];
							bgra.b[w++] = data.b[r + 3];
							r += 4;
						}
					} else {
						var _g4 = 0;
						var _g5 = width;
						while(_g4 < _g5) {
							var x1 = _g4++;
							cr = data.b[r];
							bgra.b[w++] = cr;
							cg = data.b[r + 1];
							bgra.b[w++] = cg;
							cb = data.b[r + 2];
							bgra.b[w++] = cb;
							bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
							r += 3;
						}
					}
					break;
				case 1:
					ca = 0;
					cb = ca;
					cg = cb;
					cr = cg;
					if(alpha) {
						var _g6 = 0;
						var _g7 = width;
						while(_g6 < _g7) {
							var x2 = _g6++;
							cr += data.b[r];
							bgra.b[w++] = cr;
							cg += data.b[r + 1];
							bgra.b[w++] = cg;
							cb += data.b[r + 2];
							bgra.b[w++] = cb;
							ca += data.b[r + 3];
							bgra.b[w++] = ca;
							r += 4;
						}
					} else {
						var _g8 = 0;
						var _g9 = width;
						while(_g8 < _g9) {
							var x3 = _g8++;
							cr += data.b[r];
							cg += data.b[r + 1];
							cb += data.b[r + 2];
							bgra.b[w++] = cr;
							bgra.b[w++] = cg;
							bgra.b[w++] = cb;
							bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
							r += 3;
						}
					}
					break;
				case 2:
					var stride = y == 0 ? 0 : width * 4 * flipY1;
					if(alpha) {
						var _g10 = 0;
						var _g11 = width;
						while(_g10 < _g11) {
							var x4 = _g10++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride];
							++w;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride];
							++w;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride];
							++w;
							bgra.b[w] = data.b[r + 3] + bgra.b[w - stride];
							++w;
							r += 4;
						}
					} else {
						var _g12 = 0;
						var _g13 = width;
						while(_g12 < _g13) {
							var x5 = _g12++;
							cb = data.b[r] + bgra.b[w - stride];
							bgra.b[w] = cb;
							++w;
							cg = data.b[r + 1] + bgra.b[w - stride];
							bgra.b[w] = cg;
							++w;
							cr = data.b[r + 2] + bgra.b[w - stride];
							bgra.b[w] = cr;
							++w;
							bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
							r += 3;
						}
					}
					break;
				case 3:
					ca = 0;
					cb = ca;
					cg = cb;
					cr = cg;
					var stride1 = y == 0 ? 0 : width * 4 * flipY1;
					if(alpha) {
						var _g14 = 0;
						var _g15 = width;
						while(_g14 < _g15) {
							var x6 = _g14++;
							cb = data.b[r] + (cb + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cb;
							cg = data.b[r + 1] + (cg + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cg;
							cr = data.b[r + 2] + (cr + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cr;
							ca = data.b[r + 3] + (ca + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = ca;
							r += 4;
						}
					} else {
						var _g16 = 0;
						var _g17 = width;
						while(_g16 < _g17) {
							var x7 = _g16++;
							cb = data.b[r] + (cb + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cb;
							cg = data.b[r + 1] + (cg + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cg;
							cr = data.b[r + 2] + (cr + bgra.b[w - stride1] >> 1) & 255;
							bgra.b[w++] = cr;
							bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
							r += 3;
						}
					}
					break;
				case 4:
					var stride2 = width * 4 * flipY1;
					ca = 0;
					cb = ca;
					cg = cb;
					cr = cg;
					if(alpha) {
						var _g18 = 0;
						var _g19 = width;
						while(_g18 < _g19) {
							var x8 = _g18++;
							var b = y == 0 ? 0 : bgra.b[w - stride2];
							var c = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k = cb + b - c;
							var pa = k - cb;
							if(pa < 0) {
								pa = -pa;
							}
							var pb = k - b;
							if(pb < 0) {
								pb = -pb;
							}
							var pc = k - c;
							if(pc < 0) {
								pc = -pc;
							}
							cb = (pa <= pb && pa <= pc ? cb : pb <= pc ? b : c) + data.b[r] & 255;
							bgra.b[w++] = cb;
							var b1 = y == 0 ? 0 : bgra.b[w - stride2];
							var c1 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k1 = cg + b1 - c1;
							var pa1 = k1 - cg;
							if(pa1 < 0) {
								pa1 = -pa1;
							}
							var pb1 = k1 - b1;
							if(pb1 < 0) {
								pb1 = -pb1;
							}
							var pc1 = k1 - c1;
							if(pc1 < 0) {
								pc1 = -pc1;
							}
							cg = (pa1 <= pb1 && pa1 <= pc1 ? cg : pb1 <= pc1 ? b1 : c1) + data.b[r + 1] & 255;
							bgra.b[w++] = cg;
							var b2 = y == 0 ? 0 : bgra.b[w - stride2];
							var c2 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k2 = cr + b2 - c2;
							var pa2 = k2 - cr;
							if(pa2 < 0) {
								pa2 = -pa2;
							}
							var pb2 = k2 - b2;
							if(pb2 < 0) {
								pb2 = -pb2;
							}
							var pc2 = k2 - c2;
							if(pc2 < 0) {
								pc2 = -pc2;
							}
							cr = (pa2 <= pb2 && pa2 <= pc2 ? cr : pb2 <= pc2 ? b2 : c2) + data.b[r + 2] & 255;
							bgra.b[w++] = cr;
							var b3 = y == 0 ? 0 : bgra.b[w - stride2];
							var c3 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k3 = ca + b3 - c3;
							var pa3 = k3 - ca;
							if(pa3 < 0) {
								pa3 = -pa3;
							}
							var pb3 = k3 - b3;
							if(pb3 < 0) {
								pb3 = -pb3;
							}
							var pc3 = k3 - c3;
							if(pc3 < 0) {
								pc3 = -pc3;
							}
							ca = (pa3 <= pb3 && pa3 <= pc3 ? ca : pb3 <= pc3 ? b3 : c3) + data.b[r + 3] & 255;
							bgra.b[w++] = ca;
							r += 4;
						}
					} else {
						var _g20 = 0;
						var _g21 = width;
						while(_g20 < _g21) {
							var x9 = _g20++;
							var b4 = y == 0 ? 0 : bgra.b[w - stride2];
							var c4 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k4 = cb + b4 - c4;
							var pa4 = k4 - cb;
							if(pa4 < 0) {
								pa4 = -pa4;
							}
							var pb4 = k4 - b4;
							if(pb4 < 0) {
								pb4 = -pb4;
							}
							var pc4 = k4 - c4;
							if(pc4 < 0) {
								pc4 = -pc4;
							}
							cb = (pa4 <= pb4 && pa4 <= pc4 ? cb : pb4 <= pc4 ? b4 : c4) + data.b[r] & 255;
							bgra.b[w++] = cb;
							var b5 = y == 0 ? 0 : bgra.b[w - stride2];
							var c5 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k5 = cg + b5 - c5;
							var pa5 = k5 - cg;
							if(pa5 < 0) {
								pa5 = -pa5;
							}
							var pb5 = k5 - b5;
							if(pb5 < 0) {
								pb5 = -pb5;
							}
							var pc5 = k5 - c5;
							if(pc5 < 0) {
								pc5 = -pc5;
							}
							cg = (pa5 <= pb5 && pa5 <= pc5 ? cg : pb5 <= pc5 ? b5 : c5) + data.b[r + 1] & 255;
							bgra.b[w++] = cg;
							var b6 = y == 0 ? 0 : bgra.b[w - stride2];
							var c6 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
							var k6 = cr + b6 - c6;
							var pa6 = k6 - cr;
							if(pa6 < 0) {
								pa6 = -pa6;
							}
							var pb6 = k6 - b6;
							if(pb6 < 0) {
								pb6 = -pb6;
							}
							var pc6 = k6 - c6;
							if(pc6 < 0) {
								pc6 = -pc6;
							}
							cr = (pa6 <= pb6 && pa6 <= pc6 ? cr : pb6 <= pc6 ? b6 : c6) + data.b[r + 2] & 255;
							bgra.b[w++] = cr;
							bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
							r += 3;
						}
					}
					break;
				default:
					throw haxe_Exception.thrown("Invalid filter " + f);
				}
				w += lineDelta;
			}
			break;
		case 2:
			var pal = drcJS_format_PNG.getPalette(d);
			if(pal == null) {
				throw haxe_Exception.thrown("PNG Palette is missing");
			}
			var alpha = null;
			var _g1_head = d.h;
			while(_g1_head != null) {
				var val = _g1_head.item;
				_g1_head = _g1_head.next;
				var t = val;
				if(t._hx_index == 4) {
					if(t.id == "tRNS") {
						var data1 = t.data;
						alpha = data1;
						break;
					}
				}
			}
			if(alpha != null && alpha.length < 1 << h.colbits) {
				var alpha2 = new haxe_io_Bytes(new ArrayBuffer(1 << h.colbits));
				alpha2.blit(0,alpha,0,alpha.length);
				alpha2.fill(alpha.length,alpha2.length - alpha.length,255);
				alpha = alpha2;
			}
			var width = h.width;
			var stride = Math.ceil(width * h.colbits / 8) + 1;
			if(data.length < h.height * stride) {
				throw haxe_Exception.thrown("Not enough data");
			}
			var tmp = h.width * h.colbits;
			var rline = tmp >> 3;
			var _g = 0;
			var _g1 = h.height;
			while(_g < _g1) {
				var y = _g++;
				var f = data.b[r++];
				if(f == 0) {
					r += rline;
					continue;
				}
				switch(f) {
				case 1:
					var c = 0;
					var _g2 = 0;
					var _g3 = width;
					while(_g2 < _g3) {
						var x = _g2++;
						var v = data.b[r];
						c += v;
						data.b[r++] = c & 255;
					}
					break;
				case 2:
					var stride = y == 0 ? 0 : rline + 1;
					var _g4 = 0;
					var _g5 = width;
					while(_g4 < _g5) {
						var x1 = _g4++;
						var v1 = data.b[r];
						data.b[r] = v1 + data.b[r - stride];
						++r;
					}
					break;
				case 3:
					var c1 = 0;
					var stride1 = y == 0 ? 0 : rline + 1;
					var _g6 = 0;
					var _g7 = width;
					while(_g6 < _g7) {
						var x2 = _g6++;
						var v2 = data.b[r];
						c1 = v2 + (c1 + data.b[r - stride1] >> 1) & 255;
						data.b[r++] = c1;
					}
					break;
				case 4:
					var stride2 = rline + 1;
					var c2 = 0;
					var _g8 = 0;
					var _g9 = width;
					while(_g8 < _g9) {
						var x3 = _g8++;
						var v3 = data.b[r];
						var numChannels = 1;
						if(numChannels == null) {
							numChannels = 4;
						}
						var b = y == 0 ? 0 : data.b[r - stride2];
						var c3 = x3 == 0 || y == 0 ? 0 : data.b[r - stride2 - numChannels];
						var k = c2 + b - c3;
						var pa = k - c2;
						if(pa < 0) {
							pa = -pa;
						}
						var pb = k - b;
						if(pb < 0) {
							pb = -pb;
						}
						var pc = k - c3;
						if(pc < 0) {
							pc = -pc;
						}
						c2 = (pa <= pb && pa <= pc ? c2 : pb <= pc ? b : c3) + v3 & 255;
						data.b[r++] = c2;
					}
					break;
				default:
					throw haxe_Exception.thrown("Invalid filter " + f);
				}
			}
			var r = 0;
			if(h.colbits == 8) {
				var _g = 0;
				var _g1 = h.height;
				while(_g < _g1) {
					var y = _g++;
					++r;
					var _g2 = 0;
					var _g3 = h.width;
					while(_g2 < _g3) {
						var x = _g2++;
						var c = data.b[r++];
						bgra.b[w++] = pal.b[c * 3 + 2];
						bgra.b[w++] = pal.b[c * 3 + 1];
						bgra.b[w++] = pal.b[c * 3];
						bgra.b[w++] = alpha != null ? alpha.b[c] : 255;
					}
					w += lineDelta;
				}
			} else if(h.colbits < 8) {
				var req = h.colbits;
				var mask = (1 << req) - 1;
				var _g = 0;
				var _g1 = h.height;
				while(_g < _g1) {
					var y = _g++;
					++r;
					var bits = 0;
					var nbits = 0;
					var _g2 = 0;
					var _g3 = h.width;
					while(_g2 < _g3) {
						var x = _g2++;
						if(nbits < req) {
							bits = bits << 8 | data.b[r++];
							nbits += 8;
						}
						var c = bits >>> nbits - req & mask;
						nbits -= req;
						bgra.b[w++] = pal.b[c * 3 + 2];
						bgra.b[w++] = pal.b[c * 3 + 1];
						bgra.b[w++] = pal.b[c * 3];
						bgra.b[w++] = alpha != null ? alpha.b[c] : 255;
					}
					w += lineDelta;
				}
			} else {
				throw haxe_Exception.thrown(h.colbits + " indexed bits per pixel not supported");
			}
			break;
		}
		return bgra;
	}
	,__class__: drcJS_format_PNG
};
var drcJS_math_Matrix = {};
drcJS_math_Matrix._new = function(data) {
	var this1;
	if(data != null && data.length == 16) {
		this1 = data;
	} else {
		this1 = haxe_io_Float32Array.fromArray(drcJS_math_Matrix.__identity);
	}
	return this1;
};
drcJS_math_Matrix.getData = function(this1) {
	return this1;
};
drcJS_math_Matrix.append = function(this1,lhs) {
	var _m111 = this1[0];
	var _m121 = this1[4];
	var _m131 = this1[8];
	var _m141 = this1[12];
	var _m112 = this1[1];
	var _m122 = this1[5];
	var _m132 = this1[9];
	var _m142 = this1[13];
	var _m113 = this1[2];
	var _m123 = this1[6];
	var _m133 = this1[10];
	var _m143 = this1[14];
	var _m114 = this1[3];
	var _m124 = this1[7];
	var _m134 = this1[11];
	var _m144 = this1[15];
	var _m211 = lhs[0];
	var _m221 = lhs[4];
	var _m231 = lhs[8];
	var _m241 = lhs[12];
	var _m212 = lhs[1];
	var _m222 = lhs[5];
	var _m232 = lhs[9];
	var _m242 = lhs[13];
	var _m213 = lhs[2];
	var _m223 = lhs[6];
	var _m233 = lhs[10];
	var _m243 = lhs[14];
	var _m214 = lhs[3];
	var _m224 = lhs[7];
	var _m234 = lhs[11];
	var _m244 = lhs[15];
	this1[0] = _m111 * _m211 + _m112 * _m221 + _m113 * _m231 + _m114 * _m241;
	this1[1] = _m111 * _m212 + _m112 * _m222 + _m113 * _m232 + _m114 * _m242;
	this1[2] = _m111 * _m213 + _m112 * _m223 + _m113 * _m233 + _m114 * _m243;
	this1[3] = _m111 * _m214 + _m112 * _m224 + _m113 * _m234 + _m114 * _m244;
	this1[4] = _m121 * _m211 + _m122 * _m221 + _m123 * _m231 + _m124 * _m241;
	this1[5] = _m121 * _m212 + _m122 * _m222 + _m123 * _m232 + _m124 * _m242;
	this1[6] = _m121 * _m213 + _m122 * _m223 + _m123 * _m233 + _m124 * _m243;
	this1[7] = _m121 * _m214 + _m122 * _m224 + _m123 * _m234 + _m124 * _m244;
	this1[8] = _m131 * _m211 + _m132 * _m221 + _m133 * _m231 + _m134 * _m241;
	this1[9] = _m131 * _m212 + _m132 * _m222 + _m133 * _m232 + _m134 * _m242;
	this1[10] = _m131 * _m213 + _m132 * _m223 + _m133 * _m233 + _m134 * _m243;
	this1[11] = _m131 * _m214 + _m132 * _m224 + _m133 * _m234 + _m134 * _m244;
	this1[12] = _m141 * _m211 + _m142 * _m221 + _m143 * _m231 + _m144 * _m241;
	this1[13] = _m141 * _m212 + _m142 * _m222 + _m143 * _m232 + _m144 * _m242;
	this1[14] = _m141 * _m213 + _m142 * _m223 + _m143 * _m233 + _m144 * _m243;
	this1[15] = _m141 * _m214 + _m142 * _m224 + _m143 * _m234 + _m144 * _m244;
};
drcJS_math_Matrix.appendRotation = function(this1,angle,axis) {
	var _matrix = drcJS_math_Matrix.__getAxisRotation(this1,axis.x,axis.y,axis.z,angle);
	drcJS_math_Matrix.append(this1,_matrix);
};
drcJS_math_Matrix.appendTranslation = function(this1,x,y,z) {
	this1[12] += x;
	this1[13] += y;
	this1[14] += z;
};
drcJS_math_Matrix.__getAxisRotation = function(this1,x,y,z,degrees) {
	var m = drcJS_math_Matrix._new();
	var a1 = new drcJS_math_Vector4(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	drcJS_math_Matrix.set(m,0,c + a1.x * a1.x * t);
	drcJS_math_Matrix.set(m,5,c + a1.y * a1.y * t);
	drcJS_math_Matrix.set(m,10,c + a1.z * a1.z * t);
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	drcJS_math_Matrix.set(m,4,tmp1 + tmp2);
	drcJS_math_Matrix.set(m,1,tmp1 - tmp2);
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	drcJS_math_Matrix.set(m,8,tmp1 - tmp2);
	drcJS_math_Matrix.set(m,2,tmp1 + tmp2);
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	drcJS_math_Matrix.set(m,9,tmp1 + tmp2);
	drcJS_math_Matrix.set(m,6,tmp1 - tmp2);
	return m;
};
drcJS_math_Matrix.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 1;
	this1[6] = 0;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 1;
	this1[11] = 0;
	this1[12] = 0;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 1;
};
drcJS_math_Matrix.createOrthoMatrix = function(x0,x1,y0,y1,zNear,zFar,flipped) {
	if(flipped == null) {
		flipped = false;
	}
	var this1 = new Float32Array(16);
	var i = this1;
	if(i == null) {
		var this1 = new Float32Array(16);
		i = this1;
	}
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	i[0] = 2.0 * sx;
	i[1] = 0;
	i[2] = 0;
	i[3] = 0;
	i[4] = 0;
	i[5] = 2.0 * sy;
	i[6] = 0;
	i[7] = 0;
	i[8] = 0;
	i[9] = 0;
	i[10] = -2.0 * sz;
	i[11] = 0;
	i[12] = -1;
	i[13] = 1;
	i[14] = -(zNear + zFar) * sz;
	i[15] = 1;
	return i;
};
drcJS_math_Matrix.createPerspectiveMatrix = function(fieldOfView,aspect,width,height,zNear,zFar) {
	var this1 = new Float32Array(16);
	var i = this1;
	if(i == null) {
		var this1 = new Float32Array(16);
		i = this1;
	}
	var yScale = 1.0 / Math.tan(fieldOfView / 2.0);
	var xScale = yScale / aspect;
	i[0] = xScale;
	i[1] = 0;
	i[2] = 0;
	i[3] = 0;
	i[4] = 0;
	i[5] = -yScale;
	i[6] = 0;
	i[7] = 0;
	i[8] = 0;
	i[9] = 0;
	i[10] = zFar / (zFar - zNear);
	i[11] = 1;
	i[12] = 0;
	i[13] = 0;
	i[14] = zNear * zFar / (zNear - zFar);
	i[15] = 1;
	return i;
};
drcJS_math_Matrix.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
var drcJS_math_Vector4 = function(x,y,z,w) {
	if(w == null) {
		w = 0.;
	}
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
drcJS_math_Vector4.__name__ = true;
drcJS_math_Vector4.prototype = {
	__class__: drcJS_math_Vector4
};
var drcJS_objects_Camera = function(data) {
	this.__yaw = 0;
	this.__matrix = drcJS_math_Matrix._new();
	this.z = 0;
	this.y = 0;
	this.x = 0;
};
drcJS_objects_Camera.__name__ = true;
drcJS_objects_Camera.prototype = {
	render: function(modelMatrix) {
		var _view = drcJS_math_Matrix._new();
		drcJS_math_Matrix.identity(_view);
		drcJS_math_Matrix.append(_view,modelMatrix);
		drcJS_math_Matrix.identity(this.__matrix);
		drcJS_math_Matrix.identity(this.__matrix);
		drcJS_math_Matrix.appendTranslation(this.__matrix,this.x,this.y,this.z);
		drcJS_math_Matrix.append(_view,this.__matrix);
		drcJS_math_Matrix.append(_view,drcJS_math_Matrix.createOrthoMatrix(0,drcJS_utils_Common.window.get_width(),drcJS_utils_Common.window.get_height(),0,1000,-1000));
		return _view;
	}
	,render2: function(modelMatrix) {
		var _view = drcJS_math_Matrix._new();
		drcJS_math_Matrix.identity(_view);
		drcJS_math_Matrix.append(_view,modelMatrix);
		drcJS_math_Matrix.identity(this.__matrix);
		drcJS_math_Matrix.appendRotation(this.__matrix,this.get_yaw(),new drcJS_math_Vector4(0,1,0));
		drcJS_math_Matrix.appendTranslation(this.__matrix,this.x,this.y,this.z);
		drcJS_math_Matrix.append(_view,this.__matrix);
		var fov = 45 * Math.PI / 180;
		var aspect = 1.3333333333333333;
		drcJS_math_Matrix.append(_view,drcJS_math_Matrix.createPerspectiveMatrix(fov,aspect,640,480,10,1000));
		return _view;
	}
	,get_yaw: function() {
		return this.__yaw;
	}
	,__class__: drcJS_objects_Camera
};
var drcJS_part_List = function(lenght,fixed) {
	if(lenght > 0) {
		fixed = true;
	}
	this.members = [];
};
drcJS_part_List.__name__ = true;
drcJS_part_List.prototype = {
	forEach: function(func) {
		var _g = 0;
		var _g1 = this.get_count();
		while(_g < _g1) {
			var i = _g++;
			if(this.members[i] == null) {
				continue;
			}
			func(this.members[i]);
		}
	}
	,get_count: function() {
		return this.members.length;
	}
	,__class__: drcJS_part_List
};
var drcJS_part_ObjectList = function(capacity) {
	this.__capacity = 0;
	this.members = [];
	if(capacity == null) {
		return;
	}
	var _g = 0;
	var _g1 = capacity;
	while(_g < _g1) {
		var i = _g++;
		this.members[i] = null;
	}
	this.__capacity = capacity;
};
drcJS_part_ObjectList.__name__ = true;
drcJS_part_ObjectList.prototype = {
	get_count: function() {
		return this.members.length;
	}
	,__class__: drcJS_part_ObjectList
};
var drcJS_part_RecycleList = function(lenght,fixed) {
	drcJS_part_List.call(this,lenght,fixed);
	this.__passiveMembers = [];
};
drcJS_part_RecycleList.__name__ = true;
drcJS_part_RecycleList.__super__ = drcJS_part_List;
drcJS_part_RecycleList.prototype = $extend(drcJS_part_List.prototype,{
	forEach: function(func) {
		drcJS_part_List.prototype.forEach.call(this,func);
		var _g = 0;
		var _g1 = this.get_passiveCount();
		while(_g < _g1) {
			var i = _g++;
			if(this.members[i] == null) {
				continue;
			}
			func(this.__passiveMembers[i]);
		}
	}
	,forEachActive: function(func) {
		drcJS_part_List.prototype.forEach.call(this,func);
	}
	,get_count: function() {
		return this.members.length + this.__passiveMembers.length;
	}
	,get_passiveCount: function() {
		return this.__passiveMembers.length;
	}
	,__class__: drcJS_part_RecycleList
});
var drcJS_utils_Common = function() { };
drcJS_utils_Common.__name__ = true;
var drcJS_utils_HTTPRequest = function(uri,requestMethod) {
	this.__uri = uri;
};
drcJS_utils_HTTPRequest.__name__ = true;
drcJS_utils_HTTPRequest.prototype = {
	load: function(func,type,isBinary) {
		if(isBinary == null) {
			isBinary = false;
		}
		var _gthis = this;
		var _async = true;
		var _binary = isBinary;
		this.__request = new XMLHttpRequest();
		this.__request.open("GET",this.__uri,true);
		if(_binary) {
			this.__request.overrideMimeType("text/plain; charset=x-user-defined");
		} else {
			this.__request.overrideMimeType("text/plain; charset=UTF-8");
		}
		this.__request.responseType = type;
		this.__request.onload = function(data) {
			if(_gthis.__request.status == 200) {
				func(_gthis.__request.status,_gthis.__request.response);
			} else {
				throw haxe_Exception.thrown("request status was " + _gthis.__request.status + " / " + _gthis.__request.statusText);
			}
		};
		this.__request.send();
	}
	,__class__: drcJS_utils_HTTPRequest
};
var editor_SDK = function() {
	var form = new ui_Form();
	form.init();
	var list = new ui_List();
	form.addElement(list);
	var menuStrip = new ui_MenuStrip();
	menuStrip.addItem("File");
	menuStrip.addItem("Edit");
	menuStrip.addItem("View");
	menuStrip.addItem("Help");
	form.addElement(menuStrip);
	var panel = new ui_Panel(4);
	panel.get_style().width = "128px";
	panel.get_style().height = "256px";
	var $window = new ui_Window("New window",2);
	var container = new ui_Container(4);
	container.addClassName("container_sidebar");
	form.addElement(container);
	var button_editor = new ui_Button("Editor");
	button_editor.addClassName("button_sidebar");
	container.addControl(button_editor);
	button_editor.addEventListener(function(control,type) {
		console.log("src/editor/SDK.hx:78:","Button event: type > " + (type == null ? "null" : ui_EventType.toString(type)));
	},1);
	var button_sprites = new ui_Button("Sprites");
	button_sprites.addClassName("button_sidebar");
	container.addControl(button_sprites);
	var context = new ui_Container(1);
	context.addClassName("container_context");
	form.addElement(context);
	var webglView = new ui_WebglView();
	context.addControl(webglView);
};
editor_SDK.__name__ = true;
editor_SDK.prototype = {
	__class__: editor_SDK
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_crypto_Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
haxe_crypto_Adler32.__name__ = true;
haxe_crypto_Adler32.read = function(i) {
	var a = new haxe_crypto_Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
haxe_crypto_Adler32.prototype = {
	update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g = pos;
		var _g1 = pos + len;
		while(_g < _g1) {
			var p = _g++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		if(a.a1 == this.a1) {
			return a.a2 == this.a2;
		} else {
			return false;
		}
	}
	,__class__: haxe_crypto_Adler32
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			this.b[pos++] = value;
		}
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	add: function(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset,src.length);
		this.u8.set(sub,this.pos);
		this.pos += src.length;
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) {
			return ch2 | ch1 << 8;
		} else {
			return ch1 | ch2 << 8;
		}
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = b.length - pos;
	}
	if(pos < 0 || len < 0 || pos + len > b.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.len == 0 && len > 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		if(this.len < len) {
			len = this.len;
		}
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_Float32Array = {};
haxe_io_Float32Array.fromArray = function(a,pos,length) {
	if(pos == null) {
		pos = 0;
	}
	if(length == null) {
		length = a.length - pos;
	}
	if(pos < 0 || length < 0 || pos + length > a.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	if(pos == 0 && length == a.length) {
		return new Float32Array(a);
	}
	var this1 = new Float32Array(a.length);
	var i = this1;
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var idx = _g++;
		i[idx] = a[idx + pos];
	}
	return i;
};
var haxe_io_Int32Array = {};
haxe_io_Int32Array.fromArray = function(a,pos,length) {
	if(pos == null) {
		pos = 0;
	}
	if(length == null) {
		length = a.length - pos;
	}
	if(pos < 0 || length < 0 || pos + length > a.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	if(pos == 0 && length == a.length) {
		return new Int32Array(a);
	}
	var this1 = new Int32Array(a.length);
	var i = this1;
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var idx = _g++;
		i[idx] = a[idx + pos];
	}
	return i;
};
var haxe_io_UInt8Array = {};
haxe_io_UInt8Array.fromBytes = function(bytes,bytePos,length) {
	if(bytePos == null) {
		bytePos = 0;
	}
	if(length == null) {
		length = bytes.length - bytePos;
	}
	return new Uint8Array(bytes.b.bufferValue,bytePos,length);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_zip_Huffman = $hxEnums["haxe.zip.Huffman"] = { __ename__:true,__constructs__:null
	,Found: ($_=function(i) { return {_hx_index:0,i:i,__enum__:"haxe.zip.Huffman",toString:$estr}; },$_._hx_name="Found",$_.__params__ = ["i"],$_)
	,NeedBit: ($_=function(left,right) { return {_hx_index:1,left:left,right:right,__enum__:"haxe.zip.Huffman",toString:$estr}; },$_._hx_name="NeedBit",$_.__params__ = ["left","right"],$_)
	,NeedBits: ($_=function(n,table) { return {_hx_index:2,n:n,table:table,__enum__:"haxe.zip.Huffman",toString:$estr}; },$_._hx_name="NeedBits",$_.__params__ = ["n","table"],$_)
};
haxe_zip_Huffman.__constructs__ = [haxe_zip_Huffman.Found,haxe_zip_Huffman.NeedBit,haxe_zip_Huffman.NeedBits];
var haxe_zip_HuffTools = function() {
};
haxe_zip_HuffTools.__name__ = true;
haxe_zip_HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t._hx_index) {
		case 0:
			var _g = t.i;
			return 0;
		case 1:
			var a = t.left;
			var b = t.right;
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db ? da : db);
		case 2:
			var _g = t.n;
			var _g = t.table;
			throw haxe_Exception.thrown("assert");
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) {
			return t;
		}
		if(d == 1) {
			if(t._hx_index == 1) {
				var a = t.left;
				var b = t.right;
				return haxe_zip_Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
			} else {
				throw haxe_Exception.thrown("assert");
			}
		}
		var size = 1 << d;
		var table = [];
		var _g = 0;
		var _g1 = size;
		while(_g < _g1) {
			var i = _g++;
			table.push(haxe_zip_Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return haxe_zip_Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		if(t._hx_index == 1) {
			var a = t.left;
			var b = t.right;
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else {
				table[p] = this.treeCompress(t);
			}
		} else {
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) {
			throw haxe_Exception.thrown("Invalid huffman");
		}
		var idx = v << 5 | len;
		if(bits.h.hasOwnProperty(idx)) {
			return haxe_zip_Huffman.Found(bits.h[idx]);
		}
		v <<= 1;
		++len;
		return haxe_zip_Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		if(nlengths == 1) {
			return haxe_zip_Huffman.NeedBit(haxe_zip_Huffman.Found(0),haxe_zip_Huffman.Found(0));
		}
		var counts = [];
		var tmp = [];
		if(maxbits > 32) {
			throw haxe_Exception.thrown("Invalid huffman");
		}
		var _g = 0;
		var _g1 = maxbits;
		while(_g < _g1) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g = 0;
		var _g1 = nlengths;
		while(_g < _g1) {
			var i = _g++;
			var p = lengths[i + pos];
			if(p >= maxbits) {
				throw haxe_Exception.thrown("Invalid huffman");
			}
			counts[p]++;
		}
		var code = 0;
		var _g = 1;
		var _g1 = maxbits - 1;
		while(_g < _g1) {
			var i = _g++;
			code = code + counts[i] << 1;
			tmp[i] = code;
		}
		var bits = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = nlengths;
		while(_g < _g1) {
			var i = _g++;
			var l = lengths[i + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.h[n << 5 | l] = i;
			}
		}
		return this.treeCompress(haxe_zip_Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: haxe_zip_HuffTools
};
var haxe_zip__$InflateImpl_Window = function(hasCrc) {
	this.buffer = new haxe_io_Bytes(new ArrayBuffer(65536));
	this.pos = 0;
	if(hasCrc) {
		this.crc = new haxe_crypto_Adler32();
	}
};
haxe_zip__$InflateImpl_Window.__name__ = true;
haxe_zip__$InflateImpl_Window.prototype = {
	slide: function() {
		if(this.crc != null) {
			this.crc.update(this.buffer,0,32768);
		}
		var b = new haxe_io_Bytes(new ArrayBuffer(65536));
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) {
			this.slide();
		}
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) {
			this.slide();
		}
		this.buffer.b[this.pos] = c;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) {
			this.crc.update(this.buffer,0,this.pos);
		}
		return this.crc;
	}
	,__class__: haxe_zip__$InflateImpl_Window
};
var haxe_zip__$InflateImpl_State = $hxEnums["haxe.zip._InflateImpl.State"] = { __ename__:true,__constructs__:null
	,Head: {_hx_name:"Head",_hx_index:0,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,Block: {_hx_name:"Block",_hx_index:1,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,CData: {_hx_name:"CData",_hx_index:2,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,Flat: {_hx_name:"Flat",_hx_index:3,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,Crc: {_hx_name:"Crc",_hx_index:4,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,Dist: {_hx_name:"Dist",_hx_index:5,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,DistOne: {_hx_name:"DistOne",_hx_index:6,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
	,Done: {_hx_name:"Done",_hx_index:7,__enum__:"haxe.zip._InflateImpl.State",toString:$estr}
};
haxe_zip__$InflateImpl_State.__constructs__ = [haxe_zip__$InflateImpl_State.Head,haxe_zip__$InflateImpl_State.Block,haxe_zip__$InflateImpl_State.CData,haxe_zip__$InflateImpl_State.Flat,haxe_zip__$InflateImpl_State.Crc,haxe_zip__$InflateImpl_State.Dist,haxe_zip__$InflateImpl_State.DistOne,haxe_zip__$InflateImpl_State.Done];
var haxe_zip_InflateImpl = function(i,header,crc) {
	if(crc == null) {
		crc = true;
	}
	if(header == null) {
		header = true;
	}
	this.isFinal = false;
	this.htools = new haxe_zip_HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	this.state = header ? haxe_zip__$InflateImpl_State.Head : haxe_zip__$InflateImpl_State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = [];
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.lengths.push(-1);
	this.window = new haxe_zip__$InflateImpl_Window(crc);
};
haxe_zip_InflateImpl.__name__ = true;
haxe_zip_InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) {
		bufsize = 65536;
	}
	var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
	var output = new haxe_io_BytesBuffer();
	var inflate = new haxe_zip_InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) {
			break;
		}
	}
	return output.getBytes();
};
haxe_zip_InflateImpl.prototype = {
	buildFixedHuffman: function() {
		if(haxe_zip_InflateImpl.FIXED_HUFFMAN != null) {
			return haxe_zip_InflateImpl.FIXED_HUFFMAN;
		}
		var a = [];
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143 ? 8 : n <= 255 ? 9 : n <= 279 ? 7 : 8);
		}
		haxe_zip_InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return haxe_zip_InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) {
			while(this.inflateLoop()) {
			}
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) {
			return 0;
		} else if(this.getBit()) {
			return 1 << n - 1 | this.getRevBits(n - 1);
		} else {
			return this.getRevBits(n - 1);
		}
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h._hx_index) {
		case 0:
			var n = h.i;
			return n;
		case 1:
			var a = h.left;
			var b = h.right;
			return this.applyHuffman(this.getBit() ? b : a);
		case 2:
			var n = h.n;
			var tbl = h.table;
			return this.applyHuffman(tbl[this.getBits(n)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				++i;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) {
					throw haxe_Exception.thrown("Invalid data");
				}
				while(i < end) {
					a[i] = prev;
					++i;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) {
					throw haxe_Exception.thrown("Invalid data");
				}
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) {
					throw haxe_Exception.thrown("Invalid data");
				}
				break;
			default:
				throw haxe_Exception.thrown("Invalid data");
			}
		}
	}
	,inflateLoop: function() {
		switch(this.state._hx_index) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8) {
				throw haxe_Exception.thrown("Invalid data");
			}
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) {
				throw haxe_Exception.thrown("Invalid data");
			}
			if(fdict) {
				throw haxe_Exception.thrown("Unsupported dictionary");
			}
			this.state = haxe_zip__$InflateImpl_State.Block;
			return true;
		case 1:
			this.isFinal = this.getBit();
			switch(this.getBits(2)) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) {
					throw haxe_Exception.thrown("Invalid data");
				}
				this.state = haxe_zip__$InflateImpl_State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = haxe_zip__$InflateImpl_State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g = 0;
				var _g1 = hclen;
				while(_g < _g1) {
					var i = _g++;
					this.lengths[haxe_zip_InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g = hclen;
				var _g1 = 19;
				while(_g < _g1) {
					var i = _g++;
					this.lengths[haxe_zip_InflateImpl.CODE_LENGTHS_POS[i]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = [];
				var _g = 0;
				var _g1 = hlit + hdist;
				while(_g < _g1) {
					var i = _g++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = haxe_zip__$InflateImpl_State.CData;
				return true;
			default:
				throw haxe_Exception.thrown("Invalid data");
			}
			break;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				this.state = this.isFinal ? haxe_zip__$InflateImpl_State.Crc : haxe_zip__$InflateImpl_State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = haxe_zip_InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) {
					throw haxe_Exception.thrown("Invalid data");
				}
				this.len = haxe_zip_InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code = this.huffdist == null ? this.getRevBits(5) : this.applyHuffman(this.huffdist);
				extra_bits = haxe_zip_InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) {
					throw haxe_Exception.thrown("Invalid data");
				}
				this.dist = haxe_zip_InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) {
					throw haxe_Exception.thrown("Invalid data");
				}
				this.state = this.dist == 1 ? haxe_zip__$InflateImpl_State.DistOne : haxe_zip__$InflateImpl_State.Dist;
				return true;
			}
			break;
		case 3:
			var rlen = this.len < this.needed ? this.len : this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) {
				this.state = this.isFinal ? haxe_zip__$InflateImpl_State.Crc : haxe_zip__$InflateImpl_State.Block;
			}
			return this.needed > 0;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = haxe_zip__$InflateImpl_State.Done;
				return true;
			}
			var crc = haxe_crypto_Adler32.read(this.input);
			if(!calc.equals(crc)) {
				throw haxe_Exception.thrown("Invalid CRC");
			}
			this.state = haxe_zip__$InflateImpl_State.Done;
			return true;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist = this.len < this.dist ? this.len : this.dist;
				var rlen = this.needed < rdist ? this.needed : rdist;
				this.addDist(this.dist,rlen);
				this.len -= rlen;
			}
			if(this.len == 0) {
				this.state = haxe_zip__$InflateImpl_State.CData;
			}
			return this.needed > 0;
		case 6:
			var rlen = this.len < this.needed ? this.len : this.needed;
			this.addDistOne(rlen);
			this.len -= rlen;
			if(this.len == 0) {
				this.state = haxe_zip__$InflateImpl_State.CData;
			}
			return this.needed > 0;
		case 7:
			return false;
		}
	}
	,__class__: haxe_zip_InflateImpl
};
var haxe_zip_Uncompress = function() { };
haxe_zip_Uncompress.__name__ = true;
haxe_zip_Uncompress.run = function(src,bufsize) {
	return haxe_zip_InflateImpl.run(new haxe_io_BytesInput(src),bufsize);
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var ui_IControl = function() { };
ui_IControl.__name__ = true;
ui_IControl.__isInterface__ = true;
ui_IControl.prototype = {
	__class__: ui_IControl
};
var ui_Element = function(tag,className) {
	this.__element = this.__createElement(tag);
	if(className != null) {
		this.__element.classList.add(className);
	}
	EventDispacher.call(this);
};
ui_Element.__name__ = true;
ui_Element.__interfaces__ = [ui_IControl];
ui_Element.__super__ = EventDispacher;
ui_Element.prototype = $extend(EventDispacher.prototype,{
	init: function() {
	}
	,addClassName: function(value) {
		this.__element.classList.add(value);
	}
	,getNode: function() {
		return this.__element;
	}
	,__createElement: function(tag) {
		return window.document.createElement(tag);
	}
	,get_style: function() {
		return this.__element.style;
	}
	,__class__: ui_Element
});
var ui_Button = function(text,className) {
	if(className == null) {
		className = "button_default";
	}
	ui_Element.call(this,"button",className);
	this.__element.innerHTML = text;
};
ui_Button.__name__ = true;
ui_Button.__super__ = ui_Element;
ui_Button.prototype = $extend(ui_Element.prototype,{
	init: function() {
	}
	,__class__: ui_Button
});
var ui_Container = function(position,className) {
	if(className == null) {
		className = "container_default";
	}
	if(position == null) {
		position = 1;
	}
	ui_Element.call(this,"div",className);
	this.__element.style.position = ui_PositionType.toString(position);
};
ui_Container.__name__ = true;
ui_Container.__super__ = ui_Element;
ui_Container.prototype = $extend(ui_Element.prototype,{
	addControl: function(control) {
		this.__addElement(control.getNode());
		return control;
	}
	,__addElement: function(node) {
		return this.__element.appendChild(node);
	}
	,__class__: ui_Container
});
var ui_EventType = {};
ui_EventType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "unknown";
	case 1:
		return "click";
	default:
		return null;
	}
};
var ui_Form = function() {
	this.__root = window.document.getElementById("root");
};
ui_Form.__name__ = true;
ui_Form.prototype = {
	init: function() {
	}
	,addElement: function(control) {
		control.init();
		this.__root.appendChild(control.getNode());
		return control;
	}
	,__class__: ui_Form
};
var ui_List = function(className) {
	if(className == null) {
		className = "list_default";
	}
	ui_Element.call(this,"ul",className);
};
ui_List.__name__ = true;
ui_List.__super__ = ui_Element;
ui_List.prototype = $extend(ui_Element.prototype,{
	init: function() {
	}
	,addControl: function(control) {
		var listItem = new ui__$List_ListItem();
		listItem.init();
		listItem.addControl(control);
		this.__element.appendChild(listItem.getNode());
		return control;
	}
	,set_marker: function(value) {
		this.__element.style.listStyleType = value;
		return value;
	}
	,__class__: ui_List
});
var ui__$List_ListItem = function() {
	ui_Element.call(this,"li","listItem_default");
};
ui__$List_ListItem.__name__ = true;
ui__$List_ListItem.__interfaces__ = [ui_IControl];
ui__$List_ListItem.__super__ = ui_Element;
ui__$List_ListItem.prototype = $extend(ui_Element.prototype,{
	addControl: function(control) {
		control.init();
		this.__element.appendChild(control.getNode());
		return control;
	}
	,__class__: ui__$List_ListItem
});
var ui_MenuStrip = function(className) {
	if(className == null) {
		className = "menuStrip_default";
	}
	ui_Container.call(this,1,className);
	this.__list = new ui__$MenuStrip__$_$MenuStripList();
	this.__list.set_marker("none");
	this.__addElement(this.__list.getNode());
};
ui_MenuStrip.__name__ = true;
ui_MenuStrip.__super__ = ui_Container;
ui_MenuStrip.prototype = $extend(ui_Container.prototype,{
	addItem: function(name) {
		var button = new ui_Button(name,"menuStrip_button_default");
		this.__list.addControl(button);
		return button;
	}
	,__class__: ui_MenuStrip
});
var ui__$MenuStrip__$_$MenuStripList = function(className) {
	if(className == null) {
		className = "menuStrip_list_default";
	}
	ui_List.call(this,className);
};
ui__$MenuStrip__$_$MenuStripList.__name__ = true;
ui__$MenuStrip__$_$MenuStripList.__super__ = ui_List;
ui__$MenuStrip__$_$MenuStripList.prototype = $extend(ui_List.prototype,{
	__class__: ui__$MenuStrip__$_$MenuStripList
});
var ui_Panel = function(positionType,className) {
	if(className == null) {
		className = "panel_default";
	}
	this.__y = 0;
	this.__x = 0;
	ui_Element.call(this,"div",className);
	this.__element.style.position = ui_PositionType.toString(positionType);
};
ui_Panel.__name__ = true;
ui_Panel.__super__ = ui_Element;
ui_Panel.prototype = $extend(ui_Element.prototype,{
	init: function() {
	}
	,__class__: ui_Panel
});
var ui_PositionType = {};
ui_PositionType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "static";
	case 1:
		return "relative";
	case 2:
		return "absolute";
	case 3:
		return "sticky";
	case 4:
		return "fixed";
	default:
		return null;
	}
};
var ui_WebglView = function() {
	ui_Container.call(this,1,"webglView");
	this.__element.id = "webglView";
};
ui_WebglView.__name__ = true;
ui_WebglView.__super__ = ui_Container;
ui_WebglView.prototype = $extend(ui_Container.prototype,{
	__class__: ui_WebglView
});
var ui_Window = function(title,positionType,width,height) {
	if(height == null) {
		height = 256;
	}
	if(width == null) {
		width = 256;
	}
	if(positionType == null) {
		positionType = 2;
	}
	ui_Panel.call(this,positionType);
	this.__element.classList.add("window_default");
	this.__element.style.width = (width == null ? "null" : "" + width) + "px";
	this.__element.style.height = (height == null ? "null" : "" + height) + "px";
	this.titleBar = window.document.createElement("div");
	this.titleBar.classList.add("window_titleBar_default");
	this.titleBar.appendChild(window.document.createTextNode(title));
	this.container = window.document.createElement("div");
	this.container.classList.add("window_container");
	this.__element.appendChild(this.titleBar);
	this.__element.appendChild(this.container);
	this.titleBar.onmousedown = $bind(this,this.__onMouseDown);
};
ui_Window.__name__ = true;
ui_Window.__super__ = ui_Panel;
ui_Window.prototype = $extend(ui_Panel.prototype,{
	__onMouseDown: function(event) {
		event.preventDefault();
		this.__x = event.clientX;
		this.__y = event.clientY;
		window.document.onmouseup = $bind(this,this.__onMouseUp);
		window.document.onmousemove = $bind(this,this.__onMouseMove);
	}
	,__onMouseMove: function(event) {
		event.preventDefault();
		var posX = this.__x - event.clientX;
		var posY = this.__y - event.clientY;
		this.__x = event.clientX;
		this.__y = event.clientY;
		this.__element.style.left = this.__element.offsetLeft - posX + "px";
		this.__element.style.top = this.__element.offsetTop - posY + "px";
	}
	,__onMouseUp: function(event) {
		window.document.onmouseup = null;
		window.document.onmousemove = null;
	}
	,__class__: ui_Window
});
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
drcJS_math_Matrix.__identity = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
haxe_zip_InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
haxe_zip_InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
haxe_zip_InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
haxe_zip_InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
haxe_zip_InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map