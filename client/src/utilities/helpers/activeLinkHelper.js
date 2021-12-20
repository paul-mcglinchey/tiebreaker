import { links } from '../config';

const setActiveLink = (location) => {
  links.forEach(link => {
    link.current = location.pathname.includes(link.href) ? true : false
  });
}

const activeLinkHelper = {
  setActiveLink
}

export default activeLinkHelper;