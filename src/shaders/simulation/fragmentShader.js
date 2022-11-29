const fragmentShader = `
// simulation
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform sampler2D textureC;
uniform float timer;

varying vec2 vUv;

void main() {
	if (timer < 0.5) {
		vec3 origin = texture2D(textureA, vUv).xyz;
		vec3 target = texture2D(textureB, vUv).xyz;
		gl_FragColor = vec4(mix(origin, target, timer * 2.0), 1.0);
	} else {
		vec3 origin = texture2D(textureB, vUv).xyz;
		vec3 target = texture2D(textureC, vUv).xyz;
		gl_FragColor = vec4(mix(origin, target, (timer - 0.5) * 2.0), 1.0);
	}
}
`;

export default fragmentShader;
