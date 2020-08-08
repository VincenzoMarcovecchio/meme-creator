import React from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
export default function Meme() {
  const [memes, setMemes] = React.useState([]);
  const [memeIndex, setMemeIndex] = React.useState(0);
  const [captions, setCaptions] = React.useState([]);
  const history = useHistory();
  const updateCaption = (e, index) => {
    const text = e.target.value || '';
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();
    formData.append('username', process.env.USERNAME);
    formData.append('password', process.env.PASSWORD);
    formData.append('template_id', currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData,
    }).then((res) =>
      res.json().then((res) => history.push(`/generated?url=${res.data.url}`))
    );
  };

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  React.useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then((res) =>
      res.json().then((res) => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      })
    );
  }, []);

  React.useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(' '));
    }
  }, [memeIndex, memes]);

  React.useEffect(() => {
    console.log(captions);
  }, [captions]);

  return (
    <>
      {memes.length ? (
        <>
          <button
            className={styles.skip}
            onClick={() => setMemeIndex(memeIndex + 1)}
          >
            Skip
          </button>
          <button onClick={() => generateMeme()} className={styles.generate}>
            Generate
          </button>
          {captions.map((c, index = 1) => (
            <input
              draggable="true"
              placeholder={`Fill in ${index + 1}° dialog `}
              onChange={(e) => updateCaption(e, index)}
              key={index}
            />
          ))}
          <img src={memes[memeIndex].url} alt={memes.title} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
