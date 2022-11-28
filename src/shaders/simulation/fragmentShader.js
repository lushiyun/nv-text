const fragmentShader = `
	uniform float uTime;

	uniform sampler2D textureA;
	uniform sampler2D textureB;

	varying vec2 vUv;

	void main() {
		//origin
		vec4 origin  = texture2D(textureA, vUv).rgba;

		//destination
		vec4 destination = texture2D(textureB, vUv).rgba;

		//lerp
		vec4 pos = mix(origin, destination, uTime);

		gl_FragColor = vec4(pos);
	}
`;

export default fragmentShader;