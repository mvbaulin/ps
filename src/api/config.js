const configs = {
  development: {
    connection: 'postgres://postgres:postgres@localhost:5432/ps_store'
  },
  production: {
    connection: 'postgres://postgres:postgres@localhost:5432/ps_store'
  },
  test: {
    connection: 'postgres://postgres:postgres@localhost:5432/ps_store'
  }
};

const environment = process.env.NODE_ENV || 'development';
export default configs[environment];
