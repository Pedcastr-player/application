import { IconName } from "@/components/Icon";

export enum Routes {
  Home = "/",
  Playlists = "/playlists",
  Settings = "/settings",
}

export type RouteProps = {
  name: string;
  iconName: IconName;
  route: Routes;
  isActive: boolean;
};
