import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function FullLayout({ children }) {
    return (
        <div className="h-screen p-4 sm:p-6 md:p-8">
            {children}
        </div>
    );
}

export default FullLayout;
