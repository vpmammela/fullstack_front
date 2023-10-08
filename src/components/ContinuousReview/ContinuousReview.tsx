import "../styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ContinuousReview = ({user}: { user: string | null }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(user === null) {
      navigate("/")
    }
  }, [navigate, user])

  return (
    <div>
      <h2>
        Jatkuva katselmointi
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
            <td><b>Huone 1</b></td>
            <td><input type="radio" name="room1" value="bad"/></td>
            <td><input type="radio" name="room1" value="neutral"/></td>
            <td><input type="radio" name="room1" value="good"/></td>
            <td><input type="text" id="comments1" /></td>
            <td><a href="#" id="picture1link">pic1</a></td>
          </tr>
          <tr>
            <td><b>Huone 2</b></td>
            <td><input type="radio" name="room2" value="bad"/></td>
            <td><input type="radio" name="room2" value="neutral"/></td>
            <td><input type="radio" name="room2" value="good"/></td>
            <td><input type="text" id="comments2" /></td>
            <td><a href="#" id="picture2link">pic2</a></td>
          </tr>
          <tr>
            <td><b>Huone 3</b></td>
            <td><input type="radio" name="room3" value="bad"/></td>
            <td><input type="radio" name="room3" value="neutral"/></td>
            <td><input type="radio" name="room3" value="good"/></td>
            <td><input type="text" id="comments3" /></td>
            <td><a href="#" id="picure3link">pic3</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
  
export default ContinuousReview;