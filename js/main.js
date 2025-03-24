import { getPhotos } from "./data.js";
import { renderPictures } from './pictures.js';
import './form.js';

renderPictures(getPhotos());
