import { getPhotos } from "./data.js";
import { renderPictures } from './pictures.js';
import './upload-form.js';

renderPictures(getPhotos());
