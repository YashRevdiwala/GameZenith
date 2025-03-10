import Navbar from "./_components/navbar"
import AppSidebar from "./_components/sidebar"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <AppSidebar />
        {children}
      </div>
    </>
  )
}
export default HomeLayout
