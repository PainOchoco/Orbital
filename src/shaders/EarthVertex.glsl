varying vec2 vertexUv;
varying vec3 vertexNormal;


void main(){
    vertexUv = uv;
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}