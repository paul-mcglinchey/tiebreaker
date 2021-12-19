import links from '../config/links';

const setActiveLink = (location) => {
  links.forEach(link => {
    link.current = location.pathname.includes(link.href) ? true : false
  });
}

export const activeLinkHelper = {
  setActiveLink
}