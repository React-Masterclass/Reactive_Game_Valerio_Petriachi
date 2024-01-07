import { Link } from "react-router-dom";
import font from '../Styles/font.module.css';

export default function Platform({ platforms }) {
  return (
    <div>
      <p className={font.rock}>Lista delle piattaforme</p>

      <ul>
      {Array.isArray(platforms) &&
        platforms.map((platform) => (
          <li key={platform.id} value={platform.id}>
              <Link
                className="dropdown-item"
                to={`/games/platforms/${platform.slug}/${platform.id}`}
              >
                {platform.name}
              </Link>
            </li>
        ))}
      </ul>
    </div>
  );
}
