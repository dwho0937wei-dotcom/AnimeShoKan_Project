import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { thunkAnimeCatalog } from "../redux/anime";
import Navigation from "../components/Navigation/Navigation";
import { thunkCharacterCatalog } from "../redux/character";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //! User Authentication
    dispatch(thunkAuthenticate())
      //! All Anime Loading
      .then(() => dispatch(thunkAnimeCatalog()))
      //! All Character Loading
      .then(() => dispatch(thunkCharacterCatalog()))
      //! Done Loading
      .then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
