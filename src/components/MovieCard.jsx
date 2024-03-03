/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { MovieContext } from "../context";
import { getImageUrl } from "../utils/cine-image";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

import { toast } from "react-toastify";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { state, dispatch } = useContext(MovieContext);

  function handleModalClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }
  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  function handleAddToCart(event, movie) {
    event.stopPropagation();
    console.log(movie);

    const found = state.cartData.find((item) => {
      return item.id === movie.id;
    });

    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });

      toast.success(`The Movie ${movie.title} has been added successfully`, {
        position: "bottom-right",
      });
    } else {
      toast.error(
        `The movie ${movie.title} has been added to the cart already.`,
        {
          position: "bottom-right",
        }
      );
    }
  }
  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure
        key={movie.id}
        className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl"
      >
        <a href="#" onClick={() => handleMovieSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImageUrl(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
