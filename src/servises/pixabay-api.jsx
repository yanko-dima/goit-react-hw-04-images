export const fetchImages = (searchKey, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchKey}&page=${page}&key=27888292-ee7badc36537d4c81fc58ae14&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`No images with ${searchKey} name`));
  });
};
