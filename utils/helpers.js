import HttpRequest from "./HttpRequest";

export const getUser = async (payload) =>
  await HttpRequest.get(`users/${payload}`);

export const searchUsers = async (payload) =>
  await HttpRequest.get(`users/search/${payload}`);

export const checkUserExists = async (payload) =>
  await HttpRequest.get(`users/check/username/${payload}`);

export const checkEmailExists = async (payload) =>
  await HttpRequest.get(`users/check/email/${payload}`);

export const signup = async (payload) =>
  await HttpRequest.post("auth/signup", payload);

export const login = async (payload) =>
  await HttpRequest.post("auth/login", payload);

export const getCurrentUser = async () =>
  await HttpRequest.get("auth/current-user");

export const getUserByUsername = async (payload) =>
  await HttpRequest.get(`users/username/${payload}`);

export const getStories = async () => await HttpRequest.get("stories");

export const getStory = async (payload) =>
  await HttpRequest.get(`stories/${payload}`);

export const getRandomUsers = async (payload) =>
  await HttpRequest.get(`users/random/${payload}`);

export const logout = async () => await HttpRequest.post("auth/logout");
