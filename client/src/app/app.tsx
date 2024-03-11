import { Navbar } from "@/widgets/Navbar";

import { AppRouter } from "./providers/router";

function App() {
    return (
        <div>
            <Navbar className="px-4" />
            <AppRouter className="px-4" />
        </div>
    );
}

export default App;
