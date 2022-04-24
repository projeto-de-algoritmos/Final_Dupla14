import "./App.css";
import Header from "./components/Header/Header";
import SwipeButtons from "./components/SwipeButtons/SwipeButtons";
import HappnCards from "./components/HappnCards/HappnCards";

function App() {
  return (
    <div className="app">
      <Header />
      <HappnCards />
      <SwipeButtons />
    </div>
  );
}

export default App;
