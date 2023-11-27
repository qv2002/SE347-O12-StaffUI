import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function DefaultLayout({ heading, children }) {
    return (
        <div className="flex h-screen">
            <Sidebar></Sidebar>

            <div className="flex h-screen flex-1 flex-col">
                <Header>{heading}</Header>
                <main className="flex-1 p-5">{children}</main>
            </div>
        </div>
    );
}

export default DefaultLayout;
