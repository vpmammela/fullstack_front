import { useParams } from "react-router-dom";

const ReviewInfo = () => {
  const { id } = useParams();

  // Convert the `id` to a string
  const idString = id?.toString() || "No ID provided";

  return (
    <div>
      {idString}
    </div>
  );
};

export default ReviewInfo;
