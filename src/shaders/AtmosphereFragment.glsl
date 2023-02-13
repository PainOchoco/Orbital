varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.5 - dot(vertexNormal, vec3(0., 0., 1.)), 2.);

    gl_FragColor = vec4(0.3, 0.6, 1., 0.3) - intensity;
}