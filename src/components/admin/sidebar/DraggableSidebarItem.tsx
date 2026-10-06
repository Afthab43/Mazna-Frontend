'use client';

import React from 'react';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Icons from 'lucide-react';

import { SidebarNavItemConfig } from '@/types/navigation';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

interface Props {
  item: SidebarNavItemConfig;
  groupId: string;
  index: number;
  isActive: boolean;
  isEditMode: boolean;
}

export const DraggableSidebarItem: React.FC<Props> = ({
  item,
  groupId,
  index,
  isActive,
  isEditMode,
}) => {
  const { toggleItemVisibility, activeRoleFilter } = useNavigationStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      groupId,
      index,
    },
    disabled: !isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // Dynamically render icon component
  const IconComponent = (Icons as any)[item.icon] || Icons.FileText;

  const isHiddenForFilter = activeRoleFilter !== 'ALL' && item.hiddenRoles?.includes(activeRoleFilter);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        isActive
          ? 'bg-blue-600 text-white shadow-sm font-semibold'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      } ${isHiddenForFilter ? 'opacity-40 line-through' : ''}`}
    >
      <div className="flex items-center space-x-2.5 truncate flex-1">
        {isEditMode && (
          <span
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 p-0.5"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </span>
        )}

        <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />

        {isEditMode ? (
          <span className="truncate">{item.title}</span>
        ) : (
          <Link href={item.href} className="truncate flex-1">
            {item.title}
          </Link>
        )}
      </div>

      {/* Edit Mode Toggle for Role Visibility */}
      {isEditMode ? (
        <div className="flex items-center space-x-1">
          {(() => {
            const targetRoles = activeRoleFilter === 'ALL' ? ['SUBADMIN', 'EMPLOYEE'] : [activeRoleFilter];
            const isHidden = targetRoles.some((r) => item.hiddenRoles?.includes(r));
            return (
              <button
                type="button"
                onClick={() => toggleItemVisibility(groupId, item.id, activeRoleFilter)}
                className={`p-1 rounded hover:bg-slate-200 transition ${
                  isHidden ? 'text-red-500' : 'text-emerald-600'
                }`}
                title={`Toggle item visibility (${isHidden ? 'Hidden' : 'Visible'} for ${activeRoleFilter})`}
              >
                {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            );
          })()}
        </div>
      ) : (
        item.badgeKey && (
          <span className={`ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            3
          </span>
        )
      )}
    </div>
  );
};
