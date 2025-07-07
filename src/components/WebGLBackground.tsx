import { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_position;
      
      void main() {
        v_position = a_position;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_position;
      
      void main() {
        vec2 uv = (v_position + 1.0) * 0.5;
        vec2 center = vec2(0.5, 0.5);
        
        float dist = distance(uv, center);
        float angle = atan(uv.y - center.y, uv.x - center.x);
        
        // Rotating wheel effect
        float wheel = sin(angle * 8.0 + u_time * 2.0) * 0.5 + 0.5;
        wheel *= smoothstep(0.3, 0.4, dist) * smoothstep(0.8, 0.7, dist);
        
        // Multiple rotating rings
        float ring1 = sin(angle * 12.0 - u_time * 3.0) * 0.3 + 0.7;
        ring1 *= smoothstep(0.2, 0.25, dist) * smoothstep(0.35, 0.3, dist);
        
        float ring2 = sin(angle * 16.0 + u_time * 1.5) * 0.2 + 0.8;
        ring2 *= smoothstep(0.45, 0.5, dist) * smoothstep(0.65, 0.6, dist);
        
        // Pulsing center
        float center_pulse = sin(u_time * 4.0) * 0.1 + 0.9;
        center_pulse *= smoothstep(0.15, 0.0, dist);
        
        // Combine effects
        float intensity = wheel + ring1 + ring2 + center_pulse;
        intensity *= 0.3; // Make it subtle
        
        // Blue gradient colors
        vec3 color1 = vec3(0.1, 0.3, 0.8); // Deep blue
        vec3 color2 = vec3(0.3, 0.6, 1.0); // Light blue
        vec3 color3 = vec3(0.8, 0.9, 1.0); // Very light blue
        
        vec3 finalColor = mix(color1, color2, intensity);
        finalColor = mix(finalColor, color3, intensity * 0.5);
        
        gl_FragColor = vec4(finalColor, intensity * 0.8);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render(time: number) {
      if (!canvas) return;
      
      resize();
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}