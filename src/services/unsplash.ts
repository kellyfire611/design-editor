import axios from 'axios'

const unsplashClient = axios.create({
  baseURL: 'https://api.unsplash.com/',
})

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY

export interface UnsplashImage {
  id: string
  webformatURL: string
  previewURL: string
}
export function getUnsplashImages(query: string): Promise<UnsplashImage[]> {
  let encodedWord = query.replace(/\s+/g, '+').toLowerCase()
  return new Promise((resolve, reject) => {
    unsplashClient
      .get(`photos?client_id=${UNSPLASH_ACCESS_KEY}`)
      .then(response => {
        console.log(response.data);

        let newData = [];
        response.data.forEach((item) => {
          newData.push({
            id: item.id,
            webformatURL: item.urls.thumb,
            previewURL: item.urls.thumb
          });
        });

        resolve(newData);
      })
      .catch(err => reject(err))
  })
}
