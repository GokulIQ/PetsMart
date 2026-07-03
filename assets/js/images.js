/**
 * PetsMart - local image defaults and fallback.
 * Pages reference their own content-specific files in assets/images.
 */
(function (global) {
  'use strict';

  var FALLBACK_IMAGE = '../assets/images/pet-image.svg';

  global.PET_IMAGES = {
    default: '../assets/images/hero-golden-retriever.webp',
    fallback: FALLBACK_IMAGE,
    product: '../assets/images/product-dry-dog-food.webp',
    pet: '../assets/images/pet-golden-retriever-puppy.webp',
    blog: '../assets/images/blog-dog-summer-walk.webp',
    grooming: '../assets/images/grooming-dog-brushing.webp',
    gallery: '../assets/images/product-dog-food-kibble.webp',
    thumbnail: '../assets/images/product-dry-dog-food.webp'
  };

  global.getPetImage = function () {
    return global.PET_IMAGES.default;
  };
})(window);
