import React from "react";
import "./SwipeButtons.css";
import CloseIcon from "@material-ui/icons/Close";
import FavouriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

function SwipeButtons() {

  const handleClickSucess = () => {
    console.log('Sucess');
  }

  const handleClickFail = () => {
    console.log('Fail');
  }

  return (
    <div className="swipeButtons">

      <IconButton onClick={handleClickFail} className="swipeButtons__left" >
        <CloseIcon fontSize="large" />
        <h3>Deslize para Esquerda</h3>
      </IconButton>
      <IconButton onClick={handleClickSucess} className="swipeButtons__right">
        <FavouriteIcon fontSize="large" />
        <h3> Deslize para Direita</h3>
      </IconButton>
    </div>

  );
}

export default SwipeButtons;
