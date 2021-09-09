import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { Modal } from "./components/common/modal";
import { Info } from "./components/common/modal/components/info";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { isRegister } from "./functions/isRegister";
import { loadInitialData } from "./functions/loadInitialData";
import { RootState } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    loadInitialData(dispatch);
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
      {/* <Sidebar></Sidebar> */}
      {isOpen && <Modal />}
    </div>
  );
};

export default App;
