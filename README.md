# ETextbook for improved learning in biochemistry
Source code for "E-TextBook For Better Learning in Chemistry 120" project

## Introduction
Organic chemistry is a highly visual subject  since organic compounds are 3D objects. For this reason, in order to fully understand the composition, properties, and chemistry of these compounds, it is essential to understand and visualize their 3D structures. Nevertheless, there is a frequent necessity to depict organic substances on 2D surfaces, such as paper, a computer screen, or a whiteboard. As a result, one of the biggest obstacles we will face is learning these molecules in a 2D format while maintaining an accurate understanding of 3D nature. The purpose of this e-textbook is to fully utilize the digital medium by integrating images, videos, games, 3D interactive objects, etc., in order to assist students in comprehending the properties of molecules in both 2D and 3D formats.

## To add more content
### Use provided JSON files
- Find the folder for the unit you want to update in  ```content``` folder
- Inside each unit folder, there will be a JSON file contain the content of the corresponding unit, adjust the content inside this folder to update content
- To install dependency run npm install
- Adjust/Add the content you want with the following syntax:

    "title": Unit title <br />
    "introduction": short introduction of the unit <br />
    "items": [ <br />
        main ideas of the unit <br />
    ], <br />
    "type": content type, "text", "image", or "video" <br />
    "content": (for "text" type content only) the text content you want to add <br />
    "src": (for "image", and "video" type content only), source of your photo or video [1] <br />
    "title": (for "image", and "video" type content only) title of the image or video <br />

!!! The main content ("text", "image" or "video") should the add to the ```section``` part

!!! The content added must all be in double quotes (Ex: "cat video")

[1] The video or image should be located in public folder, in the corresponding unit's folder

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributions
