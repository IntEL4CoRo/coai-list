export const coaiUrl = "https://moodle.intel4coro.de/pluginfile.php/223/mod_resource/content/1/coai.json"

export function randomDate() {
  const start = 1683995706000
  const end = 1693905934063

  return Math.round(Math.random() * (end - start)) + start
}

export function isAbsoluteUrl(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url) || /^data:/i.test(url);
}

export function isEmptyOject(obj) {
  return !obj || Object.keys(obj).length === 0
}

export function isNotebookUrl(url) {
  return /\.ipynb$/.test(url)
}

export function isYouTubeVideo(url) {
  // Regular expression to match YouTube video URLs
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;
  return youtubeRegex.test(url);
}

export function isMP4Video(url) {
  // Regular expression to match native MP4 video URLs
  const mp4Regex = /\.(mp4|webm)$/i;
  return mp4Regex.test(url);
}
export function notEmptyRefObj(obj) {
  return obj && obj.value && Object.keys(obj.value).length !== 0
}

export function openPopupWindow(event) {
  window.open(event.target.href, '_blank', 'width=1280,height=720');
  return false;
}

export function dataValidate(data) {
  return data.map(e => {
    let _obj = {
      title: '',
      cover_img: '',
      description: '',
      description_details: '',
      category: '',
      author: 'unknown',
      created_time: randomDate(),
      videos: [],
      software_components: [],
      actions: [],
      ...e
    }
    return _obj
  })
}