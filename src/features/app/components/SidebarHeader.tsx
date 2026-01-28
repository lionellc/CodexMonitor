import FolderKanban from "lucide-react/dist/esm/icons/folder-kanban";
import Search from "lucide-react/dist/esm/icons/search";

type SidebarHeaderProps = {
  onSelectHome: () => void;
  onAddWorkspace: () => void;
  onToggleSearch: () => void;
  isSearchOpen: boolean;
};

export function SidebarHeader({
  onSelectHome,
  onAddWorkspace,
  onToggleSearch,
  isSearchOpen,
}: SidebarHeaderProps) {
  return (
    <div className="sidebar-header">
      <div>
        <button
          className="subtitle subtitle-button"
          onClick={onSelectHome}
          data-tauri-drag-region="false"
          aria-label="Open home"
        >
          <FolderKanban className="sidebar-nav-icon" />
          Projects
        </button>
      </div>
      <div className="sidebar-header-actions">
        <button
          className={`ghost sidebar-search-toggle${isSearchOpen ? " is-active" : ""}`}
          onClick={onToggleSearch}
          data-tauri-drag-region="false"
          aria-label="Toggle search"
          aria-pressed={isSearchOpen}
          type="button"
        >
          <Search aria-hidden />
        </button>
        <button
          className="ghost workspace-add"
          onClick={onAddWorkspace}
          data-tauri-drag-region="false"
          aria-label="Add workspace"
        >
          +
        </button>
      </div>
    </div>
  );
}
