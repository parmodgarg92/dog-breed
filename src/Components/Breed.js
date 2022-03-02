import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Breed() {
  const [breadSelect, setBreadSelect] = useState("Random");
  const [breedImg, setBreedImg] = useState(
    "https://images.dog.ceo//breeds//terrier-sealyham//n02095889_5011.jpg"
  );
  const [loading, setLoading] = useState(true);
  const handleDogBreed = async (e) => {
    setBreadSelect(e.target.value);
    setLoading(true);
    let breed = e.target.value;
    let res = await axios.get("https://dog.ceo/api/breeds/image/random");
    if (breed !== "Random") {
      res = await axios.get(
        "https://dog.ceo/api/breed/" + breed + "/images/random"
      );
    }

    const data = res.data;
    if (data.status === "success") {
      setBreedImg(data.message);
      setLoading(false);
    } else {
      setBreedImg(data.message);
      setLoading(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let res = await axios.get("https://dog.ceo/api/breeds/image/random");
    if (breadSelect !== "Random") {
      res = await axios.get(
        "https://dog.ceo/api/breed/" + breadSelect + "/images/random"
      );
    }

    const data = res.data;
    if (data.status === "success") {
      setBreedImg(data.message);
      setLoading(false);
    } else {
      setBreedImg(data.message);
      setLoading(false);
    }
  };

  const getRandomBreedImag = async () => {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random");
    const data = res.data;
    if (data.status === "success") {
      setBreedImg(data.message);
      setLoading(false);
    } else {
      setBreedImg("");
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomBreedImag();
  }, []);

  return (
    <>
      <div>Breed Selection</div>
      {!loading ? (
        <img
          src={breedImg}
          alt="breed img"
          style={{ width: 200, height: 200 }}
        />
      ) : (
        "Loading Img"
      )}

      <form onSubmit={handleSubmit}>
        <select onChange={handleDogBreed}>
          <option value="Random">Random</option>
          <option value="beagle">Beagle</option>
          <option value="boxer">Boxer</option>
          <option value="dalmation">Dalmation</option>
          <option value="husky">Husky</option>
        </select>
        <input type="submit" value="Next" />
      </form>
    </>
  );
}
