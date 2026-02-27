(function () {
  var canvas = document.getElementById("ascii-banner");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var lines = [
    " █████╗ ███╗   ███╗███████╗████████╗██╗ ██████╗",
    "██╔══██╗████╗ ████║██╔════╝╚══██╔══╝██║██╔════╝",
    "███████║██╔████╔██║█████╗     ██║   ██║██║     ",
    "██╔══██║██║╚██╔╝██║██╔══╝     ██║   ██║██║     ",
    "██║  ██║██║ ╚═╝ ██║███████╗   ██║   ██║╚██████╗",
    "╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝",
  ];

  var cssWidth = 920;
  var cssHeight = 240;
  var yStart = 40;
  var lineHeight = 31;
  var x = 24;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }

  function draw(ts) {
    var t = ts || 0;
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.font =
      "700 30px 'Cascadia Mono', 'Cascadia Code', Consolas, 'Courier New', monospace";
    ctx.textBaseline = "top";

    // Use sinusoidal motion to avoid hard wrap jumps in the gradient cycle.
    var phase = t * 0.0006;
    var shift = Math.sin(phase) * (cssWidth * 0.45);
    var gradient = ctx.createLinearGradient(
      -cssWidth * 0.3 + shift,
      0,
      cssWidth * 1.3 + shift,
      cssHeight
    );
    gradient.addColorStop(0.0, "#eb6f92");
    gradient.addColorStop(0.25, "#ebbcba");
    gradient.addColorStop(0.5, "#c4a7e7");
    gradient.addColorStop(0.75, "#9ccfd8");
    gradient.addColorStop(1.0, "#eb6f92");

    ctx.fillStyle = gradient;
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, yStart + i * lineHeight);
    }

    window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(draw);
})();
