import { TaskList } from "@/features/get-cards";

function App() {
    return (
        <div className="w-full h-lvh flex justify-center items-center">
            <div className="w-3/4 h-3/4">
                <TaskList />
            </div>
        </div>
    );
}

export default App;
