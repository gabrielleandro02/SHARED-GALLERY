export const signin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'shdashdkjahskdjhaskjdhkajshdkajshdkjahskdjhaksjdh',
        user: {
          id: 1,
          name: 'Gabriel',
          email: 'gabrielfarias2002@hotmail.com',
        },
      });
    }, 2000);
  });
};
