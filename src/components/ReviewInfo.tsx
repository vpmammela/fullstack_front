import { useParams } from "react-router-dom";

const ReviewInfo = ({ setNotification }) => {
  const { id } = useParams();

  // Convert the `id` to a string
  const idString = id.toString();

  return (
    <div>
      {idString}
    </div>
  );
};

export default ReviewInfo;
