import { describe, test, expect, beforeEach } from "vitest";
import { VirtualFileSystem } from "@/lib/file-system";
import { buildFileManagerTool } from "@/lib/tools/file-manager";

let fs: VirtualFileSystem;
let execute: (args: { command: "rename" | "delete"; path: string; new_path?: string }) => Promise<unknown>;

beforeEach(() => {
  fs = new VirtualFileSystem();
  const tool = buildFileManagerTool(fs);
  execute = (tool as any).execute;
});

describe("rename command", () => {
  test("renames a file successfully", async () => {
    fs.createFile("/src/old.ts", "content");
    const result: any = await execute({
      command: "rename",
      path: "/src/old.ts",
      new_path: "/src/new.ts",
    });
    expect(result.success).toBe(true);
    expect(fs.exists("/src/old.ts")).toBe(false);
    expect(fs.exists("/src/new.ts")).toBe(true);
  });

  test("returns error when new_path is missing", async () => {
    fs.createFile("/file.ts", "content");
    const result: any = await execute({ command: "rename", path: "/file.ts" });
    expect(result.success).toBe(false);
    expect(result.error).toContain("new_path");
  });

  test("returns error when source does not exist", async () => {
    const result: any = await execute({
      command: "rename",
      path: "/ghost.ts",
      new_path: "/other.ts",
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test("returns error when destination already exists", async () => {
    fs.createFile("/a.ts", "a");
    fs.createFile("/b.ts", "b");
    const result: any = await execute({
      command: "rename",
      path: "/a.ts",
      new_path: "/b.ts",
    });
    expect(result.success).toBe(false);
  });

  test("creates parent directories when renaming to new path", async () => {
    fs.createFile("/file.ts", "content");
    const result: any = await execute({
      command: "rename",
      path: "/file.ts",
      new_path: "/nested/dir/file.ts",
    });
    expect(result.success).toBe(true);
    expect(fs.exists("/nested/dir/file.ts")).toBe(true);
  });
});

describe("delete command", () => {
  test("deletes a file successfully", async () => {
    fs.createFile("/remove.ts", "content");
    const result: any = await execute({ command: "delete", path: "/remove.ts" });
    expect(result.success).toBe(true);
    expect(fs.exists("/remove.ts")).toBe(false);
  });

  test("deletes a directory and its contents", async () => {
    fs.createFile("/dir/a.ts", "a");
    fs.createFile("/dir/b.ts", "b");
    const result: any = await execute({ command: "delete", path: "/dir" });
    expect(result.success).toBe(true);
    expect(fs.exists("/dir")).toBe(false);
  });

  test("returns error when path does not exist", async () => {
    const result: any = await execute({ command: "delete", path: "/ghost.ts" });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
