import { Header, HeaderProps } from "@/components/Header";

type Props = {
  headerSettings: HeaderProps;
  children: React.ReactNode;
};

export default function Layout({ headerSettings, children }: Props) {
  return (
    <>
      <Header {...headerSettings} />
      <main className="pt-12">{children}</main>
    </>
  );
}
