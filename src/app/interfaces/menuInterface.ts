import { SubMenuInterface } from './suMenuInterface';

export interface MenuInterface {
  active: boolean;
  description: string;
  icon: string;
  id: number;
  menus: Array<SubMenuInterface>;
  menusystem: boolean;
  orderby: number;
  route: string;
}
