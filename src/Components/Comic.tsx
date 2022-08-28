import { Modal } from "@mui/material";
import { useState } from "react";

interface IComicProps {
  comic: any;
}

export const Comic = ({ comic }: IComicProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img
        className="strip"
        src={comic?.data.img}
        alt="comic_strip"
        key={comic?.data.num}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="strip__modal">
          <img
            className="strip__modal__large-strip"
            src={comic?.data.img}
            alt="large-comic-strip"
            key={comic?.data.num}
            onClick={handleOpen}
          />
          <h4>
            {comic?.data.month}/{comic?.data.year}
          </h4>
          <h2>{comic?.data.title}</h2>
          <h3>{comic?.data.alt}</h3>
        </div>
      </Modal>
    </>
  );
};
