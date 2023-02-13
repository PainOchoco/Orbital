uniform sampler2D earthTexture;

varying vec2 vertexUv;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0., 0., 1.));

    vec3 atmoshpere = vec3(0.3, 0.6, 1.) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmoshpere+ texture2D(earthTexture, vertexUv).xyz, 1.);
}