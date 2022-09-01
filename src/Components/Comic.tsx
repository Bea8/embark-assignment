import { Modal } from "@mui/material";
import { useState } from "react";
import { IComic } from "../Api";

interface IComicProps {
  comic: IComic;
}

export const Comic = ({ comic }: IComicProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img
        className="comic"
        src={comic.data?.img}
        alt="comic_strip"
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <div className="comic__modal">
          <img
            className="comic__modal_large"
            src={comic.data?.img}
            alt="large-comic-strip"
            onClick={handleOpen}
          />
          <h4>
            {comic.data?.month}/{comic.data?.year}
          </h4>
          <h2>{comic.data?.title}</h2>
          <h3>{comic.data?.alt}</h3>
        </div>
      </Modal>
    </>
  );
};
