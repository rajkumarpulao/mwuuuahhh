let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;

    this.currentX = 0;
    this.currentY = 0;

    this.startX = 0;
    this.startY = 0;

    this.initialX = 0;
    this.initialY = 0;

    this.rotation = Math.random() * 30 - 15;
  }

  init(paper) {

    // ---------- DESKTOP ----------
    paper.addEventListener("mousedown", (e) => {
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      
      this.startX = e.clientX;
      this.startY = e.clientY;

      this.initialX = this.currentX;
      this.initialY = this.currentY;
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;

      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;

      this.currentX = this.initialX + dx;
      this.currentY = this.initialY + dy;

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    });

    document.addEventListener("mouseup", () => {
      this.holdingPaper = false;
    });




    // ---------- MOBILE ----------
    paper.addEventListener("touchstart", (e) => {
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;

      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;

      this.initialX = this.currentX;
      this.initialY = this.currentY;
    });

    paper.addEventListener("touchmove", (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault();

      const dx = e.touches[0].clientX - this.startX;
      const dy = e.touches[0].clientY - this.startY;

      this.currentX = this.initialX + dx;
      this.currentY = this.initialY + dy;

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

const papers = document.querySelectorAll(".paper");

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
