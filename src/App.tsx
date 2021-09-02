import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss"
import { Content } from "./components/content";
import { Header } from "./components/header";
import { loadInitialData } from "./functions/loadInitialData";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadInitialData(dispatch)
  }, [])
  
  

  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
      {/* <Sidebar></Sidebar> */}
    </div>
  );
}

export default App;
