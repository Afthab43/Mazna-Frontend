'use client';

import React from 'react';
import { SidebarGroupConfig } from '@/types/navigation';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface Props {
  group: SidebarGroupConfig;
}

export const SidebarGroupHeader: React.FC<Props> = ({ group }) => {
  const {
    expandedGroupIds,
    toggleGroupExpand,
    isEditMode,
    activeRoleFilter,
    toggleGroupVisibility,
  } = useNavigationStore();

  const isExpanded = expandedGroupIds.includes(group.id);
  const isHiddenForRole = activeRoleFilter !== 'ALL' && group.hiddenRoles?.includes(activeRoleFilter);

  return (
    <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
      <button
        type="button"
        onClick={() => toggleGroupExpand(group.id)}
        className="flex items-center space-x-1 hover:text-slate-700 transition"
      >
        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <span className={isHiddenForRole ? 'line-through opacity-50' : ''}>{group.title}</span>
      </button>

      {isEditMode && (
        (() => {
          const targetRoles = activeRoleFilter === 'ALL' ? ['SUBADMIN', 'EMPLOYEE'] : [activeRoleFilter];
          const isHidden = targetRoles.some((r) => group.hiddenRoles?.includes(r));
          return (
            <button
              type="button"
              onClick={() => toggleGroupVisibility(group.id, activeRoleFilter)}
              className={`p-0.5 rounded hover:bg-slate-200 transition ${
                isHidden ? 'text-red-500' : 'text-emerald-600'
              }`}
              title={`Toggle group visibility (${isHidden ? 'Hidden' : 'Visible'} for ${activeRoleFilter})`}
            >
              {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          );
        })()
      )}
    </div>
  );
};
