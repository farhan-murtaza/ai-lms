import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full">
        <Navbar />
      </div>
      <div className=" md:flex h-full w-56 flex-col fixed inset-y-0 z-10000 ">
        <Sidebar />
      </div>
      <main className="md:pl-60 pt-[80px] pl-[20px] pr-[30px] h-full ">
        {children}
      </main>
    </div>
  );
};

export default Dashboardlayout;
