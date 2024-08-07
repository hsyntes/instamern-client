import HttpRequest from "./HttpRequest";

export const getUser = async (id) => await HttpRequest.get(`users/${id}`);

export const searchUsers = async (username) =>
  await HttpRequest.get(`users/search/${username}`);

export const checkUserExists = async (username) =>
  await HttpRequest.get(`users/check/username/${username}`);

export const checkEmailExists = async (email) =>
  await HttpRequest.get(`users/check/email/${email}`);

export const signup = async (payload) =>
  await HttpRequest.post("auth/signup", payload);

export const login = async (payload) =>
  await HttpRequest.post("auth/login", payload);

export const getCurrentUser = async () =>
  await HttpRequest.get("auth/current-user");

export const getUserByUsername = async (username) =>
  await HttpRequest.get(`users/username/${username}`);

export const getStories = async () => await HttpRequest.get("stories");

export const getStory = async (id) => await HttpRequest.get(`stories/${id}`);

export const getPosts = async (page = 1, limit = 2) =>
  await HttpRequest.get("posts", { page, limit });

export const getPost = async (id) => await HttpRequest.get(`posts/${id}`);

export const getRandomUsers = async (count) =>
  await HttpRequest.get(`users/random/${count}`);

export const updateProfile = async (payload) =>
  await HttpRequest.post(`users/update`, payload);

export const createComment = async ({ postId, payload }) =>
  await HttpRequest.post(`posts/${postId}/comments`, payload);

export const logout = async () => await HttpRequest.post("auth/logout");
