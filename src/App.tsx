import "./App.scss"
import { Content } from "./components/content";
import { Header } from "./components/header";

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
      {/* <Sidebar></Sidebar> */}
    </div>
  );
}

export default App;
