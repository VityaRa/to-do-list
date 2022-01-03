import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "./api/config";
import "./App.scss";
import { Modal } from "./components/common/modal";
import { Info } from "./components/common/modal/components/info";
import { SignIn } from "./components/common/modal/components/signIn";
import { SignUp } from "./components/common/modal/components/signUp";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { loadInitialData } from "./functions/loadInitialData";
import { RootState } from "./store";
import {
  cleanModal,
  setModal,
  toggleModal,
} from "./store/reducers/modalReducer";
import { CSSTransition } from "react-transition-group";
import { Settings } from "components/sidebar/settings/settingsSidebar";

const App = () => {
  const dispatch = useDispatch();

  const isOpenedModal = useSelector((state: RootState) => state.modal.isOpen);
  const [isLoaded, setIsLoaded] = useState(true);
  const { email } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const isUser = setAuthData();
    if (isUser) {
      loadInitialData(dispatch);
    }

    if (!email) {
      dispatch(setModal(<SignIn />));
      dispatch(toggleModal(true));
    } else {
      dispatch(cleanModal());
    }
  }, [email]);

  return (
    <div className="App">
      <Settings />
      
      <Header></Header>

      <Content></Content>

      <Sidebar />
      {isOpenedModal && (
        <CSSTransition
          in={isLoaded}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <Modal />
        </CSSTransition>
      )}
    </div>
  );
};

export default App;
