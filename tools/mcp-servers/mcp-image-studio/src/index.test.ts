import { describe, expect, test, beforeAll } from "bun:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const { generateImage } = await import("./index.ts");
const { getAvailableModels } = await import("./models.js");

const hasApiKey = !!process.env.AIML_API_KEY;

let tmpDir: string;

beforeAll(async () => {
  tmpDir = await mkdtemp(join(tmpdir(), "mcp-image-studio-test-"));
});

describe("generateImage", () => {
  const model = getAvailableModels()[0];

  test("throws when AIML_API_KEY is missing", async () => {
    const key = process.env.AIML_API_KEY;
    delete process.env.AIML_API_KEY;

    expect(
      generateImage({
        prompt: "cat",
        model,
        n: 1,
        size: "1024x1024",
        outputDir: tmpDir,
      })
    ).rejects.toThrow("AIML_API_KEY not set");

    if (key) process.env.AIML_API_KEY = key;
  });

  test("generates an image with flux/schnell", async () => {
    if (!hasApiKey) return;

    const results = await generateImage({
      prompt: "A cute cat sitting on a sofa, digital art",
      model: getAvailableModels().find((m) => m.id === "flux/schnell")!,
      n: 1,
      size: "1024x1024",
      outputDir: tmpDir,
      filename: "integration-cat",
    });

    expect(results).toHaveLength(1);
    expect(results[0].model).toBe("flux/schnell");
    expect(results[0].cost).toBeGreaterThan(0);
    expect(results[0].imagePath).toContain("integration-cat_v001.png");

    const file = await readFile(results[0].imagePath);
    expect(file.byteLength).toBeGreaterThan(100);
  });

  test("generates an image with a realistic prompt", async () => {
    if (!hasApiKey) return;

    const results = await generateImage({
      prompt: "A red apple on a table, photorealistic, high detail",
      model: getAvailableModels().find((m) => m.id === "flux/schnell")!,
      n: 1,
      size: "1024x1024",
      outputDir: tmpDir,
      filename: "integration-apple",
    });

    expect(results).toHaveLength(1);
    expect(results[0].imagePath).toContain("integration-apple_v001.png");

    const file = await readFile(results[0].imagePath);
    expect(file.byteLength).toBeGreaterThan(100);
  });

  test("handles API error with invalid model", async () => {
    if (!hasApiKey) return;

    const badModel = { id: "nonexistent-model", label: "Bad", costPerImage: 0, maxSize: "1024x1024" };

    expect(
      generateImage({
        prompt: "test",
        model: badModel,
        n: 1,
        size: "1024x1024",
        outputDir: tmpDir,
      })
    ).rejects.toThrow(/AIML API error/);
  });
});
