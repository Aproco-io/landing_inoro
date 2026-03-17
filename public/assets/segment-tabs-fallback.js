(function segmentTabsFallback() {
  const section = document.getElementById("segments");
  if (!section) return;
  const visual = section.querySelector(".static-segment-desktop");
  if (!visual) return;
  const img = visual.querySelector("img");
  if (!img) return;
  const map = {
    bpo: "assets/segment-bpo.png",
    bfsi: "assets/segment-bfsi.png",
    retail: "assets/segment-retail.png",
  };
  const setImage = function(key) {
    img.src = map[key] || map.bpo;
    img.alt = "Segment " + key;
  };
  function syncImageToActive() {
    var activeBtn = section.querySelector("button.active, button.bg-primary") || section.querySelector("button");
    if (!activeBtn) return;
    var txt = (activeBtn.textContent || "").toLowerCase();
    if (txt.includes("retail")) setImage("retail");
    else if (txt.includes("bpo")) setImage("bpo");
    else if (txt.includes("bfsi") || txt.includes("fintech")) setImage("bfsi");
  }
  syncImageToActive();
  section.querySelectorAll("button").forEach(function(btn) {
    btn.addEventListener("click", function() {
      section.querySelectorAll("button").forEach(function(b) {
        b.classList.remove("active");
        b.className = "static-tab";
      });
      btn.classList.add("active");
      btn.className = "static-tab active";
      var txt = (btn.textContent || "").toLowerCase();
      if (txt.includes("bpo")) setImage("bpo");
      else if (txt.includes("bfsi") || txt.includes("fintech")) setImage("bfsi");
      else if (txt.includes("retail")) setImage("retail");
    });
  });
})();
