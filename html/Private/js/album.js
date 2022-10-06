/*
 * @Description: 
 * @Logo:                                                               ▄   ▄
 * ░██████╗██╗░░██╗░█████╗░░██╗░░░░░░░██╗███╗░░██╗  ░█████╗░░█████╗░██╗ █▀█▀█
 * ██╔════╝██║░░██║██╔══██╗░██║░░██╗░░██║████╗░██║  ██╔══██╗██╔══██╗██║ █▄█▄█
 * ╚█████╗░███████║███████║░╚██╗████╗██╔╝██╔██╗██║  ██║░░╚═╝███████║██║ ███  ▄▄
 * ░╚═══██╗██╔══██║██╔══██║░░████╔═████║░██║╚████║  ██║░░██╗██╔══██║██║ ████▐█ █
 * ██████╔╝██║░░██║██║░░██║░░╚██╔╝░╚██╔╝░██║░╚███║  ╚█████╔╝██║░░██║██║ ████   █
 * ╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░░╚══╝  ░╚════╝░╚═╝░░╚═╝╚═╝ ▀▀▀▀▀▀▀
 * @Author: Shawn C
 * Copyright (c) 2022 by Shawn C., All Rights Reserved. 
 */
const numberOfPhotos = 16;
let photos = [];
for (var i = 0; i < numberOfPhotos; i++) {
  photos.push(`https://github.com/XiaoSanchez/XiaoSanchez.github.io/blob/main/html/Private/images/${i}.jpg?raw=true`);
}

class AlbumImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    const image = new Image();
    image.onload = () => {this.setState({ loaded: true });};
    image.src = this.props.image;
  }

  get style() {
    if (this.state.loaded) {
      return {
        backgroundImage: `url(${this.props.image})` };

    }
  }

  get classNames() {
    let classNames = 'image';
    if (this.state.loaded) {
      classNames += ' image--loaded';
    }
    return classNames;
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: this.classNames, style: this.style }));

  }}


const App = () => /*#__PURE__*/
React.createElement("div", { className: "album" }, /*#__PURE__*/
React.createElement("h1", null, "小宝相册"), /*#__PURE__*/
React.createElement("h2", null, numberOfPhotos, " photos"), /*#__PURE__*/
React.createElement("div", { className: "photos" },
photos.map((image, i) => /*#__PURE__*/
React.createElement(AlbumImage, { key: i, image: image }))));





ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.querySelector('#app'));