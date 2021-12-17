export let links = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Add Clients', href: '/addclients', current: false },
  { name: 'Groups', href: '/groups', current: false }
]

export const setActiveLink = (location) => {
  links.forEach(link => link.current = link.href === location.pathname ? true : false);
}