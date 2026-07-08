

import content from '../data/content.json';

const MIN_DELAY = 1000;
const MAX_DELAY = 1500;

const FAILURE_RATE = 0.0;

const randomDelay = () =>
  MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY));


function request(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Network request failed. Please try again.'));
        return;
      }
      resolve(structuredClone(payload));
    }, randomDelay());
  });
}

export const fetchNavigation = () => request(content.navigation);

export const fetchHeroContent = () => request(content.hero);

export const fetchFeaturesContent = () =>
  request({
    ...content.featuresSection,
    carousel: content.carousel,
  });


export const fetchPageContent = () =>
  request({
    navigation: content.navigation,
    hero: content.hero,
    featuresSection: content.featuresSection,
    carousel: content.carousel,
  });

export default {
  fetchNavigation,
  fetchHeroContent,
  fetchFeaturesContent,
  fetchPageContent,
};
