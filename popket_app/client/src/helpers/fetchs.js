export const postFetch = async (endPoint, method, data) => {
    let metaData = {
      method: method,
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
  
    const res = (await fetch(endPoint, metaData)).json();
    return res;
  }