export default {
  methods: {
    getSbkImage (image, option) {
      let adapter = true;
      if(adapter){
        if (!image) return '';
        if (!option) return '';
        let imageService = '//img2.storyblok.com/';
        //@TODO - image sometimes returns an object - needs isolating and debugging
        if(typeof(image) !== 'string'){
          //console.log('image not a string');
          return '';
        }
        let path = image.replace('//a.storyblok.com', '');
        return imageService + option + path;
      }
      return image;
    }
  }
};

