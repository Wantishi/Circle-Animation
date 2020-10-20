import React from "react";
import { useEffect, useRef } from "react";
const Circles = () => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let width;
    let height;

    // draw clean lines for high-res monitors (2x)
    if (typeof window !== "undefined") {
      if (window.matchMedia("(min-width: 1160px)").matches) {
        // Desktop size
        width = 700;
        height = 700;
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        // Tablet size
        width = 372;
        height = 372;
      } else {
        // Mobile size
        width = 246;
        height = 246;
      }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let requestId;
    const render = () => {
      const angle = Math.PI * 2;
      const time = new Date();
      const revolution =
        ((2 * Math.PI) / 8) * time.getSeconds() +
        ((2 * Math.PI) / 8000) * time.getMilliseconds();
      const goldenRatio = 1.618;
      let radius = width / 2;

      ctx.globalCompositeOperation = "destination-over";
      ctx.clearRect(0, 0, width, height); // clear canvas

      ctx.strokeStyle = "rgba(181, 199, 192, .5)";
      ctx.save();
      ctx.translate(width / 2, height / 2); // center axis

      // Bounding Circle
      ctx.beginPath();
      ctx.arc(0, 0, radius - 1, 0, angle, true);
      ctx.stroke();

      // ring 1
      ctx.beginPath();
      ctx.rotate(revolution);
      ctx.translate(radius / goldenRatio / goldenRatio, 0);
      ctx.arc(0, 0, radius / goldenRatio - 1, 0, angle, true);
      ctx.stroke();

      // rings 2-7
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.rotate(revolution);
        radius = radius / goldenRatio;
        ctx.translate(radius / goldenRatio / goldenRatio, 0);
        ctx.arc(0, 0, radius / goldenRatio - 1, 0, angle, true);
        ctx.stroke();
      }

      ctx.restore();
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <canvas
      ref={ref}
      // style={{ width: width+'px', height: height+'px' }}
    />
  );
};

export default Circles;
