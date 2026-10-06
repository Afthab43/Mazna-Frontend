'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { useNavigationStore } from '@/stores/useNavigationStore';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/api-client';
import { PermissionGate } from '@/components/shared/PermissionGate';
import { DraggableSidebarItem } from './DraggableSidebarItem';
import { SidebarGroupHeader } from './SidebarGroupHeader';
import { Settings, RefreshCw, LogOut, CheckCircle, Loader2 } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuth();
  const {
    groups,
    isEditMode,
    activeRoleFilter,
    expandedGroupIds,
    allowNonAdminCustomization,
    isSaving,
    isSavedSuccess,
    setEditMode,
    setActiveRoleFilter,
    moveItem,
    fetchNavigation,
    saveNavigationToDb,
    resetNavigationInDb,
  } = useNavigationStore();

  useEffect(() => {
    fetchNavigation();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData && overData) {
      moveItem(
        active.id as string,
        activeData.groupId,
        overData.groupId,
        overData.index
      );
    }
  };

  const handleToggleCustomize = async () => {
    if (isEditMode) {
      // Save changes to DB when exiting edit mode
      await saveNavigationToDb();
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleResetLayout = async () => {
    await resetNavigationInDb();
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
    } catch (e) {}
    setUser(null);
    router.push('/login');
  };

  const isAdmin = user?.accountType === 'ADMIN';
  const hasCustomizePermission = user?.permissions?.includes('roles.manage') || user?.permissions?.includes('settings.update');
  const canCustomize = isAdmin || (allowNonAdminCustomization && hasCustomizePermission);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header with Image Logo + Typography matching Figma */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center space-x-2.5 group">
          <img
            src="/images/mazna-logo.png"
            alt="MAZNA ENTERPRISES"
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col text-left font-sans leading-tight">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">MAZNA</span>
            <span className="font-extrabold text-blue-600 text-xs tracking-tight">ENTERPRISES</span>
          </div>
        </Link>
      </div>

      {/* Admin Customizer Toolbar - Shown ONLY to Admin or when Admin enables allowance */}
      {canCustomize && (
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-semibold flex items-center gap-1 text-[11px]">
              <Settings className="w-3.5 h-3.5 text-blue-600" />
              Sidebar Layout Engine
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleToggleCustomize}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition flex items-center gap-1 ${
                  isEditMode
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {isSaving ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : isSavedSuccess ? (
                  <CheckCircle className="w-3 h-3 text-emerald-300" />
                ) : null}
                {isEditMode ? 'Save' : 'Customize'}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleResetLayout}
                  title="Reset to Factory Layout in DB"
                  className="p-1 text-slate-500 hover:text-red-600 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Role Filter Selector in Customize Mode */}
          {isEditMode && (
            <div className="flex items-center space-x-1 pt-1 border-t border-slate-200 text-[10px]">
              <span className="text-slate-500 font-medium">Role Filter:</span>
              {['ALL', 'SUBADMIN', 'EMPLOYEE'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setActiveRoleFilter(role)}
                  className={`px-1.5 py-0.5 rounded font-medium ${
                    activeRoleFilter === role
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dynamic Drag-and-Drop Sidebar Navigation Groups */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {groups.map((group) => {
            if (!isEditMode && group.hiddenRoles?.includes(user?.accountType || '')) {
              return null;
            }

            const isExpanded = expandedGroupIds.includes(group.id);

            return (
              <div key={group.id} className="space-y-1">
                <SidebarGroupHeader group={group} />

                {isExpanded && (
                  <SortableContext items={group.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-0.5">
                      {group.items.map((item, index) => {
                        if (!isEditMode && item.hiddenRoles?.includes(user?.accountType || '')) {
                          return null;
                        }

                        return (
                          <PermissionGate key={item.id} permission={item.permissionKey}>
                            <DraggableSidebarItem
                              item={item}
                              groupId={group.id}
                              index={index}
                              isActive={pathname === item.href}
                              isEditMode={isEditMode}
                            />
                          </PermissionGate>
                        );
                      })}
                    </div>
                  </SortableContext>
                )}
              </div>
            );
          })}
        </div>
      </DndContext>

      {/* User Footer Profile Card with Name, Role & Logout Button */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 border border-blue-200">
            {user?.firstName?.[0] || 'A'}
            {user?.lastName?.[0] || 'M'}
          </div>
          <div className="truncate">
            <p className="font-bold text-slate-900 truncate">
              {user?.firstName || 'System'} {user?.lastName || 'Admin'}
            </p>
            <p className="text-slate-500 font-semibold text-[10px] uppercase">
              {user?.roleName || user?.accountType || 'ADMIN'}
            </p>
          </div>
        </div>

        {/* Actionable Logout Button on Bottom Left Sidebar */}
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
