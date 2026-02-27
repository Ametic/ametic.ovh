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

  var maxCssWidth = 920;
  var baseFontSize = 30;
  var basePaddingX = 24;
  var basePaddingY = 24;
  var fontFamily =
    "'Cascadia Mono', 'Cascadia Code', Consolas, 'Courier New', monospace";

  var cssWidth = maxCssWidth;
  var cssHeight = 240;
  var yStart = 24;
  var lineHeight = 31;
  var x = 24;
  var fontSize = baseFontSize;
  var textWidthAtBaseSize = 0;

  function getTextWidth(size) {
    ctx.font = "700 " + size + "px " + fontFamily;
    var widest = 0;
    for (var i = 0; i < lines.length; i++) {
      var width = ctx.measureText(lines[i]).width;
      if (width > widest) widest = width;
    }
    return widest;
  }

  function updateLayout() {
    var containerWidth = canvas.parentElement
      ? canvas.parentElement.clientWidth
      : maxCssWidth;
    cssWidth = Math.max(220, Math.min(maxCssWidth, Math.floor(containerWidth)));

    if (!textWidthAtBaseSize) {
      textWidthAtBaseSize = getTextWidth(baseFontSize);
    }

    var availableTextWidth = Math.max(120, cssWidth - basePaddingX * 2);
    var scale = availableTextWidth / textWidthAtBaseSize;
    fontSize = Math.max(8, Math.floor(baseFontSize * scale));

    x = Math.max(8, Math.round(basePaddingX * scale));
    yStart = Math.max(8, Math.round(basePaddingY * scale));
    lineHeight = Math.max(9, Math.round(fontSize * 1.05));
    cssHeight = yStart * 2 + lineHeight * lines.length;
    canvas.style.height = cssHeight + "px";
  }

  function resize() {
    updateLayout();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }

  function draw(ts) {
    var t = ts || 0;
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.font = "700 " + fontSize + "px " + fontFamily;
    ctx.textBaseline = "top";

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
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      textWidthAtBaseSize = getTextWidth(baseFontSize);
      resize();
    });
  }
  window.requestAnimationFrame(draw);
})();
