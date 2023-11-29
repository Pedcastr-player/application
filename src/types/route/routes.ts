import { IconName } from "@/components/Icon";

export enum Routes {
  Home = "/podcasts",
  Playlists = "/playlists",
  Settings = "/settings",
}

export type RouteProps = {
  name: string;
  iconName: IconName;
  route: Routes;
  isActive: boolean;
};
