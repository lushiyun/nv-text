const fragmentShader = `
// simulation
uniform sampler2D randomTexture;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;
uniform sampler2D texture5;
uniform sampler2D texture6;
uniform sampler2D texture7;
uniform sampler2D texture8;
uniform sampler2D texture9;
uniform sampler2D texture10;
uniform sampler2D texture11;
uniform sampler2D texture12;
uniform sampler2D texture13;
uniform float timer;

varying vec2 vUv;

void mixTextures(sampler2D textureA, sampler2D textureB, float normalizedTimer) {
	vec3 origin = texture2D(textureA, vUv).xyz;
	vec3 target = texture2D(textureB, vUv).xyz;
	gl_FragColor = vec4(mix(origin, target, normalizedTimer), 1.0);
}

void main() {
	if (timer <= 1.0) {
		float normalizedTimer = timer;
		mixTextures(texture0, randomTexture, normalizedTimer);
	}

	if (timer > 1.0 && timer <= 2.0) {
		float normalizedTimer = timer - 1.0;
		mixTextures(randomTexture, texture1, normalizedTimer);
	}

	if (timer > 2.0 && timer <= 3.0) {
		float normalizedTimer = timer - 2.0;
		mixTextures(texture1, randomTexture, normalizedTimer);
	}

	if (timer > 3.0 && timer <= 4.0) {
		float normalizedTimer = timer - 3.0;
		mixTextures(randomTexture, texture2, normalizedTimer);
	}

	if (timer > 4.0 && timer <= 5.0) {
		float normalizedTimer = timer - 4.0;
		mixTextures(texture2, randomTexture, normalizedTimer);
	}

	if (timer > 5.0 && timer <= 6.0) {
		float normalizedTimer = timer - 5.0;
		mixTextures(randomTexture, texture3, normalizedTimer);
	}

	if (timer > 6.0 && timer <= 7.0) {
		float normalizedTimer = timer - 6.0;
		mixTextures(texture3, randomTexture, normalizedTimer);
	}

	if (timer > 7.0 && timer <= 8.0) {
		float normalizedTimer = timer - 7.0;
		mixTextures(randomTexture, texture4, normalizedTimer);
	}

	if (timer > 8.0 && timer <= 9.0) {
		float normalizedTimer = timer - 8.0;
		mixTextures(texture4, randomTexture, normalizedTimer);
	}

	if (timer > 9.0 && timer <= 10.0) {
		float normalizedTimer = timer - 9.0;
		mixTextures(randomTexture, texture5, normalizedTimer);
	}

	if (timer > 10.0 && timer <= 11.0) {
		float normalizedTimer = timer - 10.0;
		mixTextures(texture5, randomTexture, normalizedTimer);
	}

	if (timer > 11.0 && timer <= 12.0) {
		float normalizedTimer = timer - 11.0;
		mixTextures(randomTexture, texture6, normalizedTimer);
	}

	if (timer > 12.0 && timer <= 13.0) {
		float normalizedTimer = timer - 12.0;
		mixTextures(texture6, randomTexture, normalizedTimer);
	}

	if (timer > 13.0 && timer <= 14.0) {
		float normalizedTimer = timer - 13.0;
		mixTextures(randomTexture, texture7, normalizedTimer);
	}

	if (timer > 14.0 && timer <= 15.0) {
		float normalizedTimer = timer - 14.0;
		mixTextures(texture7, randomTexture, normalizedTimer);
	}

	if (timer > 15.0 && timer <= 16.0) {
		float normalizedTimer = timer - 15.0;
		mixTextures(randomTexture, texture8, normalizedTimer);
	}

	if (timer > 16.0 && timer <= 17.0) {
		float normalizedTimer = timer - 16.0;
		mixTextures(texture8, randomTexture, normalizedTimer);
	}

	if (timer > 17.0 && timer <= 18.0) {
		float normalizedTimer = timer - 17.0;
		mixTextures(randomTexture, texture9, normalizedTimer);
	}

	if (timer > 18.0 && timer <= 19.0) {
		float normalizedTimer = timer - 18.0;
		mixTextures(texture9, randomTexture, normalizedTimer);
	}

	if (timer > 19.0 && timer <= 20.0) {
		float normalizedTimer = timer - 19.0;
		mixTextures(randomTexture, texture10, normalizedTimer);
	}

	if (timer > 20.0 && timer <= 21.0) {
		float normalizedTimer = timer - 20.0;
		mixTextures(texture10, randomTexture, normalizedTimer);
	}

	if (timer > 21.0 && timer <= 22.0) {
		float normalizedTimer = timer - 21.0;
		mixTextures(randomTexture, texture11, normalizedTimer);
	}

	if (timer > 22.0 && timer <= 23.0) {
		float normalizedTimer = timer - 22.0;
		mixTextures(texture11, randomTexture, normalizedTimer);
	}

	if (timer > 23.0 && timer <= 24.0) {
		float normalizedTimer = timer - 23.0;
		mixTextures(randomTexture, texture12, normalizedTimer);
	}

	if (timer > 24.0 && timer <= 25.0) {
		float normalizedTimer = timer - 24.0;
		mixTextures(texture12, randomTexture, normalizedTimer);
	}

	if (timer > 25.0 && timer <= 26.0) {
		float normalizedTimer = timer - 25.0;
		mixTextures(randomTexture, texture13, normalizedTimer);
	}
}
`;

export default fragmentShader;
