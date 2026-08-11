import type {
  User,
  CreateUserData,
  UpdateUserData,
} from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";

//Get Users
export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

//Get a single user
export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

//Create a new User
export async function createUser(
  userData: CreateUserData
): Promise<User> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

//Update User
export async function updateUser(
  id: number,
  userData: UpdateUserData
): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}

//Delete User
export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}