import React, {useState} from 'react';
import axios from 'axios';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePlot, setMoviePlot] = useState("");
  const [movieActors, setMovieActors] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [moviePoster, setMoviePoster] = useState(null);

  const [showError, setShowError] = useState(false);

  const apikey = process.env.REACT_APP_API_KEY



  const handleResetButtonClick = () => {
    setInputValue("");
    setMovieTitle("")
    setMoviePlot("")
    setMovieActors("")
    setMovieRating(0)
    setMoviePoster(null)
    setShowError(false)

  };

  const handleSearchButtonClick = async () => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apikey}&t=${inputValue}`);

    try {
      setMovieTitle(response.data.Title)
      setMoviePlot(response.data.Plot)
      setMovieActors(response.data.Actors)
      setMovieRating(response.data.Ratings[0].Value)
      setMoviePoster(response.data.Poster)
      setShowError(false)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setShowError(true)
    }
  };

  const movieContent = () => {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className='d-flex flex-column justify-content-start align-items-start'>
              <h2 className='movie__title'>{movieTitle}</h2>
              <p className='movie__plot'>{moviePlot}</p>
              <p>
                <strong>Actors: </strong>
                {movieActors}
              </p>
              <p>
                <strong>Rating: </strong> 
                {movieRating}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <img src={moviePoster} alt="Image" className="img-fluid movie__poster" />
          </div>
        </div>
      </div>
    )
  };

  const errorContent = () => {
    return (
      <div className='movie__error'>
        <h5>Sorry, i didnt find the movie. maybe you wrote wrong?</h5>
      </div>
    )
  }

  return (
    <div className="container text-center movie__container">
      <h1>Welcome to Movie Finder</h1>
      <h5 className='page__subtitle'>Your Personal Movie Library</h5>
      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />        
          </div>
        <div className="col-auto">
          <button className="btn btn-primary button__search " type="button" disabled={!inputValue && true} onClick={handleSearchButtonClick}>Search</button>
          <button className="btn btn-secondary" onClick={handleResetButtonClick} type="button">Reset</button>
        </div>
      </div>

      {movieTitle && movieContent() }
      {showError && errorContent()}

    </div>
  );
}

export default App;
