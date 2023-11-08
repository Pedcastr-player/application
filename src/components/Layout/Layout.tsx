import { Header } from "../Header"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="pt-12">{children}</main>
    </>
  )
}