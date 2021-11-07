export const dataCheck = {
  email: (text: string) =>
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(text),
  notEmpty: (text: string) => text.length,
  password: (text: string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(text)
};

export const errorMessage = {
  email: "Неверный e-mail",
  password: "Неверный пароль (должен содержать минимум 8 символов, 1 спец. знак, 1 цифру, 1 букву)",
};

export const labelMessage = {
  email: "Введите ваш e-mail",
  password: "Введите пароль",
};
