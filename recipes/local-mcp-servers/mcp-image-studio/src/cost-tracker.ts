import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { CostEntry } from "./types.js";

export class CostTracker {
  private entries: CostEntry[] = [];
  private totalCost: number = 0;

  addEntry(entry: CostEntry): void {
    this.entries.push(entry);
    this.totalCost += entry.cost;
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  getEntries(): CostEntry[] {
    return [...this.entries];
  }

  getSummary(): { totalCost: number; perModel: Record<string, { count: number; cost: number }> } {
    const perModel: Record<string, { count: number; cost: number }> = {};
    for (const e of this.entries) {
      if (!perModel[e.model]) perModel[e.model] = { count: 0, cost: 0 };
      perModel[e.model].count += e.imageCount;
      perModel[e.model].cost += e.cost;
    }
    return { totalCost: this.totalCost, perModel };
  }

  async persist(filePath: string): Promise<void> {
    const dir = dirname(resolve(filePath));
    await mkdir(dir, { recursive: true });
    const data = {
      generatedAt: new Date().toISOString(),
      totalCost: this.totalCost,
      perModel: this.getSummary().perModel,
      entries: this.entries,
    };
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }
}
