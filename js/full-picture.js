const fullPictureSection = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment').cloneNode(true);

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();
  commentsList.querySelectorAll('.social__comment').forEach(
    (item) => item.remove()
  );

  comments.forEach(({ avatar, name, message }) => {
    const commentItem = commentItemTemplate.cloneNode(true);
    commentItem.querySelector('img').src = avatar;
    commentItem.querySelector('img').alt = name;
    commentItem.querySelector('.social__text').textContent = message;
    fragment.append(commentItem);
  });

  commentsList.append(fragment);
};

const createFullPictureSection = ({ url, likes, comments, description  }) => {
  fullPictureSection.querySelector('img').src = url;
  fullPictureSection.querySelector('.likes-count').textContent = likes;
  fullPictureSection.querySelector('.comments-count').textContent = comments.length;
  fullPictureSection.querySelector('.social__caption').textContent = description;
  createComments(comments);
};

export { createFullPictureSection };
