"use client";
import { MenuItem, MenuList } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

type TMenuItem = {
  id: string;
  label: string;
  path: string;
};

const menu: TMenuItem[] = [
  { id: "sourcecode", label: "Source Code", path: "/sourcecode" },
  { id: "code-playground", label: "Code Playground", path: "/code-playground" },
  { id: "design", label: "Design", path: "/design" },
  { id: "specs", label: "Specs", path: "/specs" },
  { id: "testcase", label: "Test cases", path: "/testcase" },
  { id: "chat", label: "chat", path: "/chat" },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { projectId } = useParams();

  const renderMenu = useCallback(
    (menu: TMenuItem) => {
      const itemPath = `/project/${projectId}${menu.path}`;

      let className = "w-full h-[57px]";

      if (pathname === itemPath) {
        className = `${className} !bg-gray-300`;
      }

      return (
        <MenuItem
          className={className}
          component={Link}
          href={itemPath}
          key={menu.id}
        >
          {menu.label}
        </MenuItem>
      );
    },
    [pathname, projectId]
  );

  return (
    <MenuList className="h-screen border-r p-0">
      {menu.map(renderMenu)}
    </MenuList>
  );
};
