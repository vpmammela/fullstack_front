import axios from "axios";
const baseUrl = "http://localhost:8001/api/v1/reviews";

type AuthToken = string | null;

interface NewReviewObject {
  id: number;
  type: string;
  room_number: string;
  team: string;
  date: string;
  answers: string[];
  notes: string;
  ideas: string;
  positive_feedback: string;
}

let token: AuthToken = null;

const setToken = (newToken: AuthToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject: NewReviewObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject: NewReviewObject, reviewId: number) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${reviewId}`, newObject, config);
  return response.data;
};

const removeOne = async (review: NewReviewObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const confirmed = window.confirm(
    `Remove review ${review.id} of type ${review.type}`,
  );

  if (confirmed) {
    try {
      await axios.delete(`${baseUrl}/${review.id}`, config);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export default { getAll, create, update, removeOne, setToken };