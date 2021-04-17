import {useState} from 'react';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


export default function Photo ({pics}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const images = pics.map(p => p.thumbUrl);

  const preview = index => {
    setIndex(index);
    setOpen(true);
  }

  return (
    <div className="photos">
      {pics.map((t, index) => <div key={t.uid} style={{backgroundImage: `url(${t.thumbUrl})`}} onClick={() => preview(index)}></div>)}
      {open && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </div>
  )
}

