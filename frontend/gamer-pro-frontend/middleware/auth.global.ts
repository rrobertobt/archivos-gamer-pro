import { useSessionStore } from "~/store/session"

export default defineNuxtRouteMiddleware((to, _from) => {
  const {session, role} = storeToRefs(useSessionStore())
  const roles = ['admin', 'cashier', 'warehouse', 'inventory']
  
  const pathIncludesRoles = roles.some(role => to.fullPath.includes(role))
  if (!session.value && pathIncludesRoles) {
    return navigateTo('/login')
  }

  // Check if the to route is the user's role
  const isAuthorizedRole = to.fullPath.includes(role.value)
  if (session.value && !isAuthorizedRole) {
    return navigateTo(`/${role.value}`)
  }

  if (session.value && to.fullPath.includes('login')) {
    return navigateTo('/')
  }

})