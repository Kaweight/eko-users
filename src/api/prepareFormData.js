export const createUserData = (userData) => {
  const formData = new FormData();
  Object.entries(userData).forEach(field => formData.append(field[0], field[1]));
  return formData;
}

export const editUserData = (userData) => {
  const formData = new FormData();
  Object.entries(userData).forEach(field => formData.append(field[0], field[1]));
  formData.append('_method', 'PUT')
  return formData;
}

export const deleteUserData = () => {
  const formData = new FormData();
  formData.append('_method', 'DELETE')
  return formData;
}
