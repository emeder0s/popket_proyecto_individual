export const postFetch = async (endPoint, data) => {
    let metaData = {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };

    return await fetch(endPoint, metaData);
}