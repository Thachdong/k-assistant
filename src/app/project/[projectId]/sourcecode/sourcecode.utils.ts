export type TFileNode = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size: number;
  url: string;
};

export type TTreeNode = {
  key: string;
  title: string;
  children?: TTreeNode[];
  isLeaf?: boolean;
  data?: {
    mode: string;
    sha: string;
    size: number;
    url: string;
    path: string;
  };
};

export function convertToRCTreeData(fileList: TFileNode[]): TTreeNode[] {
  const rootNodes: TTreeNode[] = [];

  fileList.forEach((file, index) => {
    const pathParts = file.path.split("/");
    let currentNode = rootNodes;

    pathParts.forEach((part, idx) => {
      let existingNode = currentNode.find((node) => node.title === part);

      if (!existingNode) {
        existingNode = {
          key: pathParts.slice(0, idx + 1).join("-"),
          title: part,
          children: [],
        };
        currentNode.push(existingNode);
      }

      if (idx === pathParts.length - 1 && file.type === "blob") {
        existingNode.isLeaf = true;
        existingNode.data = {
          mode: file.mode,
          sha: file.sha,
          size: file.size,
          url: file.url,
          path: file.path,
        };
      }

      currentNode = existingNode.children!;
    });
  });

  const cleanAndSortTree = (nodes: TTreeNode[]): TTreeNode[] => {
    return nodes
      .map((node) => {
        if (node.children && node.children.length === 0) {
          delete node.children;
        } else if (node.children) {
          node.children = cleanAndSortTree(node.children);
        }
        return node;
      })
      .sort((a, b) => {
        if (a.children && !b.children) return -1; // Folders first
        if (!a.children && b.children) return 1; // Files later
        return a.title.localeCompare(b.title); // Alphabetical order
      });
  };

  return cleanAndSortTree(rootNodes);
}
