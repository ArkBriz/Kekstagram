// import { getPhotos } from "./data.js";
import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import './upload-form.js';

getData((pictures) => renderPictures(pictures));
