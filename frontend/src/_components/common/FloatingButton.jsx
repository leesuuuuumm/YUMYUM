import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteFeed } from "../../_actions/feedAction";
import { MainButton, ChildButton, FloatingMenu, Directions } from 'react-floating-button-menu';
// import 'react-floating-button-menu/dist/index.css';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const FloatingButton = (props) => {
  const { feedId } = props
  const [isButtonOpen, setIsButtonpen] = useState(false);

  const openButtonHandler = (e) => {
    setIsButtonpen(!isButtonOpen)
    console.log(isButtonOpen)
  }

  const editHandler = (e) => {
    props.setIsEdit(!props.isEdit)
    console.log(props.isEdit)
  }

  const deleteHandler = (e) => {
    props.setIsDeleted(true)
    deleteFeed(feedId)

  }

  return (
    <div id="threeDots">
      <FloatingMenu
        slideSpeed={500}
        size={50}
        isOpen={isButtonOpen}
        spacing={8}
        direction={Directions.Left}
      >
        <MainButton
          isOpen={isButtonOpen}
          iconResting={<MoreHorizIcon style={{ fontSize: 30 }} />}
          iconActive={<ClearAllIcon style={{ fontSize: 20 }} />}
          onClick={openButtonHandler}
          size={56}
        />
        <ChildButton
          icon={<DeleteIcon style={{ fontSize: 20 }} />}
          onClick={() => { if (window.confirm('삭제하실거에염?')) deleteHandler()} } 
          background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          size={40}
        />
        <ChildButton
          icon={<EditIcon style={{ fontSize: 20 }} />}
          background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          size={40}
          onClick={()=> editHandler()}
        />
      </FloatingMenu>
    </div>
  );
};

export default FloatingButton;
