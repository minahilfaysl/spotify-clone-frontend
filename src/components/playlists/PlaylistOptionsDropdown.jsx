import React, { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

import "../../styles/home/dropdown.scss";
import DeleteModal from "../albums/DeleteModal";
import UpdatePlaylistModal from "./UpdatePlaylistModal";

const PlaylistOptionsDropdown = ({ playlist }) => {

	// // for artist's own items
	const user = useSelector(selectCurrentUser)
	const canEdit = user.id == playlist.user;

	// for opening dropdown
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

	// for delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModalOpen = () => setOpenDeleteModal(true);
  const handleDeleteModalClose = () => setOpenDeleteModal(false);

	// for update modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleUpdateModalOpen = () => setOpenUpdateModal(true);
  const handleUpdateModalClose = () => setOpenUpdateModal(false);

	if (canEdit) {
		return (
			<div className="menu-container">
				<button onClick={onClick} className="menu-trigger">
					<div className='menu-button'>
						<GoKebabHorizontal className="favourite-album"/>
					</div>
				</button>
				<nav className={`playlist-menu ${isActive ? "active" : "inactive"}`}>
					<div>
						<button className="menu-link-a options" onClick={handleUpdateModalOpen}><p>Update Playlist Details</p></button>
						<div className='menuDivider'/>
						<button className="menu-link-a delete" onClick={handleDeleteModalOpen}><p>Delete</p></button>
					</div>
				</nav>

				<DeleteModal
					open={openDeleteModal}
					handleModalClose={handleDeleteModalClose}
					type={'playlist'}
					item={playlist} />

				<UpdatePlaylistModal
					open={openUpdateModal}
					handleModalClose={handleUpdateModalClose}
					item={playlist} />
			</div>
		);
	} else {
		return <></>
	}
}

export default PlaylistOptionsDropdown;
