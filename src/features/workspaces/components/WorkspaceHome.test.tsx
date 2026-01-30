// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type {
  CustomPromptOption,
  DictationSessionState,
  DictationTranscript,
  ModelOption,
  SkillOption,
  WorkspaceInfo,
} from "../../../types";
import { WorkspaceHome } from "./WorkspaceHome";

vi.mock("@tauri-apps/api/core", () => ({
  convertFileSrc: (path: string) => path,
}));

vi.mock("../../composer/components/ComposerInput", () => ({
  ComposerInput: () => <div data-testid="composer-input" />,
}));

vi.mock("../../composer/hooks/useComposerImages", () => ({
  useComposerImages: () => ({
    activeImages: [],
    attachImages: vi.fn(),
    pickImages: vi.fn(),
    removeImage: vi.fn(),
    clearActiveImages: vi.fn(),
  }),
}));

vi.mock("../../composer/hooks/useComposerAutocompleteState", () => ({
  useComposerAutocompleteState: () => ({
    isAutocompleteOpen: false,
    autocompleteMatches: [],
    highlightIndex: 0,
    setHighlightIndex: vi.fn(),
    applyAutocomplete: vi.fn(),
    handleInputKeyDown: vi.fn(),
    handleTextChange: vi.fn(),
    handleSelectionChange: vi.fn(),
  }),
}));

vi.mock("../../composer/hooks/usePromptHistory", () => ({
  usePromptHistory: () => ({
    handleHistoryKeyDown: vi.fn(),
    handleHistoryTextChange: vi.fn(),
    recordHistory: vi.fn(),
    resetHistoryNavigation: vi.fn(),
  }),
}));

const workspace: WorkspaceInfo = {
  id: "w1",
  name: "Workspace",
  path: "/tmp/workspace",
  connected: false,
  codex_bin: null,
  kind: "main",
  parentId: null,
  worktree: null,
  settings: { sidebarCollapsed: false, codexArgs: null },
};

const models: ModelOption[] = [
  {
    id: "model-1",
    model: "gpt-4",
    displayName: "Model 1",
    description: "Model 1 description",
    supportedReasoningEfforts: [],
    defaultReasoningEffort: null,
    isDefault: true,
  },
];

const dictationState: DictationSessionState = "idle";

describe("WorkspaceHome", () => {
  it("disables the global AGENTS.md editor", () => {
    render(
      <WorkspaceHome
        workspace={workspace}
        runs={[]}
        recentThreadInstances={[]}
        recentThreadsUpdatedAt={null}
        prompt=""
        onPromptChange={vi.fn()}
        onStartRun={vi.fn().mockResolvedValue(true)}
        runMode="local"
        onRunModeChange={vi.fn()}
        models={models}
        selectedModelId={models[0].id}
        onSelectModel={vi.fn()}
        modelSelections={{ [models[0].id]: 1 }}
        onToggleModel={vi.fn()}
        onModelCountChange={vi.fn()}
        error={null}
        isSubmitting={false}
        activeWorkspaceId={workspace.id}
        activeThreadId={null}
        threadStatusById={{}}
        onSelectInstance={vi.fn()}
        skills={[] as SkillOption[]}
        prompts={[] as CustomPromptOption[]}
        files={[]}
        dictationEnabled={false}
        dictationState={dictationState}
        dictationLevel={0}
        onToggleDictation={vi.fn()}
        onOpenDictationSettings={vi.fn()}
        dictationError={null}
        onDismissDictationError={vi.fn()}
        dictationHint={null}
        onDismissDictationHint={vi.fn()}
        dictationTranscript={null as DictationTranscript | null}
        onDictationTranscriptHandled={vi.fn()}
        agentMdContent=""
        agentMdExists
        agentMdTruncated={false}
        agentMdLoading={false}
        agentMdSaving={false}
        agentMdError={null}
        agentMdDirty={false}
        onAgentMdChange={vi.fn()}
        onAgentMdRefresh={vi.fn()}
        onAgentMdSave={vi.fn()}
        showGlobalAgentsInWorkspace
        globalAgentsContent="global"
        globalAgentsExists
        globalAgentsTruncated={false}
        globalAgentsLoading={false}
        globalAgentsError={null}
        onGlobalAgentsRefresh={vi.fn()}
      />,
    );

    const textarea = screen.getByPlaceholderText(
      "Global instructions are stored in ~/.codex/AGENTS.md",
    ) as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });
});
