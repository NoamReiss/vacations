import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Icons.css";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { updateLikesAction } from "../../../Redux/usersReducer";
import {
  vacationLikesAction,
  vacationUnlikeAction,
} from "../../../Redux/VacationsReducer";
import { travel } from "../../../Redux/TravelStore";

interface IconProps {
  vacationId?: number;
  onDelete: () => void;
  isAdmin: boolean;
  initialLikes: number;
}

function Icons({
  vacationId,
  onDelete,
  isAdmin,
  initialLikes,
}: IconProps): JSX.Element {
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.users.users[0]);
  const likesVac = useSelector(
    (state: any) => state.users.users[0].likedVacations
  );

  const [likes, setLikes] = useState<number>(initialLikes);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [updatedLikedVacations, setUpdatedLikedVacations] = useState(likesVac);

  const handleEdit = () => {
    navigate(`/editVacation/${vacationId}`);
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  const handleLike = () => {
    const userId = user.user_code;
    const requestData = {
      user_code: userId,
      vacation_code: vacationId,
    };

    try {
      const isLiked = user.likedVacations.includes(vacationId);

      if (isLiked) {
        travel.dispatch(vacationUnlikeAction(vacationId!));

        setLikes((prevLikes) => prevLikes - 1);

        // Update the liked vacations array

        setUpdatedLikedVacations(updatedLikedVacations);
        // updatedLikedVacations.filter((id: number) => id !== vacationId)
      } else {
        // Like the vacation
        travel.dispatch(vacationLikesAction(vacationId!));
        setLikes((prevLikes) => prevLikes + 1);
        // updatedLikedVacations.push(vacationId!);
      }
      travel.dispatch(updateLikesAction([vacationId!]));

      axios.post(
        `http://localhost:4000/api/v1/vacations/addFollower`,
        requestData
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Icons">
      {isAdmin ? (
        <div className="adminIcons">
          <Tooltip title="Edit">
            <EditOutlinedIcon onClick={handleEdit} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteForeverOutlinedIcon onClick={handleDelete} />
          </Tooltip>
        </div>
      ) : (
        <div className="userIcons">
          {user.likedVacations.includes(vacationId) ? (
            <FavoriteIcon className="heartIcon filled" onClick={handleLike} />
          ) : (
            <FavoriteBorderOutlinedIcon
              className="heartIcon outlined"
              onClick={handleLike}
            />
          )}
          <Badge
            badgeContent={likes}
            color="primary"
            overlap="rectangular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          />
        </div>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Icons;
