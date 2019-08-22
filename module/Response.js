const defaultInfo = {
  status: 200,
  data: {},
  headers: {}
};

class Response {
  constructor(status, data, headers) {
    this.status = status || defaultInfo.status;
    this.data = data || defaultInfo.data;
    this.headers = headers || defaultInfo.headers;
  }

  setStatus(status) {
    this.status = status;
  }
  setData(data) {
    this.data = data;
  }

  setHeaders(headers) {
    this.headers = headers;
  }

  get() {
    return {
      statusCode: this.status,
      headers: this.headers,
      body: JSON.stringify(this.data)
    };
  }
}

module.exports = Response;
