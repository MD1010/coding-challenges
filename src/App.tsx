import "./App.css";
import { FolderTree } from "./components/FolderTree";
import { MemoryGame } from "./components/MemoryGame/MemoryGame";

function App() {
  return (
    <>
      <h1>Memory Game</h1>
      <MemoryGame />
    </>
  );
  // return <FolderTree />;
}

export default App;
