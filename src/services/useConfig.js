exports.useConfig = url => {
  const httpC = axios.create({
    baseURL: url,
    header: {
      'Content-Type': 'application/json',
    },
  });
  return httpC;
};

const httpC = useConfig(url);
