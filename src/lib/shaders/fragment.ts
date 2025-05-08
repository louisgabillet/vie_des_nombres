export default `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec3 uMainColor;
    uniform vec3 uBgColor;
    
    const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );
    
    float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    
    float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
    
        float res = mix(
            mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
            mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x)
        ,u.y);

        return res*res;
    }
    
    float fbm(vec2 p) {
        float f = 0.0;

        f += 0.500000 * noise(p + iTime); p = mtx * p * 2.02;
        f += 0.250000 * noise(p); p = mtx * p * 2.01;
        f += 0.125000 * noise(p); p = mtx * p * 2.03;
        f += 0.062500 * noise(p); p = mtx * p * 2.01;
        f += 0.031250 * noise(p); p = mtx * p * 2.04;
        f += 0.015625 * noise(p + sin(iTime));

        return f / 0.96875;
    }
    
    float pattern(vec2 p) {
        return fbm(p + fbm(p + fbm(p)));
    }
    
    vec3 colormap(float x) {
        vec3 color;

        if (x < 0.5) { 
            float t = x / 0.5;
            color = mix(uBgColor, uMainColor, t);
        } else { 
            float t = (x - 0.5) / 0.5;
            color = mix(uMainColor, uBgColor, t);
        }

        return color;
    }
    
    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = fragCoord / iResolution.x;
        
        float shade = pattern(uv);
        vec3 color = colormap(shade);
        
        gl_FragColor = vec4(color, 1.0);
    }
`
