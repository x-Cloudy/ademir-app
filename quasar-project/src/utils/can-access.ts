import type { Role } from "src/types";
import { useAuthStore } from "src/stores/authStore";
import { computed } from "vue";

const authStore = useAuthStore()
const authRoles = computed(() => authStore.roles)

export const hasAccess = (menu_roles: Role[]) => {
  let access = false;
  menu_roles.map((item: Role) => {
    if (authRoles.value.includes(item)) {
      access = true
    }
  })
  return access;
}
