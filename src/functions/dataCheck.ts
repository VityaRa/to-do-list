export const dataCheck = {
  email: (text: string) =>
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(text),
  notEmpty: (text: string) => text.length,
  password: (text: string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(text)
};

export const errorMessage = {
  email: "Неверный e-mail",
  password: "Неверный пароль",
};

export const labelMessage = {
  email: "Введите ваш e-mail",
  password: "Введите пароль",
};
