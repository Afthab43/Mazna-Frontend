import { create } from 'zustand';
import { SidebarGroupConfig } from '@/types/navigation';
import { FACTORY_DEFAULT_SIDEBAR } from '@/lib/constants/default-navigation';
import { NavigationService } from '@/services/navigationService';

interface NavigationStore {
  groups: SidebarGroupConfig[];
  isEditMode: boolean;
  activeRoleFilter: string; // "ALL" | "SUBADMIN" | "EMPLOYEE"
  expandedGroupIds: string[];
  allowNonAdminCustomization: boolean; // Admin preference allowance
  isLoading: boolean;
  isSaving: boolean;
  isSavedSuccess: boolean;
  error: string | null;

  setGroups: (groups: SidebarGroupConfig[]) => void;
  toggleGroupExpand: (groupId: string) => void;
  setEditMode: (enabled: boolean) => void;
  setActiveRoleFilter: (role: string) => void;
  setAllowNonAdminCustomization: (allow: boolean) => void;
  moveItem: (itemId: string, sourceGroupId: string, targetGroupId: string, targetIndex: number) => void;
  toggleItemVisibility: (groupId: string, itemId: string, role: string) => void;
  toggleGroupVisibility: (groupId: string, role: string) => void;
  resetToDefault: () => void;
  
  // Async DB sync actions
  fetchNavigation: () => Promise<void>;
  saveNavigationToDb: () => Promise<void>;
  resetNavigationInDb: () => Promise<void>;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  groups: FACTORY_DEFAULT_SIDEBAR,
  isEditMode: false,
  activeRoleFilter: 'ALL',
  expandedGroupIds: FACTORY_DEFAULT_SIDEBAR.map((g) => g.id),
  allowNonAdminCustomization: false,
  isLoading: false,
  isSaving: false,
  isSavedSuccess: false,
  error: null,

  setGroups: (groups) => set({ groups }),
  toggleGroupExpand: (groupId) =>
    set((state) => ({
      expandedGroupIds: state.expandedGroupIds.includes(groupId)
        ? state.expandedGroupIds.filter((id) => id !== groupId)
        : [...state.expandedGroupIds, groupId],
    })),

  setEditMode: (enabled) => set({ isEditMode: enabled }),
  setActiveRoleFilter: (role) => set({ activeRoleFilter: role }),
  setAllowNonAdminCustomization: (allow) => set({ allowNonAdminCustomization: allow }),

  moveItem: (itemId, sourceGroupId, targetGroupId, targetIndex) =>
    set((state) => {
      const newGroups = JSON.parse(JSON.stringify(state.groups)) as SidebarGroupConfig[];
      const sourceGroup = newGroups.find((g) => g.id === sourceGroupId);
      const targetGroup = newGroups.find((g) => g.id === targetGroupId);

      if (!sourceGroup || !targetGroup) return state;

      const itemIndex = sourceGroup.items.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) return state;

      const [movedItem] = sourceGroup.items.splice(itemIndex, 1);
      movedItem.isCustomized = true;
      targetGroup.items.splice(targetIndex, 0, movedItem);

      return { groups: newGroups };
    }),

  toggleItemVisibility: (groupId, itemId, role) =>
    set((state) => {
      const newGroups = JSON.parse(JSON.stringify(state.groups)) as SidebarGroupConfig[];
      const group = newGroups.find((g) => g.id === groupId);
      if (!group) return state;

      const item = group.items.find((i) => i.id === itemId);
      if (!item) return state;

      item.hiddenRoles = item.hiddenRoles || [];
      const targetRoles = role === 'ALL' ? ['SUBADMIN', 'EMPLOYEE'] : [role];

      const isHidden = targetRoles.some((r) => item.hiddenRoles?.includes(r));

      if (isHidden) {
        item.hiddenRoles = item.hiddenRoles.filter((r) => !targetRoles.includes(r));
      } else {
        targetRoles.forEach((r) => {
          if (!item.hiddenRoles!.includes(r)) item.hiddenRoles!.push(r);
        });
      }

      return { groups: newGroups };
    }),

  toggleGroupVisibility: (groupId, role) =>
    set((state) => {
      const newGroups = JSON.parse(JSON.stringify(state.groups)) as SidebarGroupConfig[];
      const group = newGroups.find((g) => g.id === groupId);
      if (!group) return state;

      group.hiddenRoles = group.hiddenRoles || [];
      const targetRoles = role === 'ALL' ? ['SUBADMIN', 'EMPLOYEE'] : [role];

      const isHidden = targetRoles.some((r) => group.hiddenRoles?.includes(r));

      if (isHidden) {
        group.hiddenRoles = group.hiddenRoles.filter((r) => !targetRoles.includes(r));
      } else {
        targetRoles.forEach((r) => {
          if (!group.hiddenRoles!.includes(r)) group.hiddenRoles!.push(r);
        });
      }

      return { groups: newGroups };
    }),

  resetToDefault: () => set({ groups: FACTORY_DEFAULT_SIDEBAR }),

  fetchNavigation: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await NavigationService.getNavigationConfig();
      set({
        groups: data.groups,
        allowNonAdminCustomization: data.allowNonAdminCustomization,
        expandedGroupIds: data.groups.map((g) => g.id),
      });
    } catch (err: any) {
      set({ error: err.message || 'Error fetching navigation layout' });
    } finally {
      set({ isLoading: false });
    }
  },

  saveNavigationToDb: async () => {
    const { groups, allowNonAdminCustomization } = get();
    set({ isSaving: true, error: null, isSavedSuccess: false });
    try {
      await NavigationService.saveNavigationConfig(groups, allowNonAdminCustomization);
      set({ isSavedSuccess: true });
      setTimeout(() => set({ isSavedSuccess: false }), 3000);
    } catch (err: any) {
      set({ error: err.message || 'Failed to save navigation changes to DB' });
    } finally {
      set({ isSaving: false });
    }
  },

  resetNavigationInDb: async () => {
    set({ isSaving: true, error: null });
    try {
      const data = await NavigationService.resetNavigationConfig();
      set({
        groups: data.groups,
        allowNonAdminCustomization: data.allowNonAdminCustomization,
        expandedGroupIds: data.groups.map((g) => g.id),
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to reset navigation layout in DB' });
    } finally {
      set({ isSaving: false });
    }
  },
}));
