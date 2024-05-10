import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/auth.reducer";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        {isLoggedIn ? (
          <div className="flex">
            <SideBar />
            <div className="container mx-auto py-10 flex-1">{children}</div>
          </div>
        ) : (
          <div className="container mx-auto py-10 flex-1">{children}</div>
        )}
      <Footer />
    </div>
  );
}

export default Layout;
