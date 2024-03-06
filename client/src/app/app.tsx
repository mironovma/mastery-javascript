import { FlipCardQuestion } from "@/entities/FlipCardQuestion";
import { TaskList } from "@/features/get-cards";

function App() {
    return (
        <div className="w-full h-lvh flex justify-center items-center">
            <div>
                <TaskList />
            </div>
        </div>
    );
}

export default App;
