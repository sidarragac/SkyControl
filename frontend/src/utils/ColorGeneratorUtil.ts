// Developed by Santiago Idárraga

export class ColorGeneratorUtil {
  static generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor((360 / count) * i);
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  }
}
