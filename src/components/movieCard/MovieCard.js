import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './MovieCard.styles.scss';

const MovieCard = ({ movie, handleClick }) => {
  return (
    <div className="movie">
      <div
        className="movie-card"
        id={movie.EventCode}
        key={movie.EventCode}
        onClick={(e) => handleClick(e, movie)}
      >
        {/* Lazy Load library is used to lazy load all the images */}
        <LazyLoadImage
          src={`https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/${movie.EventImageCode}.jpg`}
          alt={movie.EventTitle}
          /* If the movie doesn't have any thumbnail then another exisiting image is used */
          onError={(event) =>
            (event.target.src =
              'https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/final-score-et00099648-26-03-2019-05-03-04.jpg')
          }
          effect="blur"
          delayTime={300}
        />
        <span>
          {
            //if movie title is very long the string is truncated
            movie.EventTitle.length > 18
              ? movie.EventTitle.slice(0, 15) + '...'
              : movie.EventTitle
          }
        </span>
        {/*Overlay is used to display play button ratings and release date*/}
        <div className="movie-overlay">
          <div className="overlay-date">{movie.ShowDate.split(',')[0]}</div>
          <div className="overlay-play-button">
            <i className="fas fa-play" />
          </div>
          <div className="overlay-rating">
            <p className="rating">
              <i className="fas fa-thumbs-up "></i>
              {movie.wtsPerc} %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
