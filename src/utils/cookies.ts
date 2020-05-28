import cookie from 'js-cookie';

const sidebarStatusKey = 'sidebar_status';
export const getSidebarStatus = () => cookie.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) => cookie.set(sidebarStatusKey, sidebarStatus);
