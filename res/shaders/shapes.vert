attribute vec3 location;

uniform mat4 matrix;

void main(void) {	

	gl_Position = matrix * vec4(location.xyz, 1);
}