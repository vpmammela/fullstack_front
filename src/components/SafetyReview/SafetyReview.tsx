import "../styles.css";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useUser } from '../../UserContext';

const SafetyReview = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if(user === null) {
      navigate("/")
    }
  }, [navigate, user])

  return (
    <div>
      <h2>
        Turvallisuuskatselmointi
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Tila</th>
            <th className="bad">Bad</th>
            <th className="neutral">Neutral</th>
            <th className="good">Good</th>
            <th>Huomiot</th>
            <th>Kuva</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" id="roomName" /></td>
            <td><input type="radio" name="room1" value="bad"/></td>
            <td><input type="radio" name="room1" value="neutral"/></td>
            <td><input type="radio" name="room1" value="good"/></td>
            <td><input type="text" id="comments1" /></td>
            <td><a href="#" id="picturelink">pictures</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
  
export default SafetyReview;