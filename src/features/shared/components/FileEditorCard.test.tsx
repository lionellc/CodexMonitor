/** @vitest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FileEditorCard } from "./FileEditorCard";

const baseProps = {
  title: "Global AGENTS.md",
  value: "content",
  saveLabel: "Save",
  onChange: vi.fn(),
  onRefresh: vi.fn(),
  onSave: vi.fn(),
  classNames: {
    container: "card",
    header: "header",
    title: "title",
    actions: "actions",
    meta: "meta",
    iconButton: "icon",
    error: "error",
    textarea: "textarea",
    help: "help",
  },
};

describe("FileEditorCard", () => {
  it("supports read-only mode without save button", () => {
    render(
      <FileEditorCard
        {...baseProps}
        readOnly
        showSave={false}
        onChange={vi.fn()}
      />,
    );

    expect(screen.queryByLabelText("Save Global AGENTS.md")).toBeNull();
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
    fireEvent.change(textarea, { target: { value: "next" } });
    expect(baseProps.onChange).not.toHaveBeenCalled();
  });
});
