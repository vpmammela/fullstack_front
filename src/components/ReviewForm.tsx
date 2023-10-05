import ContinuousReview from "./ContinuousReview";
import SemesterReview from "./SemesterReview";
import SafetyReview from "./SafetyReview";
import ManagementReview from "./ManagementReview";

const ReviewForm = () => {
  return (
    <div>
      <ContinuousReview />
      <SemesterReview />
      <SafetyReview />
      <ManagementReview />
    </div>
  );
};

export default ReviewForm;
