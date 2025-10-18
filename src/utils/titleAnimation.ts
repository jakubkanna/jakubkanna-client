// AnimatedTitle.ts
export class AnimatedTitle {
  private displayedTitle: string[] = [];
  private onUpdate: (title: string) => void;

  constructor(onUpdate: (title: string) => void) {
    this.onUpdate = onUpdate;
  }

  private getRandomLetter(): string {
    const isUppercase = Math.random() > 0.5;
    const charCodeStart = isUppercase ? 65 : 97;
    const charCodeEnd = isUppercase ? 90 : 122;

    const randomCharCode =
      Math.floor(Math.random() * (charCodeEnd - charCodeStart + 1)) +
      charCodeStart;
    return String.fromCharCode(randomCharCode);
  }

  public animate(newTitle: string): void {
    this.displayedTitle = new Array(newTitle.length).fill("");
    this.onUpdate(this.displayedTitle.join(""));

    newTitle.split("").forEach((char, index) => {
      setTimeout(() => {
        const maxRandomSteps = 3;

        for (let i = 0; i < maxRandomSteps; i++) {
          setTimeout(() => {
            this.displayedTitle[index] = this.getRandomLetter();
            this.onUpdate(this.displayedTitle.join(""));
          }, i * 50);
        }

        setTimeout(() => {
          this.displayedTitle[index] = char;
          this.onUpdate(this.displayedTitle.join(""));
        }, maxRandomSteps * 100);
      }, index * 50);
    });
  }
}
