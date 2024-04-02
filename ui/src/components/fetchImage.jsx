export default function fetchImage(imgUuid, plcUuid, handler) {
    if (imgUuid.length > 0 && imgUuid[0].uuid) {
        fetch(`https://api.stb.gov.sg/media/download/v2/${imgUuid[0].uuid}?fileType=Medium%20Thumbnail`, {
            method: 'GET',
            headers: {
                'X-API-Key': 'gS8i7oE7GLfMLZnnA0tZOwXTNSDgPqwB',
            },
        })
        .then(res => res.blob())
        .then(blob => handler(blob, plcUuid))
        .catch(error => console.error('Error fetching image', error));
    } else {
        console.log('No image found');
    }
}