import { describe, test, expect, beforeEach } from "vitest";
import { VirtualFileSystem } from "@/lib/file-system";
import { buildStrReplaceTool } from "@/lib/tools/str-replace";

let fs: VirtualFileSystem;
let tool: ReturnType<typeof buildStrReplaceTool>;

beforeEach(() => {
  fs = new VirtualFileSystem();
  tool = buildStrReplaceTool(fs);
});

describe("tool metadata", () => {
  test("has correct id", () => {
    expect(tool.id).toBe("str_replace_editor");
  });
});

describe("view command", () => {
  test("returns file content with line numbers", async () => {
    fs.createFile("/hello.txt", "line1\nline2");
    const result = await tool.execute({ command: "view", path: "/hello.txt" });
    expect(result).toBe("1\tline1\n2\tline2");
  });

  test("returns ranged view when view_range is provided", async () => {
    fs.createFile("/hello.txt", "a\nb\nc\nd");
    const result = await tool.execute({
      command: "view",
      path: "/hello.txt",
      view_range: [2, 3],
    });
    expect(result).toBe("2\tb\n3\tc");
  });

  test("returns error for non-existent file", async () => {
    const result = await tool.execute({ command: "view", path: "/missing.txt" });
    expect(result).toContain("File not found");
  });
});

describe("create command", () => {
  test("creates a new file", async () => {
    const result = await tool.execute({
      command: "create",
      path: "/new.tsx",
      file_text: "export default () => null;",
    });
    expect(result).toContain("File created");
    expect(fs.readFile("/new.tsx")).toBe("export default () => null;");
  });

  test("creates file with empty content when file_text is omitted", async () => {
    await tool.execute({ command: "create", path: "/empty.ts" });
    expect(fs.readFile("/empty.ts")).toBe("");
  });

  test("returns error when file already exists", async () => {
    fs.createFile("/exists.ts", "existing");
    const result = await tool.execute({
      command: "create",
      path: "/exists.ts",
      file_text: "new",
    });
    expect(result).toContain("Error");
  });
});

describe("str_replace command", () => {
  test("replaces text in file", async () => {
    fs.createFile("/app.tsx", "const foo = 1;");
    const result = await tool.execute({
      command: "str_replace",
      path: "/app.tsx",
      old_str: "foo",
      new_str: "bar",
    });
    expect(result).toContain("Replaced");
    expect(fs.readFile("/app.tsx")).toBe("const bar = 1;");
  });

  test("returns error when old_str not found", async () => {
    fs.createFile("/app.tsx", "const foo = 1;");
    const result = await tool.execute({
      command: "str_replace",
      path: "/app.tsx",
      old_str: "missing",
      new_str: "x",
    });
    expect(result).toContain("Error");
  });

  test("returns error for non-existent file", async () => {
    const result = await tool.execute({
      command: "str_replace",
      path: "/ghost.ts",
      old_str: "x",
      new_str: "y",
    });
    expect(result).toContain("Error");
  });
});

describe("insert command", () => {
  test("inserts text at specified line", async () => {
    fs.createFile("/file.ts", "line1\nline3");
    const result = await tool.execute({
      command: "insert",
      path: "/file.ts",
      insert_line: 1,
      new_str: "line2",
    });
    expect(result).toContain("inserted");
    expect(fs.readFile("/file.ts")).toBe("line1\nline2\nline3");
  });

  test("defaults insert_line to 0 when omitted", async () => {
    fs.createFile("/file.ts", "existing");
    const result = await tool.execute({
      command: "insert",
      path: "/file.ts",
      new_str: "prepended",
    });
    expect(result).toContain("inserted");
    expect(fs.readFile("/file.ts")).toBe("prepended\nexisting");
  });
});

describe("undo_edit command", () => {
  test("returns unsupported error message", async () => {
    const result = await tool.execute({
      command: "undo_edit",
      path: "/any.ts",
    });
    expect(result).toContain("not supported");
  });
});
