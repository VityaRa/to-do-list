import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss"
import { Modal } from "./components/common/modal";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { isRegister } from "./functions/isRegister";
import { loadInitialData } from "./functions/loadInitialData";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadInitialData(dispatch)
  }, [])

  

  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
      {/* <Sidebar></Sidebar> */}
      {!isRegister() && <Modal/>}
    </div>
  );
}

export default App;
