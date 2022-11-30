const vertexShader = `
	//float texture containing the positions of each particle
	uniform sampler2D positions;

	//size
	uniform float pointSize;

	varying vec3 vColor;

	void main() {
		//the mesh is a nomrliazed square so the uvs = the xy positions of the vertices
		vec3 pos = texture2D( positions, position.xy ).xyz;

		//pos now contains the position of a point in space that can be transformed
		gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

		gl_PointSize = pointSize;

		vColor = vec3(1.0,1.0,1.0);
	}
`;

export default vertexShader;
