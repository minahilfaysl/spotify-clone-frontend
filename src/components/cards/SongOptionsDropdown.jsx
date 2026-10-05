import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

import "../../styles/home/dropdown.scss";
import DeleteModal from "../albums/DeleteModal";
import UpdateSongModal from "../albums/UpdateSongModal";
import AddToPlaylistModal from "../playlists/AddToPlaylistModal";
import { useRemoveTrackFromPlaylistMutation } from "../playlists/playlistsApiSlice";

const SongOptionsDropdown = ({track, type=null}) => {

	const item = type == "playlist" ? track.song_details : track

	// for artist's own items
	const user = useSelector(selectCurrentUser)
	const canEdit = user.id == item.album_details.artist;

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

	// for playlist modal
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const handlePlaylistModalOpen = () => setOpenPlaylistModal(true);
  const handlePlaylistModalClose = () => setOpenPlaylistModal(false);

	const [ removeTrackFromPlaylist, { isLoading }] = useRemoveTrackFromPlaylistMutation()

	const handleRemove = async () => {
		try {
      let response = await removeTrackFromPlaylist(track.id).unwrap();
    } catch (err) {
      // handle error
    }
	}

  return (
		<div className="menu-container">
			<button onClick={onClick} className="menu-trigger">
				<div className='menu-button'>
          <GoKebabHorizontal />
        </div>
			</button>
			<nav className={`menu ${isActive ? "active" : "inactive"}`}>
			<button className="menu-link-a options" onClick={handlePlaylistModalOpen}><p>Add To Playlist</p></button>
				{type == "playlist" &&
					<button className="menu-link-a options" onClick={handleRemove}><p>Remove From Playlist</p></button>}
				{canEdit &&
				<div>
					<button className="menu-link-a options" onClick={handleUpdateModalOpen}><p>Update</p></button>
					<div className='menuDivider'/>
					<button className="menu-link-a delete" onClick={handleDeleteModalOpen}><p>Delete</p></button>
				</div>}
			</nav>

			<DeleteModal
				open={openDeleteModal}
				handleModalClose={handleDeleteModalClose}
				type={'song'}
				item={item} />

			<UpdateSongModal
				open={openUpdateModal}
				handleModalClose={handleUpdateModalClose}
				item={item} />
			
			<AddToPlaylistModal 
				open={openPlaylistModal}
				handleModalClose={handlePlaylistModalClose}
				item={item} />
		</div>
  );
}

export default SongOptionsDropdown;
