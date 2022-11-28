const vertexShader = `
	uniform sampler2D uPositions;
	uniform float uSize;

	void main() {
		//the mesh is a nomrliazed square so the uvs = the xy positions of the vertices
		vec3 pos = texture2D(uPositions, position.xy).xyz;

		//pos now contains the position of a point in space that can be transformed
		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

		gl_PointSize = uSize;
	}
`;

export default vertexShader;