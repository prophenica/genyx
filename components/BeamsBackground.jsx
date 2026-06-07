"use client";
import { useEffect, useRef } from "react";

function createBeam(width, height) {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 270 + Math.random() * 40,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export default function BeamsBackground({ children }) {
  const canvasRef = useRef(null);
  const beamsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
      beamsRef.current = Array.from({ length: 30 }, () =>
        createBeam(window.innerWidth, window.innerHeight)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    function resetBeam(beam, index) {
      const column = index % 3;
      const spacing = window.innerWidth / 3;
      beam.y = window.innerHeight + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 100;
      beam.speed = 0.4 + Math.random() * 0.5;
      beam.hue = 260 + (index * 50) / 30;
      beam.opacity = 0.15 + Math.random() * 0.12;
    }

    function drawBeam(beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);
      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
      const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
      grad.addColorStop(0, `hsla(${beam.hue}, 80%, 60%, 0)`);
      grad.addColorStop(0.1, `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity * 0.5})`);
      grad.addColorStop(0.4, `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity})`);
      grad.addColorStop(0.6, `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity})`);
      grad.addColorStop(0.9, `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity * 0.5})`);
      grad.addColorStop(1, `hsla(${beam.hue}, 80%, 60%, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";
      beamsRef.current.forEach((beam, i) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -100) resetBeam(beam, i);
        drawBeam(beam);
      });
      rafRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0208" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, filter: "blur(15px)" }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
