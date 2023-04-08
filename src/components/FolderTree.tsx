import { useState } from "react";

type TEntry = {
  name: string;
  children?: TEntry[];
};
export const FolderTree = () => {
  const folders: TEntry[] = [
    {
      name: "node_modules",
      children: [{ name: "lodsh", children: [{ name: "compact" }] }],
    },
    {
      name: "package.json",
    },
  ];

  const Entry = ({ name, children, level }: { name: string; children?: TEntry[]; level: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <>
        <div onClick={() => setIsExpanded(!isExpanded)}>
          <span style={{ paddingLeft: 20 * level }}>{children?.length ? (isExpanded ? "-" : "+") : null}</span>
          <span>{name}</span>
        </div>
        {isExpanded && children ? children.map((entry: TEntry) => <Entry level={level + 1} {...entry} />) : null}
      </>
    );
  };
  return (
    <>
      {folders.map((entry) => (
        <Entry level={1} {...entry} />
      ))}
    </>
  );
};
