import { Link } from "react-router-dom";
import font from '../Styles/font.module.css';

export default function Publisher({ publishers }) {
  return (
    <div>
      <p className={font.rock}>Lista dei produttori</p>
      <ul>
        {Array.isArray(publishers) &&
          publishers.map((publisher) => (
            <li key={publisher.id} value={publisher.id} style={{ padding: '0' }}>
              <Link to={`/games/publishers/${publisher.slug}`}>
                {publisher.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}