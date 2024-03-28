const notificationAPI = 'https://fcm.googleapis.com/fcm/send';

const countryAPI = 'https://countriesnow.space/api/v0.1/countries/positions'; //get
const stateAPI = 'https://countriesnow.space/api/v0.1/countries/states'; //post
const cityAPI = 'https://countriesnow.space/api/v0.1/countries/state/cities'; //post
// const statebody = {country: 'Nigeria'};
// const citybody = {country: 'Nigeria', state: 'Lagos'};

export const getCountry = async () => {
  return new Promise((resolver, reject) => {
    fetch(countryAPI, {method: 'GET'})
      .then(async response => {
        const result = await response.json();
        if (result.error) {
          return reject(result);
        } else {
          return resolver(result.data);
        }
      })
      .then(result => {
        return resolver(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const getStatebyCountry = async country => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify({country: country});
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return new Promise((resolver, reject) => {
    fetch(stateAPI, requestOptions)
      .then(async response => {
        const result = await response.json();
        if (result.error) {
          return reject(result);
        } else {
          return resolver(result.data);
        }
      })
      .then(result => {
        return resolver(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const getCitybyStateCountry = async (country, state) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify({country: country, state: state});
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return new Promise((resolver, reject) => {
    fetch(cityAPI, requestOptions)
      .then(async response => {
        const result = await response.json();
        if (result.error) {
          return reject(result);
        } else {
          return resolver(result.data);
        }
      })
      .then(result => {
        return resolver(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const sendPushNotification = async (token, title, body) => {
  const FIREBASE_API_KEY =
    'AAAAYr2VHZg:APA91bHU8_yrTNn0xxcr538neWTqOkENqRuhQuhfa7SfWpaUIkiSosdrFmGl1f9BFoIVj5bKpzZKOQeGJaqziuJR6JqILQaCtVMA-eCDwzik2U7_u5aBDgKSD8dWSVTBXj24ONWxffSR';
  const message = {
    registration_ids: [token],
    notification: {
      title: title,
      body: body,
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: 'high',
      content_available: true,
    },
  };
  let headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'key=' + FIREBASE_API_KEY,
  });

  try {
    const body = {
      method: 'POST',
      headers,
      body: JSON.stringify(message),
    };
    let response = await fetch(notificationAPI, body);
    if (response.status === 200) {
      const result = await response.json();
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {}
};
