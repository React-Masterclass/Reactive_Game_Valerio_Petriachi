import { Link } from "react-router-dom";

export default function Genres({ genres }) {
  return (
    <div>
      <p>Lista dei generi</p>
      <ul>
        {Array.isArray(genres) &&
          genres.map((genre) => (
            <li key={genre.id} style={{ padding: '0' }}>
              <Link to={`/games/${genre.slug}`}>
                {genre.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
